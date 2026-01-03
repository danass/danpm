import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'
const CV_DATA_PATH = path.join(process.cwd(), 'data', 'cv-data.json')

async function getCVData() {
    try {
        const data = await fs.readFile(CV_DATA_PATH, 'utf8')
        return JSON.parse(data)
    } catch (e) {
        console.error('Failed to load CV data:', e)
        return null
    }
}

function formatCVForPrompt(cvData, lang = 'fr') {
    const cv = cvData[lang] || cvData.fr
    let formatted = `# CV - ${cv.header.name}\n`
    formatted += `**Poste:** ${cv.header.jobTitle}\n`
    formatted += `**Profil:** ${cv.profile.description}\n\n`

    formatted += `## Expériences\n`
    cv.experiences.forEach(exp => {
        formatted += `### ${exp.company} - ${exp.position} (${exp.period})\n`
        if (exp.sections) {
            exp.sections.forEach(section => {
                formatted += `**${section.title}**\n`
                section.achievements.forEach(a => formatted += `- ${a.replace(/<[^>]*>/g, '')}\n`)
            })
        } else if (exp.achievements) {
            exp.achievements.forEach(a => formatted += `- ${a}\n`)
        }
    })

    formatted += `\n## Compétences\n`
    cv.skills.forEach(cat => {
        formatted += `**${cat.category}:** ${cat.skills.map(s => typeof s === 'string' ? s : s.name).join(', ')}\n`
    })

    formatted += `\n## Formation\n`
    cv.education.data.forEach(edu => {
        formatted += `- ${edu.degree} - ${edu.institution} (${edu.period})\n`
    })

    return formatted
}

export async function POST(request) {
    try {
        const { mode, jobOffer, answers, language = 'fr' } = await request.json()

        if (!jobOffer) {
            return NextResponse.json({ error: 'Job offer is required' }, { status: 400 })
        }

        const cvData = await getCVData()
        if (!cvData) {
            return NextResponse.json({ error: 'Failed to load CV data' }, { status: 500 })
        }

        const cvFormatted = formatCVForPrompt(cvData, language)

        let systemPrompt, userPrompt

        if (mode === 'analyze') {
            systemPrompt = `Tu es un expert en recrutement et en rédaction de lettres de motivation. 
Tu vas analyser une offre d'emploi et le CV d'un candidat pour poser des questions ciblées qui aideront à rédiger une lettre de motivation personnalisée et percutante.

Règles:
- Pose exactement 4-5 questions courtes et précises
- Les questions doivent aider à révéler des éléments différenciants
- Cherche à comprendre la motivation réelle, les accomplissements pertinents, et la valeur ajoutée
- Formule les questions de manière conversationnelle
- Réponds uniquement avec les questions, numérotées

CV DU CANDIDAT:
${cvFormatted}`

            userPrompt = `OFFRE D'EMPLOI À ANALYSER:
${jobOffer}

Génère 4-5 questions ciblées pour aider à rédiger une lettre de motivation percutante.`

        } else if (mode === 'generate') {
            if (!answers) {
                return NextResponse.json({ error: 'Answers are required for generation' }, { status: 400 })
            }

            systemPrompt = `Tu es un expert en rédaction de lettres de motivation professionnelles.
Tu vas rédiger une lettre de motivation personnalisée basée sur:
1. L'offre d'emploi
2. Le CV du candidat
3. Les réponses aux questions préparatoires

Règles:
- Longueur: environ 300-400 mots
- Ton: professionnel mais authentique
- Structure: accroche percutante, adéquation profil/poste, valeur ajoutée, conclusion avec appel à l'action
- Mets en avant les accomplissements du CV qui correspondent à l'offre
- Intègre naturellement les réponses du candidat
- Ne fais pas de liste à puces, utilise des paragraphes fluides

CV DU CANDIDAT:
${cvFormatted}`

            userPrompt = `OFFRE D'EMPLOI:
${jobOffer}

RÉPONSES DU CANDIDAT AUX QUESTIONS:
${answers}

Rédige une lettre de motivation personnalisée et percutante.`
        } else {
            return NextResponse.json({ error: 'Invalid mode. Use "analyze" or "generate"' }, { status: 400 })
        }

        const response = await fetch(MISTRAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: 'mistral-small-latest',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: mode === 'generate' ? 2000 : 500
            })
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('Mistral API error:', error)
            return NextResponse.json({ error: 'API error', details: error }, { status: 500 })
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content

        return NextResponse.json({
            content,
            mode,
            usage: data.usage
        })

    } catch (error) {
        console.error('Cover letter API error:', error)
        return NextResponse.json({
            error: 'Failed to process request',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 })
    }
}
