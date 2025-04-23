import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const homeId = searchParams.get('homeId');

        if (!homeId) {
            return new Response(JSON.stringify({ message: 'Home ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Use curl directly since it works
        const curlCommand = `curl -H "Accept: application/json" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" https://api.homeexchange.com/v1/users/2771291`;
        console.log('Running curl command:', curlCommand);

        const { stdout, stderr } = await execAsync(curlCommand);
        
        if (stderr) {
            console.error('Curl error:', stderr);
        }

        const userData = JSON.parse(stdout);
        console.log('Successfully fetched user data');
        
        // Find the specific home in the user's homes
        const home = userData.homes?.find(h => h.id.toString() === homeId);
        
        if (!home) {
            return new Response(JSON.stringify({ 
                message: 'Home not found in user data',
                availableHomes: userData.homes?.map(h => h.id) || []
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Extract images from the home data
        const photos = home.images?.map(image => ({
            url: image.cdn_link,
            order: image.order_display,
            type: image.type
        })) || [];

        // Sort photos by order_display
        photos.sort((a, b) => a.order - b.order);

        console.log(`Found ${photos.length} photos for home ${homeId}`);

        return new Response(JSON.stringify({ photos }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ 
            message: 'Internal server error',
            error: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 