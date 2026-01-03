'use client'

import { useState } from 'react'
import { useEdit } from '../contexts/EditContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Save, Check } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

export default function SaveButton() {
  const { isEditMode, hasChanges, setHasChanges } = useEdit()
  const { saveData, language, t, experiences, skills, education, certifications, languages, activities, cvData } = useLanguage()
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  if (!isEditMode) return null

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const result = await saveData()

      if (result.success) {
        setIsSaved(true)
        setHasChanges(false)
        toast({
          title: "Sauvegardé",
          description: "Les modifications ont été enregistrées dans cv-data.json.",
        })
        setTimeout(() => setIsSaved(false), 2000)
      } else {
        throw new Error(result.error || 'Erreur lors de la sauvegarde')
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
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSaved
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
