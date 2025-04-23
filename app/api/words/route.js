import prisma from '@/lib/db'

export async function POST(request) {
  const { uuid, words } = await request.json();
  try {
    const existingWord = await prisma.word.findUnique({
      where: { uuid },
    });

    if (existingWord) {
      return new Response(JSON.stringify({ error: 'UUID already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.word.create({
      data: { uuid, words },
    });
    return new Response(JSON.stringify({ words }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get('uuid');
  try {
    const wordDoc = await prisma.word.findUnique({
      where: { uuid },
    });
    const words = wordDoc ? wordDoc.words : [];
    return new Response(JSON.stringify({ words }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get('uuid');
  const { words } = await request.json();
  try {
    const updatedWord = await prisma.word.update({
      where: { uuid },
      data: { words },
    });
    return new Response(JSON.stringify({ words: updatedWord.words }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: 'Record not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
