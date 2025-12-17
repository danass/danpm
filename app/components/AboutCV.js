'use client'

import { useLanguage } from '../contexts/LanguageContext'

export default function AboutCV() {
  const { t } = useLanguage()
  const stackInfo = "Next.js 15+, React 19, Tailwind CSS, PostCSS | ATS-friendly, Schema.org metadata, Print-optimized CSS"
  
  return (
    <section className="mt-12 pt-8 border-t border-slate-200">
      <p className="text-xs text-slate-400 text-center font-light italic">
        {t.aboutCV.madeWith}{' '}
        <span className="relative inline-block group">
          <span className="text-slate-500 underline decoration-dotted cursor-help">
            Cursor
          </span>
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-normal max-w-xs text-center z-50 shadow-lg print:hidden">
            {stackInfo}
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></span>
          </span>
        </span>
      </p>
    </section>
  )
}
