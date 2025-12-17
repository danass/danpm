'use client'

import { useState } from 'react'
import CV from './components/CV'
import { useLanguage } from './contexts/LanguageContext'

export default function Home() {
  const [version, setVersion] = useState('expanded') // 'expanded' ou 'collapsed'
  const { language, changeLanguage, t } = useLanguage()

  return (
    <>
      <div className="no-print fixed top-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setVersion('expanded')}
            className={`px-3 py-1 text-xs rounded ${version === 'expanded' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {language === 'fr' ? 'Version Actuelle' : 'Current Version'}
          </button>
          <button
            onClick={() => setVersion('collapsed')}
            className={`px-3 py-1 text-xs rounded ${version === 'collapsed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {language === 'fr' ? 'Version Collapse' : 'Collapsed Version'}
          </button>
          <button
            onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')}
            className="px-3 py-1 text-xs rounded bg-gray-100 text-gray-700 text-center hover:bg-gray-200 transition-colors"
          >
            {language === 'fr' ? 'English' : 'Français'}
          </button>
        </div>
      </div>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 print:bg-white">
        <CV defaultCollapsed={version === 'collapsed'} />
      </main>
    </>
  )
}
