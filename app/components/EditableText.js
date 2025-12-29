'use client'

import { useState, useEffect, useRef } from 'react'
import { useEdit } from '../contexts/EditContext'

export default function EditableText({ 
  value, 
  onChange, 
  className = '', 
  tag: Tag = 'span',
  multiline = false,
  placeholder = '...'
}) {
  const { isEditMode } = useEdit()
  const [isEditing, setIsEditing] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    // Mettre à jour le contenu si la valeur change de l'extérieur
    // Mais seulement si on n'est pas en train d'éditer
    if (elementRef.current && !isEditing) {
      const newValue = value || placeholder
      const currentText = elementRef.current.textContent || ''
      // Ne mettre à jour que si c'est vraiment différent
      if (currentText !== newValue) {
        elementRef.current.textContent = newValue
      }
    }
  }, [value, isEditing, placeholder])

  useEffect(() => {
    if (isEditing && elementRef.current) {
      // Focus et placer le curseur à la fin
      elementRef.current.focus()
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(elementRef.current)
      range.collapse(false)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }, [isEditing])

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    if (elementRef.current) {
      const newValue = elementRef.current.textContent || ''
      // Sauvegarder la valeur même si elle est vide
      onChange(newValue)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      elementRef.current?.blur()
    }
    if (e.key === 'Escape') {
      if (elementRef.current) {
        elementRef.current.textContent = value || placeholder
      }
      elementRef.current?.blur()
    }
  }

  if (!isEditMode) {
    return <Tag className={className}>{value || placeholder}</Tag>
  }

  return (
    <Tag 
      ref={elementRef}
      contentEditable={isEditing}
      suppressContentEditableWarning
      className={`${className} ${isEditMode ? 'cursor-text hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded' : ''} ${isEditing ? 'bg-blue-50 outline outline-2 outline-blue-300 rounded' : ''}`}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      title={isEditMode ? 'Cliquez pour éditer' : ''}
      style={{
        // Respecter les dimensions existantes
        width: 'fit-content',
        minWidth: 'fit-content',
        // Pour multiline, garder la hauteur naturelle
        ...(multiline ? { 
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        } : {
          display: 'inline-block'
        })
      }}
    >
      {value || placeholder}
    </Tag>
  )
}

