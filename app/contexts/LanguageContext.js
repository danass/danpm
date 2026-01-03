'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children, initialData }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    const savedLanguage = localStorage.getItem('cv-language')
    return (savedLanguage === 'fr' || savedLanguage === 'en') ? savedLanguage : 'fr'
  })

  // Use initialData from SSR - no async loading needed!
  const [cvData, setCvData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(!initialData)

  // Only load data if not provided by SSR (fallback)
  useEffect(() => {
    if (!initialData) {
      loadData()
    }
  }, [initialData])

  const loadData = async () => {
    try {
      const response = await fetch('/api/cv-data', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        setCvData(data)
      }
    } catch (error) {
      console.error('Error loading CV data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const changeLanguage = (lang) => {
    if (lang === 'fr' || lang === 'en') {
      setLanguage(lang)
      localStorage.setItem('cv-language', lang)
    }
  }

  // Update data in memory
  const updateData = (path, value) => {
    if (!cvData) return

    const newData = JSON.parse(JSON.stringify(cvData))
    if (!newData[language]) {
      newData[language] = {}
    }

    let current = newData[language]
    const keys = path.split('.')

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!current[key]) {
        current[key] = {}
      }
      current = current[key]
    }

    const lastKey = keys[keys.length - 1]
    current[lastKey] = value

    setCvData(newData)
  }

  // Save all data to JSON file
  const saveData = async () => {
    if (!cvData) return { success: false, error: 'No data to save' }

    try {
      const response = await fetch('/api/cv-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cvData)
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error saving data:', error)
      return { success: false, error: error.message }
    }
  }

  // UI labels from translations.js
  const uiLabels = translations[language] || translations.fr

  // Get current language data from cv-data.json ONLY
  const getData = () => {
    // Show loading state until data is loaded
    if (!cvData || !cvData[language]) {
      return {
        t: {
          header: {},
          profile: {},
          experience: uiLabels.experience || {},
          skills: {},
          education: {},
          certifications: {},
          languages: {},
          activities: {},
          aboutCV: uiLabels.aboutCV || {},
          sections: uiLabels.sections || {}
        },
        experiences: [],
        skills: [],
        education: {},
        certifications: {},
        languages: {},
        activities: {}
      }
    }

    const langData = cvData[language]

    // All content from cv-data.json, UI labels from translations.js
    const t = {
      header: langData.header || {},
      profile: langData.profile || {},
      experience: {
        title: langData.experience?.title || uiLabels.sections?.experience || 'Expérience',
        ...uiLabels.experience
      },
      skills: {
        title: uiLabels.sections?.skills || 'Compétences'
      },
      education: langData.education || {},
      certifications: langData.certifications || {},
      languages: langData.languages || {},
      activities: langData.activities || {},
      aboutCV: uiLabels.aboutCV || {},
      sections: uiLabels.sections || {}
    }

    return {
      t,
      experiences: langData.experiences || [],
      skills: Array.isArray(langData.skills) ? langData.skills : [],
      education: langData.education || {},
      certifications: langData.certifications || {},
      languages: langData.languages || {},
      activities: langData.activities || {}
    }
  }

  const data = getData()

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      updateData,
      saveData,
      isLoading,
      cvData,
      ...data
    }}>
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
