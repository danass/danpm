'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Experience({ defaultCollapsed = false }) {
  const [expandedExps, setExpandedExps] = useState({})
  const [expandedHomeExchange, setExpandedHomeExchange] = useState(!defaultCollapsed)
  const [expandedSections, setExpandedSections] = useState({})
  const [expandedAchievements, setExpandedAchievements] = useState({})
  const { t, experiences } = useLanguage()
  
  useEffect(() => {
    setExpandedHomeExchange(!defaultCollapsed)
  }, [defaultCollapsed])
  
  const isHomeExchange = (idx) => idx === 0
  
  // Utiliser les données du contexte
  const experiencesData = experiences

  const [expandedSection, setExpandedSection] = useState(true)

  return (
    <section>
      <div className="flex items-center gap-2 mb-6 group">
        <h2 className="text-2xl font-medium text-slate-800 tracking-tight border-b border-slate-200 pb-3 flex-1">
          <span 
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpandedSection(!expandedSection)}
          >
            {t.experience.title}
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expandedSection ? '−' : '+'}
            </span>
          </span>
        </h2>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSection ? 'max-h-[5000px] opacity-100 print:!max-h-none print:!opacity-100' : 'max-h-0 opacity-0'}`}
      >
      <div className="space-y-8">
        {experiencesData.map((exp, idx) => {
          // Parse dates for Schema.org
          const parseDate = (periodStr) => {
            if (!periodStr) return { start: null, end: null, isPresent: false };
            const isPresent = periodStr.includes(t.experience.present);
            // Year range format (e.g., "2022 - 2024")
            const yearRangeMatch = periodStr.match(/(\d{4})\s*-\s*(\d{4})/);
            if (yearRangeMatch) {
              return { start: `${yearRangeMatch[1]}-01-01`, end: `${yearRangeMatch[2]}-12-31`, isPresent: false, startDisplay: yearRangeMatch[1], endDisplay: yearRangeMatch[2] };
            }
            const parts = periodStr.split(' - ');
            if (parts.length === 2) {
              const start = parts[0].trim();
              const end = isPresent ? null : parts[1].trim();
              // Convert French month names to ISO format
              const monthMap = {
                'Janvier': '01', 'Février': '02', 'Mars': '03', 'Avril': '04',
                'Mai': '05', 'Juin': '06', 'Juillet': '07', 'Août': '08',
                'Septembre': '09', 'Octobre': '10', 'Novembre': '11', 'Décembre': '12'
              };
              const startMatch = start.match(/(\w+)\s+(\d{4})/);
              const endMatch = end && end.match(/(\w+)\s+(\d{4})/);
              const startISO = startMatch ? `${startMatch[2]}-${monthMap[startMatch[1]] || '01'}-01` : null;
              const endISO = endMatch ? `${endMatch[2]}-${monthMap[endMatch[1]] || '12'}-31` : null;
              return { start: startISO, end: endISO, isPresent, startDisplay: start, endDisplay: end || t.experience.present };
            }
            // Single year format
            const yearMatch = periodStr.match(/(\d{4})/);
            if (yearMatch && !periodStr.includes('-')) {
              return { start: `${yearMatch[1]}-01-01`, end: `${yearMatch[1]}-12-31`, isPresent: false, startDisplay: periodStr, endDisplay: periodStr };
            }
            return { start: null, end: null, isPresent: false, startDisplay: periodStr, endDisplay: periodStr };
          };
          
          const dates = parseDate(exp.period);
          
          return (
            <div 
              key={idx} 
              itemScope 
              itemType="https://schema.org/OrganizationRole"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {/* Nom de l'entreprise - placé AVANT le titre du poste pour une meilleure détection ATS */}
                  <p className="text-slate-600 font-medium mb-1" itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                    <meta itemProp="name" content={exp.company} />
                    <span itemProp="name">{exp.company}</span>
                  </p>
                  <div className="flex items-center gap-2 group">
                    <div 
                      className={`inline-block transition-all ${!exp.sections ? 'cursor-pointer hover:bg-slate-50 px-2 py-1 rounded -ml-2 -mt-1' : exp.sections && isHomeExchange(idx) ? 'cursor-pointer hover:bg-slate-50 px-2 py-1 rounded -ml-2 -mt-1' : ''}`}
                      onClick={!exp.sections ? () => setExpandedExps(prev => ({ ...prev, [idx]: !prev[idx] })) : (exp.sections && isHomeExchange(idx) ? () => setExpandedHomeExchange(!expandedHomeExchange) : undefined)}
                    >
                      <h3 
                        className={`text-xl font-light text-slate-900 mb-1 transition-colors ${!exp.sections || (exp.sections && isHomeExchange(idx)) ? 'hover:text-slate-700' : ''}`}
                        itemProp="roleName"
                      >
                        {exp.position}
                      </h3>
                    </div>
                    {!exp.sections && exp.achievements.length > 0 && (
                      <button
                        onClick={() => setExpandedExps(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        className="text-xs text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all print:hidden"
                        aria-label={expandedExps[idx] ? t.experience.collapse : t.experience.expand}
                      >
                        {expandedExps[idx] ? '−' : '+'}
                      </button>
                    )}
                    {exp.sections && isHomeExchange(idx) && (
                      <button
                        onClick={() => setExpandedHomeExchange(!expandedHomeExchange)}
                        className="text-xs text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all print:hidden"
                        aria-label={expandedHomeExchange ? t.experience.collapse : t.experience.expand}
                      >
                        {expandedHomeExchange ? '−' : '+'}
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm text-slate-500 font-light">
                  {dates.start && (
                    <p>
                      <time itemProp="startDate" dateTime={dates.start}>{dates.startDisplay}</time>
                      {dates.end && !dates.isPresent && <span> - <time itemProp="endDate" dateTime={dates.end}>{dates.endDisplay}</time></span>}
                      {dates.isPresent && <span> - <time itemProp="endDate">{dates.endDisplay}</time></span>}
                    </p>
                  )}
                  {!dates.start && <p>{exp.period}</p>}
                  <p itemProp="jobLocation" itemScope itemType="https://schema.org/Place">
                    <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <span itemProp="addressLocality">{exp.location}</span>
                    </span>
                  </p>
                </div>
              </div>
            {exp.sections ? (
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isHomeExchange(idx) && expandedHomeExchange ? 'max-h-[5000px] opacity-100 print:!max-h-none print:!opacity-100' : isHomeExchange(idx) ? 'max-h-0 opacity-0' : 'max-h-[5000px] opacity-100 print:!max-h-none print:!opacity-100'}`}
                itemProp="description"
              >
                <div className="space-y-5">
                  {exp.sections.map((section, sIdx) => {
                    const sectionKey = `${idx}-${sIdx}`
                    const isSectionExpanded = expandedSections[sectionKey] !== false
                    return (
                      <div key={sIdx} className="ml-1">
                        <div className="flex items-center gap-2 mb-2.5 group">
                          <span className="text-slate-400 text-xs flex-shrink-0">•</span>
                          <h4 
                            className="text-base font-medium text-slate-800 tracking-wide uppercase cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent"
                            onClick={() => setExpandedSections(prev => ({ ...prev, [sectionKey]: !isSectionExpanded }))}
                          >
                            {section.title}
                            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
                              {isSectionExpanded ? '−' : '+'}
                            </span>
                          </h4>
                        </div>
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isSectionExpanded ? 'max-h-[2000px] opacity-100 print:!max-h-none print:!opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                        <ul className="list-none space-y-2.5 text-slate-600 ml-6">
                          {section.achievements.map((achievement, i) => (
                            <li 
                              key={i} 
                              className="text-base leading-relaxed flex items-start"
                            >
                              <span className="text-slate-400 mr-2.5 print:mr-2 flex-shrink-0 mt-0.5">−</span>
                              <span dangerouslySetInnerHTML={{ __html: achievement }} />
                            </li>
                          ))}
                        </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedExps[idx] ? 'max-h-[1000px] opacity-100 print:!max-h-none print:!opacity-100' : 'max-h-0 opacity-0'}`}
                itemProp="description"
              >
                <ul className="list-none space-y-1.5 text-slate-600 ml-0">
                  {exp.achievements.map((achievement, i) => (
                    <li 
                      key={i} 
                      className="text-sm leading-relaxed flex items-center"
                    >
                      <span className="text-slate-400 mr-2 print:mr-1 flex-shrink-0">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          );
        })}
      </div>
      </div>
    </section>
  )
}
