'use client'

import { useState, useEffect, useRef } from 'react'
import { useEdit } from '../contexts/EditContext'
import { Bold, Link as LinkIcon, ChevronDown, Sparkles } from 'lucide-react'
import AIImproveButton from './AIImproveButton'

export default function RichEditableText({
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
  const toolbarRef = useRef(null)
  const [showToolbar, setShowToolbar] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 })
  const [showFontDropdown, setShowFontDropdown] = useState(false)
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)
  const [currentFont, setCurrentFont] = useState('Roboto')
  const [currentSize, setCurrentSize] = useState('16')
  const [fontDropdownPosition, setFontDropdownPosition] = useState({ top: 0, left: 0 })
  const [sizeDropdownPosition, setSizeDropdownPosition] = useState({ top: 0, left: 0 })
  const fontDropdownRef = useRef(null)
  const sizeDropdownRef = useRef(null)

  const fonts = ['Roboto', 'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Palatino']
  const sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72']

  // Fonction pour décoder le HTML si nécessaire
  const decodeHTML = (html) => {
    if (!html) return ''
    // Si le HTML est encodé (contient &lt; au lieu de <), le décoder
    if (html.includes('&lt;') || html.includes('&gt;') || html.includes('&amp;')) {
      const txt = document.createElement('textarea')
      txt.innerHTML = html
      return txt.value
    }
    return html
  }

  useEffect(() => {
    // Ne mettre à jour que si on n'est pas en train d'éditer
    if (elementRef.current && !isEditing) {
      const currentHtml = elementRef.current.innerHTML || ''

      // If we have a real value, update the content
      if (value && value.trim() !== '') {
        const newValue = decodeHTML(value)
        if (currentHtml !== newValue) {
          elementRef.current.innerHTML = newValue
        }
      }
      // If no value but content exists from SSR, keep it (don't replace with placeholder)
      // Only set placeholder if element is truly empty
      else if (currentHtml.trim() === '' || currentHtml === placeholder) {
        elementRef.current.innerHTML = placeholder
      }
    }
  }, [value, isEditing, placeholder])

  // Initialiser le contenu quand on commence à éditer
  useEffect(() => {
    if (isEditing && elementRef.current) {
      const decodedValue = decodeHTML(value || placeholder)
      if (elementRef.current.innerHTML !== decodedValue) {
        elementRef.current.innerHTML = decodedValue
      }
    }
  }, [isEditing, value, placeholder])

  useEffect(() => {
    if (isEditing && elementRef.current) {
      elementRef.current.focus()
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(elementRef.current)
      range.collapse(false)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }, [isEditing])

  const getSelectedFontSize = () => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const container = range.commonAncestorContainer
      const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container

      if (element) {
        const computedStyle = window.getComputedStyle(element)
        const fontSize = computedStyle.fontSize
        // Extraire la valeur numérique (enlever 'px')
        const sizeValue = parseFloat(fontSize)
        if (!isNaN(sizeValue)) {
          return Math.round(sizeValue).toString()
        }
      }
    }
    return '16' // Valeur par défaut
  }

  const getSelectedFontFamily = () => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const container = range.commonAncestorContainer
      const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container

      if (element) {
        const computedStyle = window.getComputedStyle(element)
        const fontFamily = computedStyle.fontFamily
        // Extraire le premier nom de police (avant la virgule)
        const firstFont = fontFamily.split(',')[0].replace(/['"]/g, '').trim()
        // Vérifier si c'est une police de la liste
        const matchedFont = fonts.find(f => firstFont.toLowerCase().includes(f.toLowerCase()))
        return matchedFont || firstFont || 'Roboto'
      }
    }
    return 'Roboto' // Valeur par défaut
  }

  const updateToolbarPosition = () => {
    if (elementRef.current && toolbarRef.current) {
      const selection = window.getSelection()
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        const elementRect = elementRef.current.getBoundingClientRect()
        const toolbarRect = toolbarRef.current.getBoundingClientRect()

        // Mettre à jour les valeurs depuis la sélection
        setCurrentSize(getSelectedFontSize())
        setCurrentFont(getSelectedFontFamily())

        // Positionner la toolbar au-dessus de la sélection
        const top = rect.top - elementRect.top - toolbarRect.height - 8
        const left = rect.left - elementRect.left + (rect.width / 2) - (toolbarRect.width / 2)

        setToolbarPosition({ top, left })
      }
    }
  }

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true)
      setShowToolbar(true)
      setTimeout(updateToolbarPosition, 0)
    }
  }

  const handleSelectionChange = () => {
    if (isEditing) {
      // Mettre à jour les valeurs depuis la sélection
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        setCurrentSize(getSelectedFontSize())
        setCurrentFont(getSelectedFontFamily())
      }
      updateToolbarPosition()
    }
  }

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('selectionchange', handleSelectionChange)
      return () => {
        document.removeEventListener('selectionchange', handleSelectionChange)
      }
    }
  }, [isEditing])

  const handleBlur = (e) => {
    // Ne pas blur si on clique sur la toolbar
    if (toolbarRef.current && toolbarRef.current.contains(e.relatedTarget)) {
      return
    }
    if (elementRef.current) {
      // Récupérer le HTML brut depuis innerHTML (déjà décodé par le navigateur)
      const newValue = elementRef.current.innerHTML || ''
      // S'assurer que le HTML n'est pas encodé avant de sauvegarder
      onChange(newValue)
    }
    setIsEditing(false)
    setShowToolbar(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      elementRef.current?.blur()
    }
    if (e.key === 'Escape') {
      if (elementRef.current) {
        elementRef.current.innerHTML = value || placeholder
      }
      elementRef.current?.blur()
    }
    // Raccourcis clavier pour le formatage
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault()
      document.execCommand('bold', false, null)
    }
  }

  const handleFormatBold = (e) => {
    e.preventDefault()
    e.stopPropagation()
    document.execCommand('bold', false, null)
    elementRef.current?.focus()
    updateToolbarPosition()
  }

  const handleFormatLink = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const selection = window.getSelection()
    const selectedText = selection.toString()
    const url = prompt(selectedText ? `Lier "${selectedText}" à:` : 'Entrez l\'URL du lien:', '')
    if (url) {
      // Si du texte est sélectionné, créer un lien
      if (selectedText && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const link = document.createElement('a')
        link.href = url.startsWith('http') ? url : `https://${url}`
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        try {
          range.surroundContents(link)
        } catch (e) {
          // Si surroundContents échoue, insérer le lien
          link.textContent = selectedText
          range.deleteContents()
          range.insertNode(link)
        }
      } else {
        // Sinon, insérer un lien avec l'URL comme texte
        const link = document.createElement('a')
        link.href = url.startsWith('http') ? url : `https://${url}`
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.textContent = url
        const range = selection.getRangeAt(0)
        range.insertNode(link)
      }
      elementRef.current?.focus()
      updateToolbarPosition()
    }
  }

  const handleFontChange = (font) => {
    document.execCommand('fontName', false, font)
    setCurrentFont(font)
    setShowFontDropdown(false)
    elementRef.current?.focus()
  }

  const handleSizeChange = (size) => {
    document.execCommand('fontSize', false, '3') // Base size
    // Appliquer la taille via style
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const span = document.createElement('span')
      span.style.fontSize = `${size}px`
      try {
        range.surroundContents(span)
      } catch (e) {
        // Si surroundContents échoue, appliquer au conteneur
        if (elementRef.current) {
          elementRef.current.style.fontSize = `${size}px`
        }
      }
    }
    setCurrentSize(size)
    setShowSizeDropdown(false)
    elementRef.current?.focus()
  }

  // Fermer les dropdowns si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target)) {
        setShowFontDropdown(false)
      }
      if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target)) {
        setShowSizeDropdown(false)
      }
    }
    if (showFontDropdown || showSizeDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFontDropdown, showSizeDropdown])

  if (!isEditMode) {
    // En mode affichage, rendre le HTML (décodé si nécessaire)
    const displayValue = decodeHTML(value || placeholder)
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: displayValue }} />
  }

  return (
    <div className="relative inline-block w-full">
      {isEditing && showToolbar && (
        <div
          ref={toolbarRef}
          className="absolute z-50 bg-white border border-slate-300 rounded shadow-lg p-1.5 flex items-center gap-1.5 flex-wrap"
          style={{
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
            transform: 'translateX(-50%)',
            overflow: 'visible'
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {/* Font Family Dropdown - Mobile style */}
          <div className="relative" ref={fontDropdownRef} style={{ zIndex: 60 }}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (!showFontDropdown && fontDropdownRef.current && toolbarRef.current) {
                  const buttonRect = fontDropdownRef.current.getBoundingClientRect()
                  const toolbarRect = toolbarRef.current.getBoundingClientRect()
                  setFontDropdownPosition({
                    top: buttonRect.bottom + 4,
                    left: buttonRect.left
                  })
                }
                setShowFontDropdown(!showFontDropdown)
                setShowSizeDropdown(false)
              }}
              onMouseDown={(e) => e.preventDefault()}
              className="px-2 py-1.5 hover:bg-slate-100 rounded text-xs flex items-center gap-1 min-w-[90px] justify-between border border-slate-300"
              title="Police"
            >
              <span className="truncate">{currentFont}</span>
              <ChevronDown className="h-3 w-3 flex-shrink-0" />
            </button>
            {showFontDropdown && (
              <div
                className="fixed bg-white border border-slate-300 rounded shadow-lg max-h-48 overflow-y-auto min-w-[120px]"
                style={{
                  zIndex: 9999,
                  top: `${fontDropdownPosition.top}px`,
                  left: `${fontDropdownPosition.left}px`
                }}
              >
                {fonts.map((font) => (
                  <button
                    key={font}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleFontChange(font)
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs"
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Font Size Dropdown - Mobile style */}
          <div className="relative flex items-center gap-0.5" ref={sizeDropdownRef} style={{ zIndex: 60 }}>
            <input
              type="number"
              value={currentSize}
              onChange={(e) => setCurrentSize(e.target.value)}
              onBlur={() => {
                if (currentSize) handleSizeChange(currentSize)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (currentSize) handleSizeChange(currentSize)
                }
              }}
              className="w-10 px-1 py-1.5 text-xs border border-slate-300 rounded text-center"
              min="8"
              max="72"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (!showSizeDropdown && sizeDropdownRef.current) {
                  const buttonRect = sizeDropdownRef.current.getBoundingClientRect()
                  setSizeDropdownPosition({
                    top: buttonRect.bottom + 4,
                    left: buttonRect.left
                  })
                }
                setShowSizeDropdown(!showSizeDropdown)
                setShowFontDropdown(false)
              }}
              onMouseDown={(e) => e.preventDefault()}
              className="p-1 hover:bg-slate-100 rounded border border-slate-300"
              title="Taille de police"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
            {showSizeDropdown && (
              <div
                className="fixed bg-white border border-slate-300 rounded shadow-lg max-h-48 overflow-y-auto min-w-[60px]"
                style={{
                  zIndex: 9999,
                  top: `${sizeDropdownPosition.top}px`,
                  left: `${sizeDropdownPosition.left}px`
                }}
              >
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleSizeChange(size)
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-100 text-xs"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-5 bg-slate-300" />

          <button
            type="button"
            onClick={handleFormatBold}
            onMouseDown={(e) => e.preventDefault()}
            className="p-1.5 hover:bg-slate-100 rounded border border-slate-300"
            title="Gras (Ctrl+B)"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleFormatLink}
            onMouseDown={(e) => e.preventDefault()}
            className="p-1.5 hover:bg-slate-100 rounded border border-slate-300"
            title="Lien"
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </button>
          <div className="w-px h-5 bg-slate-300" />
          <AIImproveButton
            text={value}
            onApply={onChange}
            className="p-1.5 hover:bg-purple-100 rounded border border-purple-300"
          />
        </div>
      )}
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
          width: 'fit-content',
          minWidth: 'fit-content',
          ...(multiline ? {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          } : {
            display: 'inline-block'
          })
        }}
      >
        {/* Le contenu est géré par innerHTML dans useEffect */}
      </Tag>
    </div>
  )
}

