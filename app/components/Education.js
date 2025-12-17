'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Education() {
  const [expandedAdditional, setExpandedAdditional] = useState(false)
  const { t, education: educationData } = useLanguage()
  
  const education = educationData.data
  const additionalEducation = educationData.additional


  const [expandedSection, setExpandedSection] = useState(true)

  return (
    <section>
      <div className="flex items-center gap-2 mb-6 group">
        <h2 className="text-2xl font-medium text-slate-800 tracking-tight border-b border-slate-200 pb-3 flex-1">
          <span 
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpandedSection(!expandedSection)}
          >
            {t.education.title}
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expandedSection ? '−' : '+'}
            </span>
          </span>
        </h2>
        <button
          onClick={() => setExpandedAdditional(!expandedAdditional)}
          className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden"
          aria-label={expandedAdditional ? t.experience.collapse : t.experience.expand}
        >
          {expandedAdditional ? '−' : '+'}
        </button>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSection ? 'max-h-[5000px] opacity-100 print:!max-h-none print:!opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="space-y-5">
        {education.map((edu, idx) => {
          const [startDate, endDate] = edu.period.includes(' - ') ? edu.period.split(' - ') : [edu.period, null];
          const institutionParts = edu.institution.split(', ');
          const institutionName = institutionParts[0];
          const location = institutionParts[1] || null;
          
          return (
            <div 
              key={idx}
              itemScope 
              itemType="https://schema.org/Course"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-light text-slate-900 mb-1" itemProp="name">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-600 font-light">
                    <span itemProp="provider" itemScope itemType="https://schema.org/EducationalOrganization">
                      <span itemProp="name">{institutionName}</span>
                      {location && (
                        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                          <meta itemProp="addressLocality" content={location} />
                          <span> | {location}</span>
                        </span>
                      )}
                    </span>
                  </p>
                  {edu.details && (
                    <p className="text-slate-500 text-sm mt-1 font-light italic" itemProp="description">
                      {edu.details}
                    </p>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-light">
                  {endDate ? (
                    <>
                      <time itemProp="courseStartDate" dateTime={startDate}>{startDate}</time>
                      <span> - </span>
                      <time itemProp="courseEndDate" dateTime={endDate}>{endDate}</time>
                    </>
                  ) : (
                    <time itemProp="courseStartDate" dateTime={startDate}>{startDate}</time>
                  )}
                </p>
              </div>
            </div>
          );
        })}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedAdditional ? 'max-h-[500px] opacity-100 print:!max-h-none print:!opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="space-y-5">
            {additionalEducation.map((edu, idx) => {
              const [startDate, endDate] = edu.period.includes(' - ') ? edu.period.split(' - ') : [edu.period, null];
              const institutionParts = edu.institution.split(', ');
              const institutionName = institutionParts[0];
              const location = institutionParts[1] || null;
              
              return (
                <div 
                  key={idx}
                  itemScope 
                  itemType="https://schema.org/Course"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-light text-slate-900 mb-1" itemProp="name">
                        {edu.degree}
                      </h3>
                      <p className="text-slate-600 font-light">
                        <span itemProp="provider" itemScope itemType="https://schema.org/EducationalOrganization">
                          <span itemProp="name">{institutionName}</span>
                          {location && (
                            <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                              <meta itemProp="addressLocality" content={location} />
                              <span> | {location}</span>
                            </span>
                          )}
                        </span>
                      </p>
                      {edu.details && (
                        <p className="text-slate-500 text-sm mt-1 font-light italic" itemProp="description">
                          {edu.details}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 font-light">
                      {endDate ? (
                        <>
                          <time itemProp="courseStartDate" dateTime={startDate}>{startDate}</time>
                          <span> - </span>
                          <time itemProp="courseEndDate" dateTime={endDate}>{endDate}</time>
                        </>
                      ) : (
                        <time itemProp="courseStartDate" dateTime={startDate}>{startDate}</time>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
