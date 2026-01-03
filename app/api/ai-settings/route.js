import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'ai-settings.json')

export async function GET() {
    try {
        const data = await fs.readFile(SETTINGS_PATH, 'utf8')
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const newSettings = await request.json()
        await fs.writeFile(SETTINGS_PATH, JSON.stringify(newSettings, null, 2))
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }
}
