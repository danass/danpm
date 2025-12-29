'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useCollapse } from '../contexts/CollapseContext'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'
import { Plus, Minus } from 'lucide-react'

export default function Certifications() {
  const [expanded, setExpanded] = useState(true)
  const { t, certifications: certificationsData, updateData } = useLanguage()
  const { isCompact } = useCollapse()
  const { isEditMode, setHasChanges } = useEdit()
  const certifications = certificationsData.data

  const handleCertChange = (idx, field, newValue) => {
    const newCerts = [...certifications]
    newCerts[idx] = { ...newCerts[idx], [field]: newValue }
    updateData('certifications.data', newCerts)
    setHasChanges(true)
  }

  return (
    <section>
      <div className={`flex items-center gap-2 ${isCompact ? 'mb-3' : 'mb-6'} group`}>
        <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-medium text-slate-800 tracking-tight border-b border-slate-200 ${isCompact ? 'pb-2' : 'pb-3'} flex-1`}>
          <span 
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpanded(!expanded)}
          >
            <EditableText 
              value={t.certifications.title} 
              onChange={(val) => {
                updateData('certifications.title', val)
                setHasChanges(true)
              }}
              className="inline"
            />
            <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors print:hidden ml-2">
              {expanded ? '−' : '+'}
            </span>
          </span>
        </h2>
      </div>
      <div 
        className={`transition-all duration-300 ease-in-out ${expanded ? 'opacity-100' : 'max-h-0 opacity-0'}`}
        style={expanded ? {} : { overflow: 'hidden' }}
      >
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isCompact ? 'gap-3' : 'gap-4'}`}>
          {certifications.map((cert, idx) => (
            <div 
              key={idx} 
              className={`${isEditMode ? 'block' : 'flex items-start'} group`}
              itemScope 
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              <div className={isEditMode ? '' : 'flex-1'}>
                <EditableText 
                  value={cert.name} 
                  onChange={(val) => handleCertChange(idx, 'name', val)}
                  className={`${isCompact ? 'text-xs' : 'text-sm'} font-light text-slate-900 block`}
                  tag="p"
                />
                <EditableText 
                  value={cert.issuer} 
                  onChange={(val) => handleCertChange(idx, 'issuer', val)}
                  className={`${isCompact ? 'text-[10px]' : 'text-xs'} text-slate-500 font-light ${isCompact ? 'mt-0' : 'mt-0.5'} block`}
                  tag="p"
                />
              </div>
              {isEditMode && (
                <button
                  onClick={() => {
                    const newCerts = certifications.filter((_, i) => i !== idx)
                    updateData('certifications.data', newCerts)
                    setHasChanges(true)
                  }}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded p-1 transition-colors"
                  title="Supprimer"
                >
                  <Minus className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          {isEditMode && (
            <button
              onClick={() => {
                const newCerts = [...certifications, { name: '', issuer: '' }]
                updateData('certifications.data', newCerts)
                setHasChanges(true)
              }}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-3 py-2 text-sm flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Ajouter une certification
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
