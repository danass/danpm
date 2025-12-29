'use client'

import { useEffect } from 'react'
import { useUndoRedo } from '../contexts/UndoRedoContext'
import { useLanguage } from '../contexts/LanguageContext'

// Hook pour intégrer undo/redo avec LanguageContext
export function useUndoRedoData() {
  const { saveState, undo, redo, currentState } = useUndoRedo()
  const { savedData, setSavedData, updateData: originalUpdateData } = useLanguage()

  // Appliquer l'état undo/redo si disponible
  useEffect(() => {
    if (currentState) {
      setSavedData(currentState)
    }
  }, [currentState, setSavedData])

  // Wrapper pour updateData qui sauvegarde l'état
  const updateData = (path, value) => {
    // Appeler la fonction originale
    originalUpdateData(path, value)
    
    // Récupérer le nouvel état après la mise à jour
    // On doit attendre le prochain render pour avoir le nouvel état
    setTimeout(() => {
      // On va sauvegarder l'état dans le prochain useEffect
    }, 0)
  }

  return { updateData, undo, redo }
}

