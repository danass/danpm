import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const newBlocksData = await request.json();

    if (!newBlocksData || !Array.isArray(newBlocksData.blocks)) {
      return NextResponse.json({ message: 'Invalid data format: Expected an object with a \'blocks\' array.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'data', 'case-study-structure.json');
    
    // Read the existing file to preserve other top-level keys like 'seo' or 'pageSchemaVersion'
    let existingData = {};
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    } catch (readError) {
      console.warn('Could not read existing case study structure file, will create a new one or overwrite.', readError);
      // If the file doesn't exist or is malformed, we'll just write the new blocks with a default structure.
      existingData = {
        pageSchemaVersion: "1.0", // Add a default if not present
        seo: {} // Add a default if not present
      };
    }

    // Update only the blocks part
    const updatedStructure = {
      ...existingData,
      blocks: newBlocksData.blocks // Assuming the request body sends { blocks: [...] }
    };

    fs.writeFileSync(filePath, JSON.stringify(updatedStructure, null, 2), 'utf8');
    
    return NextResponse.json({ message: 'Case study structure updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating case study structure:', error);
    return NextResponse.json({ message: 'Error updating case study structure.', error: error.message }, { status: 500 });
  }
} 