// Génère public/Daniel_Assayag_CV.pdf depuis la page /cv (styles print).
// Usage : node scripts/generate-pdf.mjs [baseUrl]
// Prérequis : le serveur Next doit tourner (dev ou start).
import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const baseUrl = process.argv[2] || 'http://localhost:3001'
const outPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'Daniel_Assayag_CV.pdf'
)

async function launch() {
  const args = ['--no-sandbox', '--disable-setuid-sandbox']
  try {
    return await puppeteer.launch({ headless: true, args })
  } catch {
    // Chromium de puppeteer absent : utiliser le Chrome installé sur la machine
    return await puppeteer.launch({ headless: true, args, channel: 'chrome' })
  }
}

const browser = await launch()
try {
  const page = await browser.newPage()
  await page.emulateMediaType('print')
  await page.goto(`${baseUrl}/cv`, { waitUntil: 'networkidle0', timeout: 30000 })
  // L'email n'est pas dans le DOM du site (anti-scraping) : on l'injecte
  // uniquement dans le PDF, via le span .print-only #pdf-contact.
  const injected = await page.evaluate(() => {
    const el = document.getElementById('pdf-contact')
    if (el) el.textContent = 'dan@danpm.com'
    return el ? el.textContent : null
  })
  console.log(`Email injecté dans le PDF : ${injected}`)
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: false,
    margin: { top: '14mm', bottom: '14mm', left: '14mm', right: '14mm' },
  })
  console.log(`PDF écrit : ${outPath}`)
} finally {
  await browser.close()
}
