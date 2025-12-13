'use client'

import { useState, useEffect } from 'react'

export default function Skills({ defaultCollapsed = false }) {
  // Par défaut, toutes les compétences sont visibles (sauf si defaultCollapsed)
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
      category: "Gestion de Produit",
      skills: [
        "Stratégie Produit & Roadmap",
        "Priorisation de Features",
        "Planification de Sprints",
        "Implémentation d'Indicateurs Clés de Performance (KPIs)",
        "Recherche Utilisateur & Interviews Stakeholders",
        "Spécifications & Requirements (Expert)",
        "Ingénierie des Fonctionnalités",
        "Tests A/B & Suivi KPIs",
        "Rédaction PRD & Documentation",
        "Product Management Data-Driven",
        "Analyse de Cohortes & Valeur Vie Client"
      ]
    },
    {
      category: "Technique",
      skills: [
        "React, Next.js, PostgreSQL, Prisma",
        "SQL & Analyse de Données (Metabase)",
        "Design & Architecture API",
        "Auth0, Datadog",
        "AWS, Athena",
        "Git, Docker, Nginx",
        "Compréhension technique avancée"
      ]
    },
    {
      category: "Design & UX",
      skills: [
        "Design de Produits",
        "Design d'Expérience Utilisateur (UX)",
        "Design d'Interface Utilisateur (UI)",
        "Recherche UX",
        "Expérience Utilisateur (UX)"
      ]
    },
    {
      category: "Outils & Automatisation",
      skills: [
        "JIRA (Expert)",
        "Notion",
        "Confluence, Airtable",
        "Figma, Tableau, Google Analytics, Metabase",
        "Dust AI, Cursor",
        "Automatisation Slack",
        "IA Générative (Design & Prototypage)"
      ]
    },
    {
      category: "Compétences Transverses",
      skills: [
        "Leadership d'équipes cross-fonctionnelles",
        "Gestion Stakeholders (CPO, Sales, Marketing, Tech)",
        "Communication technique/non-technique",
        "Gestion du Changement & Adoption",
        "Résolution de Problèmes Stratégiques"
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
            Compétences
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
                  aria-label={expandedCategories[idx] ? 'Réduire' : 'Développer'}
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
