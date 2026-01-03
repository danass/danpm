import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'cv-data.json')

// Read CV data from JSON file
function readCVData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading cv-data.json:', error)
    return { fr: {}, en: {} }
  }
}

// Write CV data to JSON file
function writeCVData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Error writing cv-data.json:', error)
    return false
  }
}

export async function GET() {
  try {
    const data = readCVData()
    return Response.json(data)
  } catch (error) {
    console.error('Error loading CV data:', error)
    return Response.json({ fr: {}, en: {} })
  }
}

export async function POST(request) {
  try {
    const newData = await request.json()

    // Read existing data
    const existingData = readCVData()

    // Merge new data with existing
    const mergedData = {
      fr: newData.fr || existingData.fr,
      en: newData.en || existingData.en
    }

    // Write to JSON file
    const success = writeCVData(mergedData)

    if (success) {
      return Response.json({ success: true, message: 'Données sauvegardées dans cv-data.json' })
    } else {
      return Response.json({ success: false, error: 'Erreur d\'écriture' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error saving CV data:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
