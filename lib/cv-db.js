import Database from 'better-sqlite3'
import { join } from 'path'
import crypto from 'crypto'

const dbPath = join(process.cwd(), 'data', 'cv.db')

// Créer la base de données et les tables si elles n'existent pas
function initDatabase() {
  const db = new Database(dbPath)
  
  // Créer la table cv_data si elle n'existe pas
  db.exec(`
    CREATE TABLE IF NOT EXISTS cv_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      language TEXT UNIQUE NOT NULL,
      data TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Créer la table admin si elle n'existe pas
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Créer la table migrations si elle n'existe pas pour suivre les versions
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT UNIQUE NOT NULL,
      schema_hash TEXT NOT NULL,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  return db
}

// Singleton pour la connexion
let db = null

export function getDatabase() {
  if (!db) {
    db = initDatabase()
  }
  return db
}

// Fonctions utilitaires
export function getCVData(language) {
  const database = getDatabase()
  const row = database.prepare('SELECT data FROM cv_data WHERE language = ?').get(language)
  return row ? JSON.parse(row.data) : null
}

export function saveCVData(language, data) {
  const database = getDatabase()
  const dataJson = JSON.stringify(data)
  
  database
    .prepare('INSERT OR REPLACE INTO cv_data (language, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)')
    .run(language, dataJson)
  
  return true
}

export function getAllCVData() {
  const database = getDatabase()
  const rows = database.prepare('SELECT language, data FROM cv_data').all()
  
  const result = { fr: {}, en: {} }
  rows.forEach(row => {
    result[row.language] = JSON.parse(row.data)
  })
  
  return result
}

// Fonction pour obtenir le hash du schéma actuel
function getSchemaHash() {
  const schema = `
    CREATE TABLE IF NOT EXISTS cv_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      language TEXT UNIQUE NOT NULL,
      data TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT UNIQUE NOT NULL,
      schema_hash TEXT NOT NULL,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `
  return crypto.createHash('sha256').update(schema).digest('hex')
}

// Fonction pour vérifier si une migration est nécessaire
export function needsMigration(version) {
  const database = getDatabase()
  const currentSchemaHash = getSchemaHash()
  
  // Vérifier si cette version a déjà été appliquée avec le même schéma
  const migration = database
    .prepare('SELECT schema_hash FROM migrations WHERE version = ?')
    .get(version)
  
  if (migration && migration.schema_hash === currentSchemaHash) {
    // Le schéma n'a pas changé, pas besoin de migration
    return false
  }
  
  return true
}

// Fonction pour enregistrer une migration
export function recordMigration(version) {
  const database = getDatabase()
  const schemaHash = getSchemaHash()
  
  database
    .prepare('INSERT OR REPLACE INTO migrations (version, schema_hash) VALUES (?, ?)')
    .run(version, schemaHash)
}

