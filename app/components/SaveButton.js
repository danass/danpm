'use client'

import { useState } from 'react'
import { useEdit } from '../contexts/EditContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Save, Check } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

export default function SaveButton() {
  const { isEditMode, hasChanges, setHasChanges } = useEdit()
  const { language, t, experiences, skills, education, certifications, languages, activities, savedData, loadSavedData } = useLanguage()
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  if (!isEditMode) return null

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Récupérer toutes les données actuelles depuis le contexte
      // Récupérer les valeurs actuelles depuis t (qui contient déjà les données fusionnées)
      const currentData = {
        header: {
          name: t.header?.name || 'Daniel Assayag',
          jobTitle: t.header.jobTitle,
          location: t.header.location,
          email: t.header?.email || 'dseyag@gmail.com',
          linkedin: t.header?.linkedin || 'linkedin.com/in/daniel-assayag',
          github: t.header?.github || 'github.com/danass'
        },
        profile: {
          title: t.profile.title,
          description: t.profile.description
        },
        experience: {
          title: t.experience.title
        },
        skills: {
          title: t.skills.title
        },
        education: education,
        certifications: certifications,
        languages: languages,
        activities: activities,
        experiences: experiences,
        skills: skills
      }

      // Préparer les données à sauvegarder - pour le moment, on ne garde que le français
      const dataToSave = {
        fr: currentData
        // Temporairement, on ne sauvegarde pas la version anglaise
        // en: savedData?.en || {}
      }

      const response = await fetch('/api/cv-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      })

      if (response.ok) {
        setIsSaved(true)
        setHasChanges(false)
        // Recharger les données depuis la base de données pour synchroniser
        loadSavedData()
        toast({
          title: "Sauvegardé",
          description: "Les modifications ont été enregistrées avec succès.",
        })
        setTimeout(() => setIsSaved(false), 2000)
      } else {
        throw new Error('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving:', error)
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={isSaving || !hasChanges}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isSaved
          ? 'bg-green-500 text-white hover:bg-green-600'
          : hasChanges
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
      title={hasChanges ? 'Sauvegarder les modifications' : 'Aucune modification'}
    >
      {isSaved ? (
        <>
          <Check className="h-4 w-4" />
          <span className="text-sm">Sauvegardé</span>
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          <span className="text-sm">{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
        </>
      )}
    </button>
  )
}

