'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useCollapse } from '../contexts/CollapseContext'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'
import AddRemoveButtons from './AddRemoveButtons'
import { Plus } from 'lucide-react'

export default function Education() {
  const [expandedAdditional, setExpandedAdditional] = useState(false)
  const { t, education: educationData, updateData } = useLanguage()
  const { isCompact } = useCollapse()
  const { isEditMode, setHasChanges } = useEdit()
  
  const education = educationData.data
  const additionalEducation = educationData.additional


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
              value={t.education.title} 
              onChange={(val) => {
                updateData('education.title', val)
                setHasChanges(true)
              }}
              className="inline"
            />
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
        className={`transition-all duration-300 ease-in-out ${expandedSection ? 'opacity-100' : 'max-h-0 opacity-0'}`}
        style={!expandedSection ? { overflow: 'hidden' } : {}}
      >
        <div className={isCompact ? 'space-y-3' : 'space-y-5'}>
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
              <div className="flex justify-between items-start group">
                <div className="flex-1">
                  <h3 className={`${isCompact ? 'text-base' : 'text-lg'} font-light text-slate-900 ${isCompact ? 'mb-0.5' : 'mb-1'}`} itemProp="name">
                    <EditableText 
                      value={edu.degree} 
                      onChange={(val) => {
                        const newEdu = [...education]
                        newEdu[idx] = { ...newEdu[idx], degree: val }
                        updateData('education.data', newEdu)
                        setHasChanges(true)
                      }}
                      className="inline"
                    />
                  </h3>
                  <p className={`text-slate-600 ${isCompact ? 'text-sm' : ''} font-light`}>
                    <span itemProp="provider" itemScope itemType="https://schema.org/EducationalOrganization">
                      <EditableText 
                        value={edu.institution} 
                        onChange={(val) => {
                          const newEdu = [...education]
                          newEdu[idx] = { ...newEdu[idx], institution: val }
                          updateData('education.data', newEdu)
                          setHasChanges(true)
                        }}
                        className="inline"
                      />
                    </span>
                  </p>
                  {(edu.details !== undefined && edu.details !== null && edu.details !== '') ? (
                    <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-slate-500 ${isCompact ? 'mt-0.5' : 'mt-1'} font-light italic`} itemProp="description">
                      <EditableText 
                        value={edu.details} 
                        onChange={(val) => {
                          const newEdu = [...education]
                          if (val.trim() === '') {
                            delete newEdu[idx].details
                          } else {
                            newEdu[idx] = { ...newEdu[idx], details: val }
                          }
                          updateData('education.data', newEdu)
                          setHasChanges(true)
                        }}
                        className="inline"
                      />
                    </p>
                  ) : isEditMode ? (
                    <button
                      onClick={() => {
                        const newEdu = [...education]
                        newEdu[idx] = { ...newEdu[idx], details: '' }
                        updateData('education.data', newEdu)
                        setHasChanges(true)
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                    >
                      + Ajouter des détails
                    </button>
                  ) : null}
                </div>
                <div className="flex items-start gap-2">
                  <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-slate-500 font-light`}>
                    <EditableText 
                      value={edu.period} 
                      onChange={(val) => {
                        const newEdu = [...education]
                        newEdu[idx] = { ...newEdu[idx], period: val }
                        updateData('education.data', newEdu)
                        setHasChanges(true)
                      }}
                      className="inline"
                    />
                  </p>
                  {isEditMode && (
                    <AddRemoveButtons
                      onAdd={() => {
                        const newEdu = [...education]
                        newEdu.splice(idx + 1, 0, { degree: '', institution: '', period: '', details: '' })
                        updateData('education.data', newEdu)
                        setHasChanges(true)
                      }}
                      onRemove={() => {
                        const newEdu = education.filter((_, i) => i !== idx)
                        updateData('education.data', newEdu)
                        setHasChanges(true)
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isEditMode && (
          <button
            onClick={() => {
              const newEdu = [...education, { degree: '', institution: '', period: '', details: '' }]
              updateData('education.data', newEdu)
              setHasChanges(true)
            }}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-3 py-2 text-sm flex items-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Ajouter une formation
          </button>
        )}
        </div>
        <div 
          className={`transition-all duration-300 ease-in-out ${expandedAdditional ? 'opacity-100' : 'max-h-0 opacity-0'}`}
          style={!expandedAdditional ? { overflow: 'hidden' } : {}}
        >
          <div className={isCompact ? 'space-y-3' : 'space-y-5'}>
            {additionalEducation.map((edu, idx) => {
              return (
                <div 
                  key={idx}
                  itemScope 
                  itemType="https://schema.org/Course"
                >
                  <div className="flex justify-between items-start group">
                    <div className="flex-1">
                      <h3 className={`${isCompact ? 'text-base' : 'text-lg'} font-light text-slate-900 ${isCompact ? 'mb-0.5' : 'mb-1'}`} itemProp="name">
                        <EditableText 
                          value={edu.degree} 
                          onChange={(val) => {
                            const newEdu = [...additionalEducation]
                            newEdu[idx] = { ...newEdu[idx], degree: val }
                            updateData('education.additional', newEdu)
                            setHasChanges(true)
                          }}
                          className="inline"
                        />
                      </h3>
                      <p className={`text-slate-600 ${isCompact ? 'text-sm' : ''} font-light`}>
                        <span itemProp="provider" itemScope itemType="https://schema.org/EducationalOrganization">
                          <EditableText 
                            value={edu.institution} 
                            onChange={(val) => {
                              const newEdu = [...additionalEducation]
                              newEdu[idx] = { ...newEdu[idx], institution: val }
                              updateData('education.additional', newEdu)
                              setHasChanges(true)
                            }}
                            className="inline"
                          />
                        </span>
                      </p>
                      {(edu.details !== undefined && edu.details !== null && edu.details !== '') ? (
                        <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-slate-500 ${isCompact ? 'mt-0.5' : 'mt-1'} font-light italic`} itemProp="description">
                          <EditableText 
                            value={edu.details} 
                            onChange={(val) => {
                              const newEdu = [...additionalEducation]
                              if (val.trim() === '') {
                                delete newEdu[idx].details
                              } else {
                                newEdu[idx] = { ...newEdu[idx], details: val }
                              }
                              updateData('education.additional', newEdu)
                              setHasChanges(true)
                            }}
                            className="inline"
                          />
                        </p>
                      ) : isEditMode ? (
                        <button
                          onClick={() => {
                            const newEdu = [...additionalEducation]
                            newEdu[idx] = { ...newEdu[idx], details: '' }
                            updateData('education.additional', newEdu)
                            setHasChanges(true)
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                        >
                          + Ajouter des détails
                        </button>
                      ) : null}
                    </div>
                    <div className="flex items-start gap-2">
                      <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-slate-500 font-light`}>
                        <EditableText 
                          value={edu.period} 
                          onChange={(val) => {
                            const newEdu = [...additionalEducation]
                            newEdu[idx] = { ...newEdu[idx], period: val }
                            updateData('education.additional', newEdu)
                            setHasChanges(true)
                          }}
                          className="inline"
                        />
                      </p>
                      {isEditMode && (
                        <AddRemoveButtons
                          onAdd={() => {
                            const newEdu = [...additionalEducation]
                            newEdu.splice(idx + 1, 0, { degree: '', institution: '', period: '', details: '' })
                            updateData('education.additional', newEdu)
                            setHasChanges(true)
                          }}
                          onRemove={() => {
                            const newEdu = additionalEducation.filter((_, i) => i !== idx)
                            updateData('education.additional', newEdu)
                            setHasChanges(true)
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {isEditMode && (
              <button
                onClick={() => {
                  const newEdu = [...additionalEducation, { degree: '', institution: '', period: '', details: '' }]
                  updateData('education.additional', newEdu)
                  setHasChanges(true)
                }}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-3 py-2 text-sm flex items-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Ajouter une formation complémentaire
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
