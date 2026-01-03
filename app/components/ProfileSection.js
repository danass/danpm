'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useCollapse } from '../contexts/CollapseContext'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'
import RichEditableText from './RichEditableText'
import AIImproveButton from './AIImproveButton'

export default function ProfileSection() {
  const [expanded, setExpanded] = useState(true)
  const { t, updateData, isLoading } = useLanguage()
  const { isCompact } = useCollapse()
  const { isEditMode, setHasChanges } = useEdit()

  // Wait for data to load (but allow empty profile in edit mode)
  if (isLoading) {
    return null
  }

  // If no profile data and not in edit mode, don't render
  if (!t.profile?.title && !t.profile?.description && !isEditMode) {
    return null
  }

  const handleTitleChange = (newValue) => {
    updateData('profile.title', newValue)
    setHasChanges(true)
  }

  const handleDescriptionChange = (newValue) => {
    updateData('profile.description', newValue)
    setHasChanges(true)
  }

  return (
    <section itemScope itemType="https://schema.org/ProfilePage">
      <div className={`flex items-center gap-2 ${isCompact ? 'mb-3' : 'mb-6'} group`}>
        <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-medium text-slate-800 tracking-tight border-b border-slate-200 ${isCompact ? 'pb-2' : 'pb-3'} flex-1`}>
          <span
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpanded(!expanded)}
          >
            <EditableText
              value={t.profile?.title || 'Résumé Professionnel'}
              onChange={handleTitleChange}
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
        <div className={`text-slate-600 leading-relaxed ${isCompact ? 'text-sm' : 'text-lg'} font-light ${isCompact ? 'mb-2' : 'mb-4'}`} itemProp="description">
          {isEditMode ? (
            <div className="flex items-start gap-2">
              <RichEditableText
                value={t.profile?.description || ''}
                onChange={handleDescriptionChange}
                multiline={true}
                className="block flex-1"
                tag="div"
              />
              <AIImproveButton
                text={t.profile?.description || ''}
                onApply={handleDescriptionChange}
              />
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: t.profile?.description || '' }} />
          )}
        </div>
      </div>
    </section>
  )
}
