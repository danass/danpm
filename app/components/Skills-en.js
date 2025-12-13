'use client'

import { useState, useEffect } from 'react'

export default function Skills({ defaultCollapsed = false }) {
  const [expandedCategories, setExpandedCategories] = useState(
    Object.fromEntries(Array.from({ length: 5 }, (_, i) => [i, !defaultCollapsed]))
  )
  
  useEffect(() => {
    setExpandedCategories(
      Object.fromEntries(Array.from({ length: 5 }, (_, i) => [i, !defaultCollapsed]))
    )
  }, [defaultCollapsed])
  
  const skillCategories = [
    {
      category: "Product Management",
      skills: [
        "Product Strategy & Roadmap",
        "Feature Prioritization",
        "Sprint Planning",
        "Key Performance Indicators (KPIs) Implementation",
        "User Research & Stakeholder Interviews",
        "Specifications & Requirements (Expert)",
        "Feature Engineering",
        "A/B Testing & KPI Tracking",
        "PRD Writing & Documentation",
        "Data-Driven Product Management",
        "Cohort Analysis & Customer Lifetime Value"
      ]
    },
    {
      category: "Technical",
      skills: [
        "React, Next.js, PostgreSQL, Prisma",
        "SQL & Data Analysis (Metabase)",
        "API Design & Architecture",
        "Auth0, Datadog",
        "AWS, Athena",
        "Git, Docker, Nginx",
        "Advanced technical understanding"
      ]
    },
    {
      category: "Design & UX",
      skills: [
        "Product Design",
        "User Experience (UX) Design",
        "User Interface (UI) Design",
        "UX Research",
        "User Experience (UX)"
      ]
    },
    {
      category: "Tools & Automation",
      skills: [
        "JIRA (Expert)",
        "Notion",
        "Confluence, Airtable",
        "Figma, Tableau, Google Analytics, Metabase",
        "Dust AI, Cursor",
        "Slack Automation",
        "Generative AI (Design & Prototyping)"
      ]
    },
    {
      category: "Soft Skills",
      skills: [
        "Cross-functional team leadership",
        "Stakeholder Management (CPO, Sales, Marketing, Tech)",
        "Technical/non-technical communication",
        "Change Management & Adoption",
        "Strategic Problem Solving"
      ]
    }
  ]

  const [expandedSection, setExpandedSection] = useState(true)

  return (
    <section>
      <div className="flex items-center gap-2 mb-6 group">
        <h2 className="text-2xl font-medium text-slate-800 tracking-tight border-b border-slate-200 pb-3 print:mb-2 print:pb-1 print:text-lg flex-1">
          <span 
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpandedSection(!expandedSection)}
          >
            Skills
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expandedSection ? '−' : '+'}
            </span>
          </span>
        </h2>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSection ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-none print:!opacity-100`}
      >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4">
        {skillCategories.map((category, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-3 group">
              <h3 
                className="font-medium text-slate-900 text-sm tracking-wide uppercase print:text-xs print:mb-1 cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent"
                onClick={() => setExpandedCategories(prev => ({ ...prev, [idx]: !prev[idx] }))}
              >
                {category.category}
              </h3>
              {category.skills.length > 3 && (
                <button
                  onClick={() => setExpandedCategories(prev => ({ ...prev, [idx]: !prev[idx] }))}
                  className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden"
                  aria-label={expandedCategories[idx] ? 'Collapse' : 'Expand'}
                >
                  {expandedCategories[idx] ? '−' : '+'}
                </button>
              )}
            </div>
            <div 
              className={`flex flex-wrap gap-2 print:gap-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedCategories[idx] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-none print:!opacity-100`}
            >
              {category.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="inline-block bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-sm font-light print:bg-slate-100 print:text-slate-700 hover:bg-slate-200 transition-all duration-200 cursor-default"
                >
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
