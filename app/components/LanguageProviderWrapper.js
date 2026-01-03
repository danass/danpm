import fs from 'fs'
import path from 'path'
import { LanguageProviderClient } from './LanguageProviderClient'

// Read JSON file synchronously on server
function getInitialData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'cv-data.json')
    const data = fs.readFileSync(dataPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading cv-data.json:', error)
    return null
  }
}

export default async function LanguageProviderWrapper({ children }) {
  const initialData = getInitialData()

  return (
    <LanguageProviderClient initialData={initialData}>
      {children}
    </LanguageProviderClient>
  )
}
