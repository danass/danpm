'use client'

import React from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
import { useAIReview } from '../contexts/AIReviewContext'

export default function AIImproveButton({ text, onApply, className = '' }) {
    const { startReview, isLoading, isOpen } = useAIReview()

    const handleClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        startReview(text, onApply)
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isLoading && !isOpen}
            className={`p-1 hover:bg-purple-100 rounded text-purple-600 hover:text-purple-800 transition-all disabled:opacity-50 print:hidden shrink-0 ${className}`}
            title="Review assistée par IA"
        >
            {isLoading && !isOpen ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
                <Sparkles className="h-3.5 w-3.5" />
            )}
        </button>
    )
}
