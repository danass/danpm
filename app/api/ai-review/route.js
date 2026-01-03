import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'
const SETTINGS_PATH = path.join(process.cwd(), 'data', 'ai-settings.json')

export async function POST(request) {
    try {
        const { text, type = 'improve', fileContent, fileName } = await request.json()

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 })
        }

        // Load dynamic prompts
        let systemPrompts = {}
        try {
            const settingsData = await fs.readFile(SETTINGS_PATH, 'utf8')
            const settings = JSON.parse(settingsData)
            systemPrompts = settings.prompts
        } catch (e) {
            // Fallback to defaults if file missing
            systemPrompts = {
                improve: "Tu es un coach expert en rédaction de CV...",
                clarify: "Tu es un coach CV bienveillant...",
                simplify: "Tu es un expert en communication claire..."
            }
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
                    {
                        role: 'system',
                        content: (systemPrompts[type] || systemPrompts.improve) +
                            (fileContent ? `\n\nCONTEXTE SUPPLÉMENTAIRE (Fichier: ${fileName || 'document'}):\n${fileContent}\n\nL'utilisateur a joint ce document comme référence. Utilise ces informations pour répondre de manière plus pertinente.` : '')
                    },
                    { role: 'user', content: text }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('Mistral API error:', error)
            return NextResponse.json({ error: 'API error', details: error }, { status: 500 })
        }

        const data = await response.json()
        const suggestion = data.choices?.[0]?.message?.content

        return NextResponse.json({
            suggestion,
            model: data.model,
            usage: data.usage
        })

    } catch (error) {
        console.error('AI Review error:', error)
        return NextResponse.json({
            error: 'Failed to get AI suggestion',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 })
    }
}
