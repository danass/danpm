'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CollapseContext = createContext()

export function CollapseProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // Récupérer l'état depuis localStorage ou utiliser false par défaut
    const savedCollapse = localStorage.getItem('cv-collapsed')
    if (savedCollapse === 'true') {
      setIsCollapsed(true)
    }
  }, [])

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const newValue = !prev
      localStorage.setItem('cv-collapsed', newValue.toString())
      return newValue
    })
  }

  return (
    <CollapseContext.Provider value={{ isCollapsed, toggleCollapse }}>
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

