'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations, experienceData, skillsData } from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children, initialData = null }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    const savedLanguage = localStorage.getItem('cv-language')
    return (savedLanguage === 'fr' || savedLanguage === 'en') ? savedLanguage : 'fr'
  })
  // Version du CV : 'short' ou 'long'
  const [version, setVersion] = useState(() => {
    if (typeof window === 'undefined') return 'short'
    const savedVersion = localStorage.getItem('cv-version')
    return (savedVersion === 'short' || savedVersion === 'long') ? savedVersion : 'short'
  })

  // Utiliser initialData si disponible (chargé côté serveur), sinon null
  const [savedData, setSavedData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(!initialData) // Si on a initialData, on n'est pas en chargement

  useEffect(() => {
    // Si on n'a pas initialData, charger les données depuis la base de données SQLite
    if (!initialData) {
      loadSavedData()
    }
  }, [initialData])

  const loadSavedData = async () => {
    try {
      const response = await fetch('/api/cv-data', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        // Ne définir savedData que si on a vraiment des données (pas un objet vide)
        if (data && (data.fr || data.en)) {
          setSavedData(data)
        }
      }
    } catch (error) {
      console.error('Error loading saved data:', error)
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

  const toggleVersion = () => {
    const newVersion = version === 'short' ? 'long' : 'short'
    setVersion(newVersion)
    localStorage.setItem('cv-version', newVersion)
  }

  const updateData = (path, value) => {
    // Utiliser savedData comme base
    const baseData = savedData || { fr: {}, en: {} }
    const newData = JSON.parse(JSON.stringify(baseData)) // Deep clone
    if (!newData[language]) {
      newData[language] = {}
    }
    
    // Si on utilise le système de versions, on préfixe le chemin par la version actuelle
    // sauf si le chemin commence déjà par 'short.' ou 'long.'
    let actualPath = path
    if (newData[language].short && newData[language].long) {
       if (!path.startsWith('short.') && !path.startsWith('long.')) {
         actualPath = `${version}.${path}`
       }
    }

    let current = newData[language]
    const keys = actualPath.split('.')
    
    // Naviguer jusqu'au parent de la clé finale
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!current[key]) {
        current[key] = {}
      }
      current = current[key]
    }
    
    // Assigner la valeur à la clé finale
    const lastKey = keys[keys.length - 1]
    current[lastKey] = value
    
    setSavedData(newData)
  }

  // Utiliser les données sauvegardées si disponibles et non vides, sinon utiliser les données par défaut
  const getData = () => {
    const dataToUse = savedData

    if (dataToUse && dataToUse[language] && Object.keys(dataToUse[language]).length > 0) {
      let saved = dataToUse[language]
      
      // Si on a des versions distinctes dans les données sauvegardées
      if (saved.short && saved.long) {
        saved = saved[version]
      }
      
      const defaultT = translations[language]
      
      // Fusionner les traductions intelligemment
      const mergedT = { 
        ...defaultT,
        ...(saved.header && { 
          header: { 
            ...defaultT.header, 
            ...saved.header,
            name: saved.header.name || defaultT.header?.name || 'Daniel Assayag',
            email: saved.header.email || defaultT.header?.email || 'dan@danpm.com',
            linkedin: saved.header.linkedin || defaultT.header?.linkedin || 'linkedin.com/in/daniel-assayag',
            github: saved.header.github || defaultT.header?.github || 'github.com/danass',
          } 
        }),
        ...(saved.profile && { profile: { ...defaultT.profile, ...saved.profile } }),
        ...(saved.experience && { experience: { ...defaultT.experience, ...saved.experience } }),
        ...(saved.skills && { skills: { ...defaultT.skills, ...saved.skills } }),
        ...(saved.education && { education: saved.education }),
        ...(saved.certifications && { certifications: saved.certifications }),
        ...(saved.languages && { languages: saved.languages }),
        ...(saved.activities && { activities: saved.activities }),
      }

      return {
        t: mergedT,
        experiences: (saved.experiences && saved.experiences.length > 0) ? saved.experiences : experienceData[language],
        skills: (saved.skills && saved.skills.length > 0) ? saved.skills : skillsData[language],
        education: saved.education || defaultT.education,
        certifications: saved.certifications || defaultT.certifications,
        languages: saved.languages || defaultT.languages,
        activities: saved.activities || defaultT.activities,
      }
    }

    // Fallback aux données par défaut (translations.js)
    // Ici on pourrait aussi gérer short/long dans translations.js
    return {
      t: translations[language],
      experiences: experienceData[language],
      skills: skillsData[language],
      education: translations[language].education,
      certifications: translations[language].certifications,
      languages: translations[language].languages,
      activities: translations[language].activities,
    }
  }

  const data = getData()

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage, 
      version,
      toggleVersion,
      t: data.t, 
      experiences: data.experiences, 
      skills: data.skills, 
      education: data.education, 
      certifications: data.certifications, 
      languages: data.languages, 
      activities: data.activities,
      updateData,
      savedData,
      setSavedData,
      loadSavedData
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





