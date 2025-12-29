'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CollapseContext = createContext()

export function CollapseProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    // Récupérer l'état depuis localStorage ou utiliser false par défaut
    const savedCollapse = localStorage.getItem('cv-collapsed')
    if (savedCollapse === 'true') {
      setIsCollapsed(true)
    }
    const savedCompact = localStorage.getItem('cv-compact')
    if (savedCompact === 'true') {
      setIsCompact(true)
    }
  }, [])

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const newValue = !prev
      localStorage.setItem('cv-collapsed', newValue.toString())
      return newValue
    })
  }

  const toggleCompact = () => {
    setIsCompact(prev => {
      const newValue = !prev
      localStorage.setItem('cv-compact', newValue.toString())
      return newValue
    })
  }

  return (
    <CollapseContext.Provider value={{ isCollapsed, toggleCollapse, isCompact, toggleCompact }}>
      {children}
    </CollapseContext.Provider>
  )
}

export function useCollapse() {
  const context = useContext(CollapseContext)
  if (!context) {
    throw new Error('useCollapse must be used within a CollapseProvider')
  }
  return context
}

