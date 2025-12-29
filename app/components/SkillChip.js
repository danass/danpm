'use client'

import { useState } from 'react'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'
import AddRemoveButtons from './AddRemoveButtons'
import { Link as LinkIcon, ExternalLink } from 'lucide-react'

export default function SkillChip({ 
  skill, 
  onUpdate, 
  onRemove, 
  onAdd,
  isCompact,
  idx,
  skillIdx
}) {
  const { isEditMode } = useEdit()
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState(skill.link || '')

  // Si skill est une string (ancien format), la convertir en objet
  const skillObj = typeof skill === 'string' ? { name: skill } : skill
  const skillName = skillObj.name || skill
  const skillLink = skillObj.link || ''

  const handleLinkClick = (e) => {
    // Ne pas ouvrir le lien si on est en mode édition
    if (isEditMode) {
      return
    }
    if (skillLink) {
      e.preventDefault()
      e.stopPropagation()
      const url = skillLink.startsWith('http://') || skillLink.startsWith('https://') 
        ? skillLink 
        : `https://${skillLink}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleSaveLink = () => {
    const updatedSkill = { ...skillObj, link: linkUrl.trim() || undefined }
    onUpdate(updatedSkill)
    setShowLinkModal(false)
  }

  return (
    <>
      <span 
        className={`inline-flex items-center gap-1 bg-slate-100 text-slate-700 ${isCompact ? 'px-2 py-0.5 text-xs' : 'px-3 py-1.5 text-sm'} rounded-md font-light print:bg-slate-100 print:text-slate-700 hover:bg-slate-200 transition-all duration-200 ${skillLink && !isEditMode ? 'cursor-pointer' : 'cursor-default'} group`}
        itemScope
        itemType="https://schema.org/ListItem"
        itemProp="itemListElement"
        onClick={handleLinkClick}
      >
        <meta itemProp="name" content={skillName} />
        {isEditMode ? (
          <>
            <EditableText 
              value={skillName} 
              onChange={(val) => {
                if (!val || val.trim() === '') {
                  onRemove()
                } else {
                  onUpdate({ ...skillObj, name: val })
                }
              }}
              className="inline"
            />
            {skillLink && (
              <ExternalLink className="h-3 w-3 text-blue-600" />
            )}
            <button
              onClick={() => setShowLinkModal(true)}
              className="p-0.5 hover:bg-slate-300 rounded"
              title="Ajouter/modifier le lien"
            >
              <LinkIcon className="h-3 w-3 text-slate-500" />
            </button>
            <AddRemoveButtons
              onAdd={onAdd}
              onRemove={onRemove}
              showAdd={true}
            />
          </>
        ) : (
          <>
            {skillName}
            {skillLink && (
              <ExternalLink className="h-3 w-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </>
        )}
      </span>

      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Lien pour "{skillName}"</h3>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com ou example.com"
              className="w-full border border-slate-300 rounded px-3 py-2 mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setLinkUrl('')
                  setShowLinkModal(false)
                }}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
              >
                Supprimer le lien
              </button>
              <button
                onClick={handleSaveLink}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Enregistrer
              </button>
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

