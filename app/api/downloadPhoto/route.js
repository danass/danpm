export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');
        
        if (!url) {
            return new Response(JSON.stringify({ message: 'URL is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const photoResponse = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!photoResponse.ok) {
            return new Response(JSON.stringify({ message: 'Failed to fetch photo' }), {
                status: photoResponse.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const contentType = photoResponse.headers.get('content-type');
        const arrayBuffer = await photoResponse.arrayBuffer();

        return new Response(arrayBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType || 'image/jpeg',
                'Content-Disposition': 'attachment'
            },
        });

    } catch (error) {
        console.error('Error downloading photo:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 