import JSZip from 'jszip';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

export async function POST(request) {
    const tempFiles = [];
    try {
        const { photos, homeId } = await request.json();
        
        if (!photos || !photos.length) {
            return new Response(JSON.stringify({ message: 'No photos provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const zip = new JSZip();
        
        // Download all photos in parallel
        const photoPromises = photos.map(async (photo, index) => {
            const photoUrl = `${photo.url}?quality=100&height=1080`;
            const filename = `home-${homeId}-photo-${index + 1}.jpg`;
            const tempPath = path.join(os.tmpdir(), `${Date.now()}-${filename}`);
            tempFiles.push(tempPath);
            
            try {
                // Download to temp file first
                await execAsync(`curl "${photoUrl}" --output "${tempPath}"`);
                const fileContent = await fs.promises.readFile(tempPath);
                zip.file(filename, fileContent, { binary: true });
                return { success: true, filename };
            } catch (error) {
                return { success: false, filename };
            }
        });

        await Promise.all(photoPromises);

        // Generate zip file
        const zipContent = await zip.generateAsync({
            type: 'nodebuffer',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
        });

        return new Response(zipContent, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename=home-${homeId}-photos.zip`
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to create zip file' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        // Clean up temp files
        for (const tempFile of tempFiles) {
            try {
                await unlinkAsync(tempFile);
            } catch (e) {
                // Ignore cleanup errors
            }
        }
    }
} 