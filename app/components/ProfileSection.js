'use client'

import { useState } from 'react'

export default function ProfileSection() {
  const [expanded, setExpanded] = useState(true)

  return (
    <section itemScope itemType="https://schema.org/ProfilePage">
      <div className="flex items-center gap-2 mb-6 group">
        <h2 className="text-2xl font-medium text-slate-800 tracking-tight border-b border-slate-200 pb-3 print:mb-2 print:pb-1 print:text-lg flex-1">
          <span 
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpanded(!expanded)}
          >
            Profil
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expanded ? '−' : '+'}
            </span>
          </span>
        </h2>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-none print:!opacity-100`}
      >
        <p className="text-slate-600 leading-relaxed text-lg font-light print:text-sm print:leading-snug mb-4" itemProp="description">
          Product Manager spécialisé dans la modernisation de systèmes legacy et l&apos;optimisation produit. 
          Expert en rédaction de spécifications détaillées, accompagnement d&apos;équipes techniques, conception de fonctionnalités 
          data-driven, et prise en compte des besoins utilisateurs et objectifs business.
        </p>
      </div>
    </section>
  )
}
