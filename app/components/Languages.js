'use client'

import { useState, useMemo } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useCollapse } from '../contexts/CollapseContext'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'
import RichEditableText from './RichEditableText'
import AddRemoveButtons from './AddRemoveButtons'
import { Plus } from 'lucide-react'

export default function Languages() {
  const [expanded, setExpanded] = useState(true)
  const { t, languages: languagesData, updateData } = useLanguage()
  const { isCompact } = useCollapse()
  const { isEditMode, setHasChanges } = useEdit()

  // Convertir le texte en liste d'éléments
  const items = useMemo(() => {
    if (!languagesData?.text) return []
    return languagesData.text.split(' | ').filter(item => item.trim())
  }, [languagesData?.text])

  const handleItemChange = (idx, newValue) => {
    const newItems = [...items]
    if (!newValue || newValue.trim() === '') {
      newItems.splice(idx, 1)
    } else {
      newItems[idx] = newValue
    }
    updateData('languages.text', newItems.join(' | '))
    setHasChanges(true)
  }

  const handleAddItem = () => {
    const newItems = [...items, '']
    updateData('languages.text', newItems.join(' | '))
    setHasChanges(true)
  }

  if (items.length === 0 && !isEditMode) return null;

  return (
    <section>
      <div className={`flex items-center gap-2 ${isCompact ? 'mb-3' : 'mb-6'} group`}>
        <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-medium text-slate-800 tracking-tight border-b border-slate-200 ${isCompact ? 'pb-2' : 'pb-3'} flex-1`}>
          <span
            className="cursor-pointer hover:text-slate-700 hover:bg-slate-50 px-2 py-1 rounded transition-all print:cursor-default print:hover:bg-transparent inline-block"
            onClick={() => setExpanded(!expanded)}
          >
            <EditableText
              value={t.languages.title}
              onChange={(val) => {
                updateData('languages.title', val)
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
        <div className={`text-slate-600 ${isCompact ? 'text-xs' : 'text-sm'} font-light`}>
          {isEditMode ? (
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <RichEditableText
                    value={item}
                    onChange={(val) => handleItemChange(idx, val)}
                    multiline={false}
                    className="flex-1"
                    tag="span"
                  />
                  <AddRemoveButtons
                    onAdd={() => {
                      const newItems = [...items]
                      newItems.splice(idx + 1, 0, '')
                      updateData('languages.text', newItems.join(' | '))
                      setHasChanges(true)
                    }}
                    onRemove={() => {
                      const newItems = items.filter((_, i) => i !== idx)
                      updateData('languages.text', newItems.join(' | '))
                      setHasChanges(true)
                    }}
                    showAdd={true}
                  />
                </div>
              ))}
              <button
                onClick={handleAddItem}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-3 py-2 text-sm flex items-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {items.map((item, idx) => (
                <span key={idx} className="inline-block">
                  {idx > 0 && <span className="mx-1">|</span>}
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
