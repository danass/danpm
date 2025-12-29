'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const UndoRedoContext = createContext()

export function UndoRedoProvider({ children }) {
  const [history, setHistory] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [maxHistorySize] = useState(50)

  const saveState = useCallback((state) => {
    setHistory(prev => {
      // Supprimer tout ce qui est après l'index actuel (si on a fait undo puis une nouvelle action)
      const newHistory = prev.slice(0, currentIndex + 1)
      // Ajouter le nouvel état
      const updated = [...newHistory, JSON.parse(JSON.stringify(state))]
      // Limiter la taille de l'historique
      if (updated.length > maxHistorySize) {
        return updated.slice(-maxHistorySize)
      }
      return updated
    })
    setCurrentIndex(prev => {
      const newIndex = prev + 1
      // Limiter l'index si on dépasse la taille max
      return Math.min(newIndex, maxHistorySize - 1)
    })
  }, [currentIndex, maxHistorySize])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      return history[currentIndex - 1]
    }
    return null
  }, [currentIndex, history])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1)
      return history[currentIndex + 1]
    }
    return null
  }, [currentIndex, history])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  // Gérer les raccourcis clavier CTRL-Z et CTRL-Y
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) {
          undo()
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        if (canRedo) {
          redo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canUndo, canRedo, undo, redo])

  return (
    <UndoRedoContext.Provider value={{ 
      saveState, 
      undo, 
      redo, 
      canUndo, 
      canRedo,
      currentState: history[currentIndex] || null
    }}>
      {children}
    </UndoRedoContext.Provider>
  )
}

export function useUndoRedo() {
  const context = useContext(UndoRedoContext)
  if (!context) {
    throw new Error('useUndoRedo must be used within an UndoRedoProvider')
  }
  return context
}

