'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Certifications() {
  const [expanded, setExpanded] = useState(true)
  const { t, certifications: certificationsData } = useLanguage()
  const certifications = certificationsData.data

  return (
    <section>
      <div className="flex items-center gap-2 mb-6 group">
        <h2 className="text-2xl font-medium text-slate-800 tracking-tight border-b border-slate-200 pb-3 flex-1">
          <span 
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpanded(!expanded)}
          >
            {t.certifications.title}
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expanded ? '−' : '+'}
            </span>
          </span>
        </h2>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-[500px] opacity-100 print:!max-h-none print:!opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, idx) => (
            <div 
              key={idx} 
              className="flex items-start"
              itemScope 
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              <div className="flex-1">
                <p className="text-sm font-light text-slate-900" itemProp="name">{cert.name}</p>
                <p className="text-xs text-slate-500 font-light mt-0.5" itemProp="credentialCategory">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
