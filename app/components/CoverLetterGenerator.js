'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { FileText, Send, Loader2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'

export default function CoverLetterGenerator() {
    const [isLocalhost, setIsLocalhost] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [jobOffer, setJobOffer] = useState('')
    const [questions, setQuestions] = useState('')
    const [answers, setAnswers] = useState('')
    const [coverLetter, setCoverLetter] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [copied, setCopied] = useState(false)
    const [step, setStep] = useState(1) // 1: paste offer, 2: answer questions, 3: view letter
    const { language } = useLanguage()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname
            setIsLocalhost(hostname === 'localhost' || hostname === '127.0.0.1')
        }
    }, [])

    const analyzeJobOffer = async () => {
        if (!jobOffer.trim()) return

        setIsAnalyzing(true)
        try {
            const response = await fetch('/api/cover-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'analyze',
                    jobOffer,
                    language
                })
            })

            const data = await response.json()
            if (data.content) {
                setQuestions(data.content)
                setStep(2)
            }
        } catch (error) {
            console.error('Analysis error:', error)
        }
        setIsAnalyzing(false)
    }

    const generateCoverLetter = async () => {
        if (!answers.trim()) return

        setIsGenerating(true)
        try {
            const response = await fetch('/api/cover-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'generate',
                    jobOffer,
                    answers,
                    language
                })
            })

            const data = await response.json()
            if (data.content) {
                setCoverLetter(data.content)
                setStep(3)
            }
        } catch (error) {
            console.error('Generation error:', error)
        }
        setIsGenerating(false)
    }

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(coverLetter)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const reset = () => {
        setJobOffer('')
        setQuestions('')
        setAnswers('')
        setCoverLetter('')
        setStep(1)
    }

    if (!isLocalhost) return null

    return (
        <section className="mt-8 print:hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 hover:border-purple-300 transition-all"
            >
                <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">
                        {language === 'fr' ? 'Générateur de Lettre de Motivation' : 'Cover Letter Generator'}
                    </span>
                    <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">
                        localhost only
                    </span>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-purple-600" /> : <ChevronDown className="h-5 w-5 text-purple-600" />}
            </button>

            {isExpanded && (
                <div className="mt-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                    {/* Progress indicator */}
                    <div className="flex items-center gap-2 mb-6">
                        {[1, 2, 3].map(s => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-500'
                                    }`}>
                                    {s}
                                </div>
                                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-purple-600' : 'bg-slate-200'}`} />}
                            </div>
                        ))}
                        <span className="ml-4 text-sm text-slate-600">
                            {step === 1 && (language === 'fr' ? "Coller l'offre" : 'Paste offer')}
                            {step === 2 && (language === 'fr' ? 'Répondre aux questions' : 'Answer questions')}
                            {step === 3 && (language === 'fr' ? 'Lettre générée' : 'Letter generated')}
                        </span>
                    </div>

                    {/* Step 1: Paste job offer */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-slate-700">
                                {language === 'fr' ? "Collez l'offre d'emploi ici" : 'Paste the job offer here'}
                            </label>
                            <textarea
                                value={jobOffer}
                                onChange={(e) => setJobOffer(e.target.value)}
                                placeholder={language === 'fr'
                                    ? "Copiez-collez le texte complet de l'offre d'emploi..."
                                    : "Copy-paste the full job offer text..."}
                                className="w-full h-48 p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                                onClick={analyzeJobOffer}
                                disabled={!jobOffer.trim() || isAnalyzing}
                                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        {language === 'fr' ? 'Analyse en cours...' : 'Analyzing...'}
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        {language === 'fr' ? "Analyser l'offre" : 'Analyze offer'}
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Step 2: Answer questions */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <h4 className="font-medium text-purple-900 mb-2">
                                    {language === 'fr' ? 'Questions pour personnaliser votre lettre' : 'Questions to personalize your letter'}
                                </h4>
                                <div className="text-slate-700 whitespace-pre-wrap">{questions}</div>
                            </div>

                            <label className="block text-sm font-medium text-slate-700">
                                {language === 'fr' ? 'Vos réponses' : 'Your answers'}
                            </label>
                            <textarea
                                value={answers}
                                onChange={(e) => setAnswers(e.target.value)}
                                placeholder={language === 'fr'
                                    ? "Répondez aux questions ci-dessus. Vous pouvez numéroter vos réponses ou écrire librement..."
                                    : "Answer the questions above. You can number your answers or write freely..."}
                                className="w-full h-48 p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    ← {language === 'fr' ? 'Retour' : 'Back'}
                                </button>
                                <button
                                    onClick={generateCoverLetter}
                                    disabled={!answers.trim() || isGenerating}
                                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            {language === 'fr' ? 'Génération...' : 'Generating...'}
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="h-4 w-4" />
                                            {language === 'fr' ? 'Générer la lettre' : 'Generate letter'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: View generated letter */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-slate-900">
                                    {language === 'fr' ? 'Votre lettre de motivation' : 'Your cover letter'}
                                </h4>
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4 text-green-600" />
                                            {language === 'fr' ? 'Copié !' : 'Copied!'}
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            {language === 'fr' ? 'Copier' : 'Copy'}
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 whitespace-pre-wrap text-slate-800 leading-relaxed">
                                {coverLetter}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    ← {language === 'fr' ? 'Modifier les réponses' : 'Edit answers'}
                                </button>
                                <button
                                    onClick={reset}
                                    className="px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors"
                                >
                                    {language === 'fr' ? 'Nouvelle lettre' : 'New letter'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}
