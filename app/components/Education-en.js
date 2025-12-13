'use client'

import { useState } from 'react'

export default function Education() {
  const [expandedAdditional, setExpandedAdditional] = useState(false)
  const [expandedSection, setExpandedSection] = useState(true)
  
  const education = [
    {
      degree: "UX/UI Design and Research",
      institution: "Ironhack, Paris",
      period: "2024",
      details: "< 10% acceptance rate"
    },
    {
      degree: "Graduated with honors",
      institution: "ENSBA Paris",
      period: "2010 - 2015"
    }
  ]

  const additionalEducation = [
    {
      degree: "Post-production and Image Processing",
      institution: "Les Gobelins, Paris",
      period: "2008 - 2010",
      details: ""
    },
    {
      degree: "Modern Literature Degree",
      institution: "Sorbonne",
      period: "2005 - 2008",
      details: ""
    },
    {
      degree: "Agroforestry Training",
      institution: "SIL Agroforesterie",
      period: "2023",
      details: "QGIS, agroforestry project design, sustainable hedgerow management"
    }
  ]

  return (
    <section>
      <div className="flex items-center gap-2 mb-6 group">
        <h2 className="text-2xl font-medium text-slate-800 tracking-tight border-b border-slate-200 pb-3 print:mb-2 print:pb-1 print:text-lg flex-1">
          <span 
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpandedSection(!expandedSection)}
          >
            Education
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expandedSection ? '−' : '+'}
            </span>
          </span>
        </h2>
        <button
          onClick={() => setExpandedAdditional(!expandedAdditional)}
          className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden"
          aria-label={expandedAdditional ? 'Collapse' : 'Expand'}
        >
          {expandedAdditional ? '−' : '+'}
        </button>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSection ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-none print:!opacity-100`}
      >
        <div className="space-y-5">
        {education.map((edu, idx) => (
          <div 
            key={idx}
            itemScope 
            itemType="https://schema.org/EducationalOccupationalCredential"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-light text-slate-900 mb-1" itemProp="credentialCategory">
                  {edu.degree}
                </h3>
                <p className="text-slate-600 font-light" itemProp="educationalLevel">
                  {edu.institution}
                  {edu.location && ` | ${edu.location}`}
                </p>
                {edu.details && (
                  <p className="text-slate-500 text-sm mt-1 font-light italic" itemProp="description">
                    {edu.details}
                  </p>
                )}
              </div>
              <p className="text-sm text-slate-500 font-light" itemProp="dateCreated">
                {edu.period}
              </p>
            </div>
          </div>
        ))}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedAdditional ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-0 print:!opacity-0 print:!hidden`}
        >
          <div className="space-y-5">
            {additionalEducation.map((edu, idx) => (
              <div 
                key={idx}
                itemScope 
                itemType="https://schema.org/EducationalOccupationalCredential"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-light text-slate-900 mb-1" itemProp="credentialCategory">
                      {edu.degree}
                    </h3>
                    <p className="text-slate-600 font-light" itemProp="educationalLevel">
                      {edu.institution}
                      {edu.location && ` | ${edu.location}`}
                    </p>
                    {edu.details && (
                      <p className="text-slate-500 text-sm mt-1 font-light italic" itemProp="description">
                        {edu.details}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 font-light" itemProp="dateCreated">
                    {edu.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
