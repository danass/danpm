'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations, experienceData, skillsData } from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr')

  useEffect(() => {
    // Récupérer la langue depuis localStorage ou utiliser 'fr' par défaut
    const savedLanguage = localStorage.getItem('cv-language')
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang) => {
    if (lang === 'fr' || lang === 'en') {
      setLanguage(lang)
      localStorage.setItem('cv-language', lang)
    }
  }

  const t = translations[language]
  const experiences = experienceData[language]
  const skills = skillsData[language]

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, experiences, skills, education: t.education, certifications: t.certifications, languages: t.languages, activities: t.activities }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

