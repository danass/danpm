'use client'

import { Plus, Minus } from 'lucide-react'
import { useEdit } from '../contexts/EditContext'

export default function AddRemoveButtons({ onAdd, onRemove, showAdd = true, showRemove = true }) {
  const { isEditMode } = useEdit()

  if (!isEditMode) return null

  return (
    <div className="flex items-center gap-1 ml-2">
      {showAdd && (
        <button
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded p-1 transition-colors"
          title="Ajouter"
          aria-label="Ajouter"
        >
          <Plus className="h-3 w-3" />
        </button>
      )}
      {showRemove && (
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded p-1 transition-colors"
          title="Supprimer"
          aria-label="Supprimer"
        >
          <Minus className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

