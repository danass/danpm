'use client'

import { useState, useEffect } from 'react'

export default function Experience({ defaultCollapsed = false }) {
  const [expandedExps, setExpandedExps] = useState({})
  const [expandedHomeExchange, setExpandedHomeExchange] = useState(!defaultCollapsed)
  const [expandedSections, setExpandedSections] = useState({})
  const [expandedSection, setExpandedSection] = useState(true)
  const [expandedAchievements, setExpandedAchievements] = useState({})
  
  useEffect(() => {
    setExpandedHomeExchange(!defaultCollapsed)
  }, [defaultCollapsed])
  
  const isHomeExchange = (idx) => idx === 0
  const experiences = [
    {
      company: "HomeExchange",
      position: "Product Manager, Operations & Product Ops",
      period: "February 2025 - Present",
      location: "Paris",
      sections: [
        {
          title: "BACK-OFFICE MIGRATION & PRODUCT MODERNIZATION",
          achievements: [
            "Migration of a legacy back-office to a modern system, with operational continuity for <strong>~200 internal users</strong> (Customer Care, Sales, Marketing, Ops, PM). Delivery of <strong>~80 features</strong> and optimization of critical modules: Users, Homes, Exchanges, permissions, internal workflows",
            "Proven experience on large-scale products: <strong>400,000 impacted users</strong> (<strong>260k active members</strong> + new member flow + <strong>2,500 Collection</strong>). Management of <strong>2.5 million created accounts</strong>",
            "BO feature prioritization: in-depth business research, prioritization matrix (business impact, frequency, complexity, dependencies), phased roadmap with progressive releases",
            "Operational support for <strong>5 developers</strong> (2 internal + 3 external): ticket writing, technical clarification, investigation, problem resolution, functional arbitration",
            "Production of complete specifications (<strong>120 structured Jira tickets</strong>): Context, Business rules, Design, Acceptance criteria, edge cases documentation, annotated screenshots, workflows",
            "Intensive use of <strong>generative AI</strong> to accelerate design, mockup creation and ticket production (<strong>×3 faster</strong>)",
            "Complete Roles & Permissions system overhaul: business research, rationalization, \"least privilege\" architecture, <strong>40% reduction in unnecessary permissions</strong>"
          ]
        },
        {
          title: "PRODUCT MANAGER OF COLLECTION (EXCEPTIONAL HOMES) - 40 FEATURES DELIVERED, 2500 CLIENTS",
          achievements: [
            "Operational support for <strong>4 internal developers</strong> in collaboration with another Product Manager: ticket writing, technical clarification, investigation, problem resolution, functional arbitration",
            "Reflection and creation of features to enable a different way of searching with <strong>house categories</strong> tested with an AI model",
            "Candidate funnel revamp: multi-step application with features such as the ability to cancel one's application, save/resume, automated eligibility verification, status tracking, contextual notifications. <strong>Completion rate: 87%</strong>",
            "Coordination with other teams/squads: <strong>Payment Squad</strong> to integrate free trial payment, <strong>User Squad</strong> to integrate authentication and registration with Auth0",
            "Data-driven algorithm for Collection eligibility processing and <strong>house ranking</strong>: optimization of display and selection of houses to highlight",
            "Collection page exposure within homeexchange.com site: creation of <strong>new touchpoints</strong> for increased exposure. <strong>+25% exposure</strong> thanks to banner display for all eligible members",
            "Homepage revamp: main banner of the Collection section"
          ]
        },
        {
          title: "PRODUCT OPS, OPERATIONS & PROCESS",
          achievements: [
            "Innovative Slack→Jira automation system: automated workflow collecting user feedback, automatic ticket creation/linking, progress tracking visible in Slack. First of its kind at HomeExchange",
            "Request management system: separation of bugs (#bug-report) and features (#run-bo-requests), improved response time for 4 business teams",
            "Creation of tools for staging account creation: automation of test and development processes"
          ]
        }
      ]
    },
    {
      company: "Diplome (SaaS)",
      position: "Product Engineer and Designer",
      period: "2022 - 2024",
      location: "Paris",
      achievements: [
        "SaaS creation for authentication/certification for training organizations. MVC architecture, Next.js backend API, PostgreSQL/Prisma databases",
        "Features delivered: diploma authentication, RNCP API integration, attendance system, student management, diploma generation, diploma editing and personalization. Over 100 diplomas issued to date"
      ]
    },
    {
      company: "Villette Makerz",
      position: "Training Director",
      period: "2020 - 2021",
      location: "Paris",
      achievements: [
        "Circular Designer program design and Qualiopi certification competency framework",
        "Evaluation and follow-up of 30 learners. Design Thinking teaching"
      ]
    },
    {
      company: "Université de Paris | CRI / LPI",
      position: "Fablab Manager",
      period: "2016 - 2020",
      location: "Paris",
      achievements: [
        "Teaching \"Learning by Doing\" courses: supporting students (education sciences, biology, EdTech master's) in projects using FabLab tools",
        "Projects carried out with students: design, digital fabrication (3D printers, laser cutters), electronics, programming, CNC machining",
        "Creation of an Airtable management interface (CRM) to measure equipment loans, reservations, courses and course sessions"
      ]
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
            Experience
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
                      aria-label={expandedExps[idx] ? 'Collapse' : 'Expand'}
                    >
                      {expandedExps[idx] ? '−' : '+'}
                    </button>
                  )}
                  {exp.sections && isHomeExchange(idx) && (
                    <button
                      onClick={() => setExpandedHomeExchange(!expandedHomeExchange)}
                      className="text-xs text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all print:hidden"
                      aria-label={expandedHomeExchange ? 'Collapse' : 'Expand'}
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
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isHomeExchange(idx) && expandedHomeExchange ? 'max-h-[5000px] opacity-100' : isHomeExchange(idx) ? 'max-h-0 opacity-0' : 'max-h-[5000px] opacity-100'} print:!max-h-none print:!opacity-100`}
              >
                <div className="space-y-5 print:space-y-2">
                  {exp.sections.map((section, sIdx) => {
                    const sectionKey = `${idx}-${sIdx}`
                    const isExpanded = expandedSections[sectionKey] !== false
                    return (
                      <div key={sIdx} className="ml-1">
                        <div className="flex items-center gap-2 mb-2.5 group">
                          <span className="text-slate-400 text-xs flex-shrink-0">•</span>
                          <h4 
                            className="text-base font-medium text-slate-800 tracking-wide uppercase print:text-sm print:mb-1 cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent"
                            onClick={() => setExpandedSections(prev => ({ ...prev, [sectionKey]: !isExpanded }))}
                          >
                            {section.title}
                            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
                              {isExpanded ? '−' : '+'}
                            </span>
                          </h4>
                        </div>
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} print:!max-h-none print:!opacity-100`}
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
