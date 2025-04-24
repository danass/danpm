import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const homeId = searchParams.get('homeId');

    if (!homeId) {
        return new Response(JSON.stringify({ message: 'Home ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { stdout } = await execAsync(`curl -H "Accept: application/json" -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" https://api.homeexchange.com/v1/homes/${homeId}`);
        const homeData = JSON.parse(stdout);

        // Extract and sort photos
        const photos = homeData.images
            .filter(img => img.type === 'HOME')
            .sort((a, b) => a.order_display - b.order_display)
            .map(img => ({
                url: img.cdn_link,
                order: img.order_display
            }));

        return new Response(JSON.stringify({ 
            photos,
            homeInfo: {
                title: homeData.descriptions?.[0]?.translated_title || homeData.descriptions?.[0]?.title,
                location: homeData.translated_admins,
                userId: homeData.user.id,
                userName: homeData.user.first_name
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ 
            message: 'Failed to fetch home data',
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 