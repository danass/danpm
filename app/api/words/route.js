import { NextResponse } from 'next/server';
import prisma from '@/lib/db'

// In-memory store (replace with a real database for persistence)
let db = {};

// GET handler to retrieve a list
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get('uuid');

  if (!uuid || !db[uuid]) {
    return NextResponse.json({ message: 'List not found' }, { status: 404 });
  }

  // Return words and finalized status
  return NextResponse.json({ 
    words: db[uuid].words || [], 
    isFinalized: db[uuid].isFinalized || false 
  });
}

// POST handler to create a new list
export async function POST(request) {
  try {
    const { uuid: newUuid, words } = await request.json();

    if (!newUuid || !words || !Array.isArray(words)) {
      return NextResponse.json({ message: 'Missing or invalid uuid or words' }, { status: 400 });
    }

    // Initialize with isFinalized: false
    db[newUuid] = { words: words, isFinalized: false }; 
    return NextResponse.json({ message: 'List created', uuid: newUuid }, { status: 201 });

  } catch (error) {
     console.error("Error parsing POST request body:", error);
     return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}

// PUT handler to update/finalize a list
export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get('uuid');

  if (!uuid || !db[uuid]) {
    return NextResponse.json({ message: 'List not found' }, { status: 404 });
  }

  try {
    const { words, finalize } = await request.json();

    // Prevent updates if already finalized (unless it's the finalization request itself)
    if (db[uuid].isFinalized && !finalize) {
       return NextResponse.json({ message: 'List is finalized and cannot be modified.' }, { status: 403 });
    }

    // Update words if provided (and not finalizing an already final list)
    if (words && Array.isArray(words) && !db[uuid].isFinalized) {
      db[uuid].words = words;
    }

    // Set finalized flag if requested
    if (finalize === true) {
       db[uuid].isFinalized = true;
    }
    
    return NextResponse.json(db[uuid]);

  } catch (error) {
     console.error("Error parsing PUT request body:", error);
     return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }
}
