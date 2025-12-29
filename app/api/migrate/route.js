import { NextResponse } from 'next/server'
import Database from 'better-sqlite3'
import { join } from 'path'
import crypto from 'crypto'

const dbPath = join(process.cwd(), 'data', 'cv.db')

function getDatabase() {
  return new Database(dbPath)
}

function initAdminTable(db) {
  // Créer la table admin si elle n'existe pas
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

function hasAdmin() {
  const db = getDatabase()
  initAdminTable(db)
  const result = db.prepare('SELECT COUNT(*) as count FROM admin').get()
  return result.count > 0
}

export async function GET() {
  // Si un admin existe déjà, retourner une erreur
  if (hasAdmin()) {
    return NextResponse.json(
      { error: 'Admin already exists. Migration route is disabled.' },
      { status: 403 }
    )
  }

  return NextResponse.json({
    message: 'Migration route is available. Use POST to create admin.',
    available: true
  })
}

export async function POST(request) {
  try {
    // Vérifier si un admin existe déjà
    if (hasAdmin()) {
      return NextResponse.json(
        { error: 'Admin already exists. Migration route is disabled.' },
        { status: 403 }
      )
    }

    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Hasher le mot de passe
    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex')

    const db = getDatabase()
    initAdminTable(db)

    // Insérer l'admin
    db.prepare('INSERT INTO admin (username, password_hash) VALUES (?, ?)').run(
      username,
      passwordHash
    )

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully. Migration route is now disabled.'
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: 'Failed to create admin', details: error.message },
      { status: 500 }
    )
  }
}

