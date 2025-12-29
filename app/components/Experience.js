'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useCollapse } from '../contexts/CollapseContext'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'
import RichEditableText from './RichEditableText'
import AddRemoveButtons from './AddRemoveButtons'
import { Plus } from 'lucide-react'

export default function Experience({ defaultCollapsed = false }) {
  const [expandedExps, setExpandedExps] = useState({})
  const [expandedHomeExchange, setExpandedHomeExchange] = useState(!defaultCollapsed)
  const [expandedSections, setExpandedSections] = useState({})
  const [expandedAchievements, setExpandedAchievements] = useState({})
  const { t, experiences, updateData, version } = useLanguage()
  const { isCompact } = useCollapse()
  const { isEditMode, setHasChanges } = useEdit()

  const handleExpChange = (idx, field, newValue) => {
    const newExps = [...experiences]
    newExps[idx] = { ...newExps[idx], [field]: newValue }
    updateData('experiences', newExps)
    setHasChanges(true)
  }

  const handleSectionChange = (expIdx, sectionIdx, field, newValue) => {
    const newExps = [...experiences]
    if (!newExps[expIdx].sections) {
      newExps[expIdx].sections = []
    }
    newExps[expIdx].sections[sectionIdx] = { ...newExps[expIdx].sections[sectionIdx], [field]: newValue }
    updateData('experiences', newExps)
    setHasChanges(true)
  }

  const handleAchievementChange = (expIdx, sectionIdx, achievementIdx, newValue) => {
    const newExps = [...experiences]
    // Si la valeur est vide, supprimer l'achievement
    if (!newValue || newValue.trim() === '') {
      newExps[expIdx].sections[sectionIdx].achievements = newExps[expIdx].sections[sectionIdx].achievements.filter((_, i) => i !== achievementIdx)
    } else {
      newExps[expIdx].sections[sectionIdx].achievements[achievementIdx] = newValue
    }
    updateData('experiences', newExps)
    setHasChanges(true)
  }

  const handleSimpleAchievementChange = (expIdx, achievementIdx, newValue) => {
    const newExps = [...experiences]
    // Si la valeur est vide, supprimer l'achievement
    if (!newValue || newValue.trim() === '') {
      newExps[expIdx].achievements = newExps[expIdx].achievements.filter((_, i) => i !== achievementIdx)
    } else {
      newExps[expIdx].achievements[achievementIdx] = newValue
    }
    updateData('experiences', newExps)
    setHasChanges(true)
  }

  const addAchievement = (expIdx, sectionIdx = null) => {
    const newExps = [...experiences]
    if (sectionIdx !== null) {
      if (!newExps[expIdx].sections[sectionIdx].achievements) {
        newExps[expIdx].sections[sectionIdx].achievements = []
      }
      newExps[expIdx].sections[sectionIdx].achievements.push('')
    } else {
      if (!newExps[expIdx].achievements) {
        newExps[expIdx].achievements = []
      }
      newExps[expIdx].achievements.push('')
    }
    updateData('experiences', newExps)
    setHasChanges(true)
  }

  const removeAchievement = (expIdx, sectionIdx, achievementIdx) => {
    const newExps = [...experiences]
    if (sectionIdx !== null) {
      newExps[expIdx].sections[sectionIdx].achievements = newExps[expIdx].sections[sectionIdx].achievements.filter((_, i) => i !== achievementIdx)
    } else {
      newExps[expIdx].achievements = newExps[expIdx].achievements.filter((_, i) => i !== achievementIdx)
    }
    updateData('experiences', newExps)
    setHasChanges(true)
  }

  useEffect(() => {
    setExpandedHomeExchange(!defaultCollapsed)
  }, [defaultCollapsed])

  useEffect(() => {
    if (version === 'short') {
      setExpandedExps(Object.fromEntries(experiences.map((_, i) => [i, true])))
      setExpandedSection(true)
      setExpandedHomeExchange(true)
    }
  }, [version, experiences.length])

  const isHomeExchange = (idx) => idx === 0

  // Utiliser les données du contexte
  const experiencesData = experiences

  const [expandedSection, setExpandedSection] = useState(true)

  return (
    <section>
      <div className={`flex items-center gap-2 ${isCompact ? 'mb-3' : 'mb-6'} group`}>
        <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-medium text-slate-800 tracking-tight border-b border-slate-200 ${isCompact ? 'pb-2' : 'pb-3'} flex-1`}>
          <span
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpandedSection(!expandedSection)}
          >
            <EditableText
              value={t.experience.title}
              onChange={(val) => {
                updateData('experience.title', val)
                setHasChanges(true)
              }}
              className="inline"
            />
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expandedSection ? '−' : '+'}
            </span>
          </span>
        </h2>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${expandedSection ? 'opacity-100' : 'max-h-0 opacity-0'}`}
        style={expandedSection ? {} : { overflow: 'hidden' }}
      >
        <div className={isCompact ? 'space-y-2' : 'space-y-4'}>
          {experiencesData.map((exp, idx) => {
            // [Previous parseDate code remains exactly the same...]
            const parseDate = (periodStr) => {
              if (!periodStr) return { start: null, end: null, isPresent: false, startDisplay: '', endDisplay: '' };

              const isPresent = periodStr.toLowerCase().includes(t.experience.present.toLowerCase()) ||
                periodStr.toLowerCase().includes('présent') ||
                periodStr.toLowerCase().includes('present');

              const monthMap = {
                'janvier': '01', 'février': '02', 'fevrier': '02', 'mars': '03', 'avril': '04',
                'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08', 'aout': '08',
                'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12', 'decembre': '12',
                'january': '01', 'february': '02', 'march': '03', 'april': '04',
                'may': '05', 'june': '06', 'july': '07', 'august': '08',
                'september': '09', 'october': '10', 'november': '11', 'december': '12'
              };

              const yearRangeMatch = periodStr.match(/(\d{4})\s*[–-]\s*(\d{4})/);
              if (yearRangeMatch) {
                return {
                  start: `${yearRangeMatch[1]}-01-01`,
                  end: isPresent ? null : `${yearRangeMatch[2]}-12-31`,
                  isPresent,
                  startDisplay: yearRangeMatch[1],
                  endDisplay: isPresent ? t.experience.present : yearRangeMatch[2]
                };
              }

              const parts = periodStr.split(/\s*[–-]\s*/);
              if (parts.length === 2) {
                const start = parts[0].trim();
                const end = parts[1].trim();

                let startISO = null;
                let startDisplay = start;
                const startMatch = start.match(/([a-zàâäéèêëïîôùûüÿçœæ]+)\s+(\d{4})/i);
                if (startMatch) {
                  const monthName = startMatch[1].toLowerCase();
                  const year = startMatch[2];
                  const month = monthMap[monthName];
                  if (month) {
                    startISO = `${year}-${month}-01`;
                    startDisplay = `${startMatch[1]} ${year}`;
                  }
                } else {
                  const startYearMatch = start.match(/(\d{4})/);
                  if (startYearMatch) {
                    startISO = `${startYearMatch[1]}-01-01`;
                    startDisplay = startYearMatch[1];
                  }
                }

                let endISO = null;
                let endDisplay = end;

                if (isPresent) {
                  endDisplay = t.experience.present;
                  endISO = new Date().toISOString().split('T')[0];
                } else {
                  const endMatch = end.match(/([a-zàâäéèêëïîôùûüÿçœæ]+)\s+(\d{4})/i);
                  if (endMatch) {
                    const monthName = endMatch[1].toLowerCase();
                    const year = endMatch[2];
                    const month = monthMap[monthName];
                    if (month) {
                      const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
                      endISO = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
                      endDisplay = `${endMatch[1]} ${year}`;
                    }
                  } else {
                    const endYearMatch = end.match(/(\d{4})/);
                    if (endYearMatch) {
                      endISO = `${endYearMatch[1]}-12-31`;
                      endDisplay = endYearMatch[1];
                    }
                  }
                }

                return { start: startISO, end: endISO, isPresent, startDisplay, endDisplay };
              }

              const yearMatch = periodStr.match(/(\d{4})/);
              if (yearMatch && !periodStr.includes('-')) {
                return {
                  start: `${yearMatch[1]}-01-01`,
                  end: `${yearMatch[1]}-12-31`,
                  isPresent: false,
                  startDisplay: yearMatch[1],
                  endDisplay: yearMatch[1]
                };
              }

              const anyYearMatch = periodStr.match(/(\d{4})/);
              if (anyYearMatch) {
                return {
                  start: `${anyYearMatch[1]}-01-01`,
                  end: isPresent ? new Date().toISOString().split('T')[0] : `${anyYearMatch[1]}-12-31`,
                  isPresent,
                  startDisplay: periodStr,
                  endDisplay: periodStr
                };
              }

              return { start: null, end: null, isPresent: false, startDisplay: periodStr, endDisplay: periodStr };
            };

            const calculateDuration = (startDate, endDate, isPresent) => {
              if (!startDate) return '';

              const start = new Date(startDate);
              const end = isPresent || !endDate ? new Date() : new Date(endDate);

              const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
              const years = Math.floor(months / 12);
              const remainingMonths = months % 12;

              if (years === 0 && remainingMonths === 0) {
                return '(< 1 mois)';
              } else if (years === 0) {
                return `(${remainingMonths} mois)`;
              } else if (remainingMonths === 0) {
                return `(${years} an${years > 1 ? 's' : ''})`;
              } else {
                return `(${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois)`;
              }
            };

            const dates = parseDate(exp.period);
            const duration = calculateDuration(dates.start, dates.end, dates.isPresent);

            return (
              <div
                key={idx}
                itemScope
                itemType="https://schema.org/OrganizationRole"
                className={`${idx > 0 ? (isCompact ? 'mt-6 pt-6' : 'mt-8 pt-8') : ''} ${idx > 0 ? 'border-t border-slate-100' : ''}`}
              >
                <div className={`flex justify-between items-start ${isCompact ? 'mb-3' : 'mb-4'}`}>
                  <div className="flex-1">
                    {/* Nom de l'entreprise - placé AVANT le titre du poste pour une meilleure détection ATS */}
                    <p className={`text-slate-700 font-semibold ${isCompact ? 'text-base mb-1' : 'text-lg mb-1.5'}`} itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                      <meta itemProp="name" content={exp.company} />
                      <span className="inline-block">
                        <EditableText
                          value={exp.company}
                          onChange={(val) => handleExpChange(idx, 'company', val)}
                          className="inline"
                        />
                      </span>
                    </p>
                    <div className="flex items-center gap-2 group">
                      <div
                        className={`inline-block transition-all ${!exp.sections ? 'cursor-pointer hover:bg-slate-50 px-2 py-1 rounded' : exp.sections && isHomeExchange(idx) ? 'cursor-pointer hover:bg-slate-50 px-2 py-1 rounded' : ''}`}
                        onClick={!exp.sections ? () => setExpandedExps(prev => ({ ...prev, [idx]: !prev[idx] })) : (exp.sections && isHomeExchange(idx) ? () => setExpandedHomeExchange(!expandedHomeExchange) : undefined)}
                        style={{
                          marginLeft: 0,
                          marginTop: 0
                        }}
                      >
                        <h3
                          className={`${isCompact ? 'text-base' : 'text-lg'} font-normal text-slate-800 ${isCompact ? 'mb-0.5' : 'mb-2'} transition-colors ${!exp.sections || (exp.sections && isHomeExchange(idx)) ? 'hover:text-slate-700' : ''}`}
                          itemProp="roleName"
                        >
                          <span className="inline-block">
                            <EditableText
                              value={exp.position}
                              onChange={(val) => handleExpChange(idx, 'position', val)}
                              className="inline"
                            />
                          </span>
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
                  <div className={`text-right ${isCompact ? 'text-xs' : 'text-sm'} text-slate-600 font-medium whitespace-nowrap`}>
                    {dates.start && (
                      <p>
                        {isEditMode ? (
                          <EditableText
                            value={exp.period}
                            onChange={(val) => handleExpChange(idx, 'period', val)}
                            className="inline"
                          />
                        ) : (
                          <>
                            {dates.start ? (
                              <>
                                <time itemProp="startDate" dateTime={dates.start}>{dates.startDisplay}</time>
                                {dates.end && !dates.isPresent && (
                                  <span> – <time itemProp="endDate" dateTime={dates.end}>{dates.endDisplay}</time></span>
                                )}
                                {dates.isPresent && (
                                  <span> – <time itemProp="endDate" dateTime={new Date().toISOString().split('T')[0]}>{dates.endDisplay}</time></span>
                                )}
                                {duration && (
                                  <span className="text-slate-500 font-normal ml-1">{duration}</span>
                                )}
                              </>
                            ) : (
                              <span>{exp.period}</span>
                            )}
                          </>
                        )}
                      </p>
                    )}
                    {!dates.start && (
                      <p>
                        <EditableText
                          value={exp.period}
                          onChange={(val) => handleExpChange(idx, 'period', val)}
                          className="inline"
                        />
                      </p>
                    )}
                    <p itemProp="jobLocation" itemScope itemType="https://schema.org/Place">
                      <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <EditableText
                          value={exp.location}
                          onChange={(val) => handleExpChange(idx, 'location', val)}
                          className="inline"
                        />
                      </span>
                    </p>
                  </div>
                </div>
                {exp.sections ? (
                  <div
                    className={`transition-all duration-300 ease-in-out ${isHomeExchange(idx) && expandedHomeExchange ? 'opacity-100' : isHomeExchange(idx) ? 'max-h-0 opacity-0' : 'opacity-100'}`}
                    style={isHomeExchange(idx) && !expandedHomeExchange ? { overflow: 'hidden' } : {}}
                    itemProp="description"
                  >
                    <div className={isCompact ? 'space-y-3' : 'space-y-5'}>
                      {exp.sections.map((section, sIdx) => {
                        const sectionKey = `${idx}-${sIdx}`
                        const isSectionExpanded = expandedSections[sectionKey] !== false
                        return (
                          <div key={sIdx} className="ml-1">
                            <div className={`flex items-center gap-2 ${isCompact ? 'mb-1.5' : 'mb-2.5'} group`}>
                              <span className={`text-slate-400 ${isCompact ? 'text-[10px]' : 'text-xs'} flex-shrink-0`}>•</span>
                              <h4
                                className={`${isCompact ? 'text-sm' : 'text-base'} font-medium text-slate-800 tracking-wide uppercase cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent`}
                                onClick={() => setExpandedSections(prev => ({ ...prev, [sectionKey]: !isSectionExpanded }))}
                              >
                                <EditableText
                                  value={section.title}
                                  onChange={(val) => handleSectionChange(idx, sIdx, 'title', val)}
                                  className="inline"
                                />
                                <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
                                  {isSectionExpanded ? '−' : '+'}
                                </span>
                              </h4>
                            </div>
                            <div
                              className={`transition-all duration-300 ease-in-out ${isSectionExpanded ? 'opacity-100' : 'max-h-0 opacity-0'}`}
                              style={!isSectionExpanded ? { overflow: 'hidden' } : {}}
                            >
                              <ul className={`list-none ${isCompact ? 'space-y-1.5' : 'space-y-2.5'} text-slate-600 ${isCompact ? 'ml-4' : 'ml-6'}`}>
                                {section.achievements.map((achievement, i) => (
                                  <li
                                    key={i}
                                    className={`${isCompact ? 'text-sm' : 'text-base'} leading-relaxed flex items-start group`}
                                  >
                                    <span className={`text-slate-400 ${isCompact ? 'mr-1.5 print:mr-1' : 'mr-2.5 print:mr-2'} flex-shrink-0 mt-0.5`}>−</span>
                                    {isEditMode ? (
                                      <>
                                        <RichEditableText
                                          value={achievement}
                                          onChange={(val) => handleAchievementChange(idx, sIdx, i, val)}
                                          multiline={true}
                                          className="flex-1"
                                          tag="div"
                                        />
                                        <AddRemoveButtons
                                          onAdd={() => {
                                            const newExps = [...experiences]
                                            newExps[idx].sections[sIdx].achievements.splice(i + 1, 0, '')
                                            updateData('experiences', newExps)
                                            setHasChanges(true)
                                          }}
                                          onRemove={() => removeAchievement(idx, sIdx, i)}
                                          showAdd={true}
                                        />
                                      </>
                                    ) : (
                                      <span dangerouslySetInnerHTML={{ __html: achievement }} />
                                    )}
                                  </li>
                                ))}
                                {isEditMode && (
                                  <li className="flex items-center">
                                    <button
                                      onClick={() => addAchievement(idx, sIdx)}
                                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-2 py-1 text-xs flex items-center gap-1 transition-colors"
                                    >
                                      <Plus className="h-3 w-3" />
                                      Ajouter une ligne
                                    </button>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`transition-all duration-300 ease-in-out ${expandedExps[idx] ? 'opacity-100' : 'max-h-0 opacity-0'}`}
                    style={!expandedExps[idx] ? { overflow: 'hidden' } : {}}
                    itemProp="description"
                  >
                    <ul className={`list-none ${isCompact ? 'space-y-1' : 'space-y-1.5'} text-slate-600 ml-0`}>
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className={`${isCompact ? 'text-xs' : 'text-sm'} leading-relaxed flex items-center group`}
                        >
                          <span className={`text-slate-400 ${isCompact ? 'mr-1.5 print:mr-1' : 'mr-2 print:mr-1'} flex-shrink-0`}>•</span>
                          <RichEditableText
                            value={achievement}
                            onChange={(val) => handleSimpleAchievementChange(idx, i, val)}
                            multiline={true}
                            className="flex-1"
                            tag="span"
                          />
                          {isEditMode && (
                            <AddRemoveButtons
                              onAdd={() => {
                                const newExps = [...experiences]
                                newExps[idx].achievements.splice(i + 1, 0, '')
                                updateData('experiences', newExps)
                                setHasChanges(true)
                              }}
                              onRemove={() => removeAchievement(idx, null, i)}
                              showAdd={true}
                            />
                          )}
                        </li>
                      ))}
                      {isEditMode && (
                        <li className="flex items-center">
                          <button
                            onClick={() => addAchievement(idx)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-2 py-1 text-xs flex items-center gap-1 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                            Ajouter une ligne
                          </button>
                        </li>
                      )}
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
