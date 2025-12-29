import { getAllCVData } from '@/lib/cv-db'
import { LanguageProviderClient } from './LanguageProviderClient'

export default async function LanguageProviderWrapper({ children }) {
  // Charger les données depuis SQLite côté serveur
  let initialData = null
  try {
    initialData = getAllCVData()
    // Si les données sont vides, retourner null
    if (initialData && (!initialData.fr || Object.keys(initialData.fr).length === 0) && 
        (!initialData.en || Object.keys(initialData.en).length === 0)) {
      initialData = null
    }
  } catch (error) {
    console.error('Error loading initial CV data:', error)
    initialData = null
  }

  return (
    <LanguageProviderClient initialData={initialData}>
      {children}
    </LanguageProviderClient>
  )
}

