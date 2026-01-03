import puppeteer from 'puppeteer'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const baseUrl = searchParams.get('baseUrl') || 'http://localhost:3000'

    let browser = null

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })

        const page = await browser.newPage()

        // Set larger viewport to match website layout
        await page.setViewport({ width: 1400, height: 1800 })

        // Emulate print media for proper styling
        await page.emulateMediaType('print')

        // Navigate to the CV page
        await page.goto(baseUrl, {
            waitUntil: 'networkidle0',
            timeout: 30000
        })

        // Wait for content to load
        await page.waitForSelector('#cv-pdf-content', { timeout: 10000 })

        // Hide elements that shouldn't be in PDF
        await page.evaluate(() => {
            // Hide buttons and UI elements
            document.querySelectorAll('.print\\:hidden, [class*="print:hidden"]').forEach(el => {
                el.style.display = 'none'
            })
            // Hide Hero and ProjectsShowcase
            document.querySelectorAll('.pdf-exclude').forEach(el => {
                el.style.display = 'none'
            })
        })

        // Get the content height
        const contentHeight = await page.evaluate(() => {
            const element = document.getElementById('cv-pdf-content')
            return element ? element.scrollHeight : 1600
        })

        // Generate PDF with custom height (no pagination)
        // Using wider format to match website layout
        const pdfWidth = 280 // mm - wider than A4 to match website proportions
        const pdf = await page.pdf({
            width: `${pdfWidth}mm`,
            height: `${Math.ceil(contentHeight * 0.264583) + 20}mm`, // Convert px to mm + margin
            printBackground: true,
            margin: { top: '10mm', right: '15mm', bottom: '10mm', left: '15mm' },
            scale: 0.85 // Slightly smaller to fit better
        })

        await browser.close()

        return new Response(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Daniel_Assayag_CV.pdf"'
            }
        })
    } catch (error) {
        console.error('PDF generation error:', error)
        if (browser) await browser.close()

        return Response.json({
            error: 'Erreur lors de la génération du PDF',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 })
    }
}
