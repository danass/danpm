'use client'

import { useState, useEffect, useRef } from 'react'
import { useEdit } from '../contexts/EditContext'

export default function EditableTextArea({ 
  value, 
  onChange, 
  className = '', 
  placeholder = '...',
  preserveFormatting = false // Si true, préserve le formatage bold même en mode édition
}) {
  const { isEditMode } = useEdit()
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const textareaRef = useRef(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length)
    }
  }, [isEditing])

  const handleClick = () => {
    if (isEditMode) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (localValue !== value) {
      onChange(localValue)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setLocalValue(value)
      setIsEditing(false)
    }
  }

  if (!isEditMode) {
    // En mode non-édition, afficher avec le formatage
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: (value || '').replace(/(Ceinture bleue de Jujitsu brésilien|Blue belt in Brazilian Jiu-Jitsu)/g, '<strong class="font-medium text-slate-900">$1</strong>').replace(/\n/g, '<br>') }} 
      />
    )
  }

  if (isEditing) {
    return (
      <textarea
        ref={textareaRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} border-2 border-blue-500 rounded px-2 py-1 w-full min-h-[60px] resize-y whitespace-pre-wrap`}
        placeholder={placeholder}
        style={{ whiteSpace: 'pre-wrap' }}
      />
    )
  }

  return (
    <div 
      className={`${className} cursor-text hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded whitespace-pre-wrap`}
      onClick={handleClick}
      title="Cliquez pour éditer"
      style={{ 
        padding: '1px 2px',
        display: 'block',
        minWidth: 'fit-content'
      }}
    >
      {value || placeholder}
    </div>
  )
}

