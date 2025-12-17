

'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Skills({ defaultCollapsed = false }) {
  const { t, skills } = useLanguage()
  // Par défaut, toutes les compétences sont visibles (sauf si defaultCollapsed)
  const [expandedCategories, setExpandedCategories] = useState(
    Object.fromEntries(Array.from({ length: skills.length }, (_, i) => [i, !defaultCollapsed]))
  )
  
  useEffect(() => {
    setExpandedCategories(
      Object.fromEntries(Array.from({ length: skills.length }, (_, i) => [i, !defaultCollapsed]))
    )
  }, [defaultCollapsed, skills.length])
  
  const skillCategories = skills

  const [expandedSection, setExpandedSection] = useState(true)

  return (
    <section itemScope itemType="https://schema.org/ItemList">
      <meta itemProp="name" content="Compétences professionnelles" />
      <div className="flex items-center gap-2 mb-6 group">
        <h2 className="text-2xl font-medium text-slate-800 tracking-tight border-b border-slate-200 pb-3 flex-1">
          <span 
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpandedSection(!expandedSection)}
          >
            {t.skills.title}
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expandedSection ? '−' : '+'}
            </span>
          </span>
        </h2>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSection ? 'max-h-[5000px] opacity-100 print:!max-h-none print:!opacity-100' : 'max-h-0 opacity-0'}`}
      >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} itemScope itemType="https://schema.org/ItemList" itemProp="itemListElement">
            <meta itemProp="name" content={category.category} />
            <div className="flex items-center gap-2 mb-3 group">
              <h3 
                className="font-medium text-slate-900 text-sm tracking-wide uppercase cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent"
                onClick={() => setExpandedCategories(prev => ({ ...prev, [idx]: !prev[idx] }))}
              >
                {category.category}
              </h3>
              {category.skills.length > 3 && (
                <button
                  onClick={() => setExpandedCategories(prev => ({ ...prev, [idx]: !prev[idx] }))}
                  className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden"
                  aria-label={expandedCategories[idx] ? t.experience.collapse : t.experience.expand}
                >
                  {expandedCategories[idx] ? '−' : '+'}
                </button>
              )}
            </div>
            <div 
              className={`flex flex-wrap gap-2 overflow-hidden transition-all duration-300 ease-in-out ${expandedCategories[idx] ? 'max-h-[500px] opacity-100 print:!max-h-none print:!opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {category.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="inline-block bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-sm font-light print:bg-slate-100 print:text-slate-700 hover:bg-slate-200 transition-all duration-200 cursor-default"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  itemProp="itemListElement"
                >
                  <meta itemProp="name" content={skill} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
