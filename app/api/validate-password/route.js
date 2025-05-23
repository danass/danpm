import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    // Get the password from environment variable
    const validPassword = process.env.CASE_STUDY_PASSWORD;
    
    if (!validPassword) {
      console.error('CASE_STUDY_PASSWORD environment variable is not set');
      return NextResponse.json({ valid: false }, { status: 500 });
    }

    // Compare passwords using timing-safe comparison
    const isValid = await comparePasswords(password, validPassword);
    
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error('Password validation error:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}

// Timing-safe string comparison to prevent timing attacks
async function comparePasswords(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  
  if (a.length !== b.length) {
    return false;
  }
  
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  
  let result = 0;
  for (let i = 0; i < aBytes.length; i++) {
    result |= aBytes[i] ^ bBytes[i];
  }
  
  return result === 0;
} 