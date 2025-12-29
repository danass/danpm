'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const EditContext = createContext()

export function EditProvider({ children }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Vérifier le paramètre URL ?edit=true
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const editParam = params.get('edit')
      setIsEditMode(editParam === 'true' || editParam === '1')
    }
  }, [])

  // Mettre à jour l'URL de manière asynchrone après le rendu
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const url = new URL(window.location.href)
    if (isEditMode) {
      url.searchParams.set('edit', 'true')
    } else {
      url.searchParams.delete('edit')
    }
    
    // Utiliser setTimeout pour éviter de modifier l'URL pendant le rendu
    const timeoutId = setTimeout(() => {
      window.history.replaceState({}, '', url)
    }, 0)
    
    return () => clearTimeout(timeoutId)
  }, [isEditMode])

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev)
  }, [])

  return (
    <EditContext.Provider value={{ isEditMode, toggleEditMode, hasChanges, setHasChanges }}>
      {children}
    </EditContext.Provider>
  )
}

export function useEdit() {
  const context = useContext(EditContext)
  if (!context) {
    throw new Error('useEdit must be used within an EditProvider')
  }
  return context
}

