

'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useCollapse } from '../contexts/CollapseContext'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'
import AddRemoveButtons from './AddRemoveButtons'
import SkillChip from './SkillChip'
import { Plus } from 'lucide-react'

export default function Skills({ defaultCollapsed = false }) {
  const { t, skills, updateData, version } = useLanguage()
  const { isCompact } = useCollapse()
  const { isEditMode, setHasChanges } = useEdit()
  // Par défaut, toutes les compétences sont visibles (sauf si defaultCollapsed)
  const [expandedCategories, setExpandedCategories] = useState(
    Object.fromEntries(Array.from({ length: skills.length }, (_, i) => [i, !defaultCollapsed]))
  )

  useEffect(() => {
    setExpandedCategories(
      Object.fromEntries(Array.from({ length: skills.length }, (_, i) => [i, !defaultCollapsed]))
    )
  }, [defaultCollapsed, skills.length])

  useEffect(() => {
    if (version === 'short') {
      setExpandedCategories(
        Object.fromEntries(Array.from({ length: skills.length }, (_, i) => [i, true]))
      )
      setExpandedSection(true)
    }
  }, [version, skills.length])

  const skillCategories = skills

  const [expandedSection, setExpandedSection] = useState(true)

  // Quand on clique sur le titre "Compétences", tout se collapse/expand
  const handleSectionToggle = () => {
    const newExpanded = !expandedSection
    setExpandedSection(newExpanded)
    // Collapse/expand toutes les catégories en même temps
    setExpandedCategories(
      Object.fromEntries(Array.from({ length: skills.length }, (_, i) => [i, newExpanded]))
    )
  }

  return (
    <section itemScope itemType="https://schema.org/ItemList">
      <meta itemProp="name" content="Compétences professionnelles" />
      <div className={`flex items-center gap-2 ${isCompact ? 'mb-3' : 'mb-6'} group`}>
        <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-medium text-slate-800 tracking-tight border-b border-slate-200 ${isCompact ? 'pb-2' : 'pb-3'} flex-1`}>
          <span
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={handleSectionToggle}
          >
            <EditableText
              value={t.skills.title}
              onChange={(val) => {
                updateData('skills.title', val)
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
        style={!expandedSection ? { overflow: 'hidden' } : {}}
      >
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isCompact ? 'gap-4' : 'gap-8'}`}>
          {skillCategories.map((category, idx) => (
            <div key={idx} itemScope itemType="https://schema.org/ItemList" itemProp="itemListElement">
              <meta itemProp="name" content={category.category} />
              <div className={`flex items-center gap-2 ${isCompact ? 'mb-2' : 'mb-3'} group`}>
                <h3
                  className={`font-medium text-slate-900 ${isCompact ? 'text-xs' : 'text-sm'} tracking-wide uppercase cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent`}
                  onClick={() => setExpandedCategories(prev => ({ ...prev, [idx]: !prev[idx] }))}
                >
                  <EditableText
                    value={category.category}
                    onChange={(val) => {
                      const newSkills = [...skills]
                      newSkills[idx] = { ...newSkills[idx], category: val }
                      updateData('skills', newSkills)
                      setHasChanges(true)
                    }}
                    className="inline"
                  />
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
                {isEditMode && (
                  <AddRemoveButtons
                    onAdd={() => {
                      const newSkills = [...skills]
                      newSkills.splice(idx + 1, 0, { category: 'Nouvelle catégorie', skills: [] })
                      updateData('skills', newSkills)
                      setHasChanges(true)
                    }}
                    onRemove={() => {
                      const newSkills = skills.filter((_, i) => i !== idx)
                      updateData('skills', newSkills)
                      setHasChanges(true)
                    }}
                  />
                )}
              </div>
              <div
                className={`flex flex-wrap ${isCompact ? 'gap-1.5' : 'gap-2'} transition-all duration-300 ease-in-out ${expandedCategories[idx] ? 'opacity-100' : 'max-h-0 opacity-0'}`}
                style={!expandedCategories[idx] ? { overflow: 'hidden' } : {}}
              >
                {category.skills.map((skill, i) => {
                  // Convertir les strings en objets si nécessaire
                  const skillObj = typeof skill === 'string' ? { name: skill } : skill
                  return (
                    <SkillChip
                      key={i}
                      skill={skillObj}
                      onUpdate={(updatedSkill) => {
                        const newSkills = [...skills]
                        newSkills[idx].skills[i] = updatedSkill
                        updateData('skills', newSkills)
                        setHasChanges(true)
                      }}
                      onRemove={() => {
                        const newSkills = [...skills]
                        newSkills[idx].skills = newSkills[idx].skills.filter((_, j) => j !== i)
                        updateData('skills', newSkills)
                        setHasChanges(true)
                      }}
                      onAdd={() => {
                        const newSkills = [...skills]
                        newSkills[idx].skills.splice(i + 1, 0, { name: '' })
                        updateData('skills', newSkills)
                        setHasChanges(true)
                      }}
                      isCompact={isCompact}
                      idx={idx}
                      skillIdx={i}
                    />
                  )
                })}
                {isEditMode && (
                  <button
                    onClick={() => {
                      const newSkills = [...skills]
                      newSkills[idx].skills.push({ name: '' })
                      updateData('skills', newSkills)
                      setHasChanges(true)
                    }}
                    className={`text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded ${isCompact ? 'px-2 py-0.5 text-xs' : 'px-3 py-1.5 text-sm'} flex items-center gap-1 transition-colors`}
                  >
                    <Plus className="h-3 w-3" />
                    Ajouter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
