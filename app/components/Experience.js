'use client'

import { useState, useEffect } from 'react'

export default function Experience({ defaultCollapsed = false }) {
  const [expandedExps, setExpandedExps] = useState({})
  const [expandedHomeExchange, setExpandedHomeExchange] = useState(!defaultCollapsed)
  const [expandedSections, setExpandedSections] = useState({})
  const [expandedAchievements, setExpandedAchievements] = useState({})
  
  useEffect(() => {
    setExpandedHomeExchange(!defaultCollapsed)
  }, [defaultCollapsed])
  
  const isHomeExchange = (idx) => idx === 0
  const experiences = [
    {
      company: "HomeExchange",
      position: "Product Manager, Operations & Product Ops",
      period: "Février 2025 - Présent",
      location: "Paris",
      sections: [
        {
          title: "Migration du Back-Office & Modernisation Produit",
          achievements: [
            "Migration d'un back-office legacy vers un système moderne, avec continuité opérationnelle pour <strong>~200 utilisateurs internes</strong> (Customer Care, Sales, Marketing, Ops, PM). Livraison de <strong>~80 fonctionnalités</strong> et optimisation de modules critiques : Utilisateurs, Maisons, Échanges, permissions, workflows internes",
            "Expérience confirmée sur produit à grande échelle : <strong>400 000 utilisateurs impactés</strong> (<strong>260k membres actifs</strong> + flux nouveaux membres + <strong>2500 Collection</strong>). Gestion de <strong>2,5 millions de comptes créés</strong>",
            "Priorisation des fonctionnalités du BO : enquête métier approfondie, matrice de priorisation (impact business, fréquence, complexité, dépendances), roadmap phasée avec releases progressives",
            "Accompagnement opérationnel de <strong>5 développeurs</strong> (2 internes + 3 externes) : rédaction des tickets, clarification technique, investigation, résolution de problèmes, arbitrage fonctionnel",
            "Production de spécifications complètes (<strong>120 tickets Jira structurés</strong>) : Contexte, Règles métier, Design, Critères d'acceptation, documentation edge cases, captures annotées, workflows",
            "Utilisation intensive de l'<strong>IA générative</strong> pour accélérer la conception, la création de maquettes et la production de tickets (<strong>×3 plus rapide</strong>)",
            "Refonte complète du système Roles & Permissions : enquête métier, rationalisation, architecture \"moindre privilège\", <strong>réduction de 40% des permissions inutiles</strong>"
          ]
        },
        {
          title: "Product Manager de Collection (Maisons d'exception) - 40 features livrées, 2500 clients",
          achievements: [
            "Accompagnement opérationnel de <strong>4 développeurs internes</strong> en collaboration avec un autre Product Manager : rédaction des tickets, clarification technique, investigation, résolution de problèmes, arbitrage fonctionnel",
            "Réflexion et création de fonctionnalités pour permettre une autre manière de chercher avec des <strong>catégories de maisons</strong> testées avec un modèle d'IA",
            "Revamp du funnel de candidature : application multi-étapes avec features comme la possibilité d'annuler sa candidature, sauvegarde/reprise, vérification éligibilité automatisée, suivi de statut, notifications contextuelles. <strong>Taux de complétion : 87%</strong>",
            "Coordination avec autres équipes/squads : <strong>Squad Paiement</strong> pour intégrer le paiement du free trial, <strong>Squad User</strong> pour intégrer l'authentification et l'inscription avec Auth0",
            "Algorithme data-driven de traitement de l'éligibilité Collection et du <strong>ranking des maisons</strong> : optimisation de l'affichage et du choix des maisons à mettre en avant",
            "Exposition de la page Collection à l'intérieur du site homeexchange.com : création de <strong>nouveaux touchpoints</strong> pour exposition accrue. <strong>+25% d'exposition</strong> grâce à l'affichage de bannières pour tous les membres éligibles",
            "Revamp de la page d'accueil : bannière principale de la section Collection"
          ]
        },
        {
          title: "Product Ops, Opérations & Process",
          achievements: [
            "Système d'automatisation Slack→Jira innovant : workflow automatisé collectant retours utilisateurs, création/liaison automatique de tickets, suivi état d'avancement visible dans Slack. Premier du genre chez HomeExchange",
            "Système de gestion demandes : séparation bugs (#bug-report) et features (#run-bo-requests), amélioration temps de réponse pour 4 équipes business",
            "Création d'outils pour création de comptes en staging : automatisation des processus de test et développement"
          ]
        }
      ]
    },
    {
      company: "Diplome (SaaS)",
      position: "Product Engineer et Designer",
      period: "2022 - 2024",
      location: "Paris",
      achievements: [
        "Création SaaS d'authentification/certification pour organismes de formation. Architecture MVC, API backend Next.js, bases PostgreSQL/Prisma",
        "Features livrées : authentification des diplômes, intégration API RNCP, système d'émargement, gestion des étudiants, génération des diplômes, édition et personnalisation des diplômes. Plus de 100 diplômes émis à ce jour"
      ]
    },
    {
      company: "Villette Makerz",
      position: "Directeur de Formation",
      period: "2020 - 2021",
      location: "Paris",
      achievements: [
        "Conception programme Circular Designer et référentiel compétences certification Qualiopi",
        "Évaluation et suivi de 30 apprenants. Enseignement Design Thinking"
      ]
    },
    {
      company: "Université de Paris | CRI / LPI",
      position: "Fablab Manager",
      period: "2016 - 2020",
      location: "Paris",
      achievements: [
        "Enseignement de cours \"Learning by Doing\" : accompagnement d'étudiants (sciences de l'éducation, biologie, master EdTech) dans des projets utilisant les outils du FabLab",
        "Projets réalisés avec les étudiants : conception, fabrication numérique (imprimantes 3D, découpeuses laser), électronique, programmation, usinage CNC",
        "Création d'une interface de gestion Airtable (CRM) pour mesurer l'emprunt d'équipements, les réservations, les cours et sessions de cours"
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
            Expérience
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expandedSection ? '−' : '+'}
            </span>
          </span>
        </h2>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSection ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-none print:!opacity-100`}
      >
      <div className="space-y-8 print:space-y-3">
        {experiences.map((exp, idx) => (
          <div 
            key={idx} 
            itemScope 
            itemType="https://schema.org/OrganizationRole"
          >
            <div className="flex justify-between items-start mb-4 print:mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 group">
                  <div 
                    className={`inline-block transition-all ${!exp.sections ? 'cursor-pointer hover:bg-slate-50 px-2 py-1 rounded -ml-2 -mt-1' : exp.sections && isHomeExchange(idx) ? 'cursor-pointer hover:bg-slate-50 px-2 py-1 rounded -ml-2 -mt-1' : ''}`}
                    onClick={!exp.sections ? () => setExpandedExps(prev => ({ ...prev, [idx]: !prev[idx] })) : (exp.sections && isHomeExchange(idx) ? () => setExpandedHomeExchange(!expandedHomeExchange) : undefined)}
                  >
                    <h3 
                      className={`text-xl font-light text-slate-900 mb-1 print:text-base print:mb-0.5 transition-colors ${!exp.sections || (exp.sections && isHomeExchange(idx)) ? 'hover:text-slate-700' : ''}`}
                      itemProp="roleName"
                    >
                      {exp.position}
                    </h3>
                  </div>
                  {!exp.sections && exp.achievements.length > 0 && (
                    <button
                      onClick={() => setExpandedExps(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      className="text-xs text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all print:hidden"
                      aria-label={expandedExps[idx] ? 'Réduire' : 'Développer'}
                    >
                      {expandedExps[idx] ? '−' : '+'}
                    </button>
                  )}
                  {exp.sections && isHomeExchange(idx) && (
                    <button
                      onClick={() => setExpandedHomeExchange(!expandedHomeExchange)}
                      className="text-xs text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all print:hidden"
                      aria-label={expandedHomeExchange ? 'Réduire' : 'Développer'}
                    >
                      {expandedHomeExchange ? '−' : '+'}
                    </button>
                  )}
                </div>
                <p className="text-slate-600 font-light print:text-xs" itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name">{exp.company}</span>
                </p>
              </div>
              <div className="text-right text-sm text-slate-500 font-light print:text-xs">
                <p itemProp="startDate">{exp.period}</p>
                <p itemProp="jobLocation" itemScope itemType="https://schema.org/Place">
                  <span itemProp="address">{exp.location}</span>
                </p>
              </div>
            </div>
            {exp.sections ? (
              <div className="space-y-5 print:space-y-2">
                {exp.sections.map((section, sIdx) => {
                  const sectionKey = `${idx}-${sIdx}`
                  const isSectionExpanded = expandedSections[sectionKey] !== false
                  return (
                    <div key={sIdx} className="ml-1">
                      <div className="flex items-center gap-2 mb-2.5 group">
                        <span className="text-slate-400 text-xs flex-shrink-0">•</span>
                        <h4 
                          className="text-base font-medium text-slate-800 tracking-wide uppercase print:text-sm print:mb-1 cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent"
                          onClick={() => setExpandedSections(prev => ({ ...prev, [sectionKey]: !isSectionExpanded }))}
                        >
                          {section.title}
                          <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
                            {isSectionExpanded ? '−' : '+'}
                          </span>
                        </h4>
                      </div>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isSectionExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-none print:!opacity-100`}
                      >
                        <ul className="list-none space-y-2.5 text-slate-600 ml-0 print:space-y-1.5">
                          {section.achievements.map((achievement, i) => (
                            <li 
                              key={i} 
                              className="text-base leading-relaxed flex items-center print:text-sm print:leading-relaxed"
                            >
                              <span className="text-slate-400 mr-2.5 print:mr-2 flex-shrink-0">•</span>
                              <span dangerouslySetInnerHTML={{ __html: achievement }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedExps[idx] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-none print:!opacity-100`}
              >
                <ul className="list-none space-y-1.5 text-slate-600 ml-0 print:space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li 
                      key={i} 
                      className="text-sm leading-relaxed flex items-center print:text-xs print:leading-relaxed"
                    >
                      <span className="text-slate-400 mr-2 print:mr-1 flex-shrink-0">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
