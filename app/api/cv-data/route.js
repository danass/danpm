import { getAllCVData, saveCVData } from '@/lib/cv-db'

export async function GET() {
  try {
    const data = getAllCVData()
    return Response.json(data)
  } catch (error) {
    console.error('Error loading CV data:', error)
    // Si la base de données n'existe pas ou est vide, retourner un objet vide
    return Response.json({ fr: {}, en: {} })
  }
}

export async function POST(request) {
  try {
    const { fr, en } = await request.json()
    
    // Sauvegarder les données pour chaque langue
    if (fr) {
      saveCVData('fr', fr)
    }
    if (en) {
      saveCVData('en', en)
    }
    
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error saving CV data:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

