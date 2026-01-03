'use client'

import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Sparkles, X, Send, RefreshCw, Settings, Save, Paperclip, FileText, Trash2 } from 'lucide-react'

const AIReviewContext = createContext()

export function AIReviewProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [prompts, setPrompts] = useState(null)
    const [targetText, setTargetText] = useState('')
    const [onApplyCallback, setOnApplyCallback] = useState(null)
    const [mounted, setMounted] = useState(false)

    // File upload state
    const [attachedFile, setAttachedFile] = useState(null)
    const [fileContent, setFileContent] = useState('')

    const inputRef = useRef(null)
    const fileInputRef = useRef(null)
    const messagesEndRef = useRef(null)
    const messagesContainerRef = useRef(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isSettingsOpen && !prompts) {
            fetch('/api/ai-settings')
                .then(res => res.json())
                .then(data => setPrompts(data.prompts))
        }
    }, [isSettingsOpen, prompts])

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [messages, isOpen])

    useEffect(() => {
        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
            const originalOverflow = document.body.style.overflow
            const originalPadding = document.body.style.paddingRight

            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${scrollBarWidth}px`

            return () => {
                document.body.style.overflow = originalOverflow
                document.body.style.paddingRight = originalPadding
            }
        }
    }, [isOpen])

    const startReview = async (text, onApply) => {
        if (!text || text.trim() === '') return

        setTargetText(text)
        setOnApplyCallback(() => onApply)
        setIsOpen(true)
        setIsLoading(true)
        setMessages([
            { role: 'system', content: `Texte à améliorer:\n"${text}"` }
        ])

        try {
            const response = await fetch('/api/ai-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, type: 'clarify' })
            })

            if (!response.ok) throw new Error('API error')

            const data = await response.json()
            setMessages(prev => [...prev, { role: 'assistant', content: data.suggestion }])
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Erreur lors de la connexion à l\'IA.' }])
        } finally {
            setIsLoading(false)
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 2 * 1024 * 1024) {
            alert('Le fichier est trop volumineux (max 2 Mo)')
            return
        }

        const validTypes = ['text/plain', 'text/markdown', 'application/json']
        const extension = file.name.split('.').pop().toLowerCase()

        if (!validTypes.includes(file.type) && !['txt', 'md', 'json'].includes(extension)) {
            alert('Format de fichier non supporté (utilisez .txt, .md ou .json)')
            return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
            setAttachedFile(file)
            setFileContent(event.target.result)
        }
        reader.readAsText(file)
    }

    const removeFile = () => {
        setAttachedFile(null)
        setFileContent('')
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const sendMessage = async (e) => {
        e?.preventDefault()
        if ((!inputValue.trim() && !attachedFile) || isLoading) return

        const userMessage = inputValue.trim()
        setInputValue('')

        // Show file in UI if attached
        let displayMessage = userMessage
        if (attachedFile) {
            displayMessage = `📎 [Fichier: ${attachedFile.name}]\n\n${userMessage}`
        }

        setMessages(prev => [...prev, { role: 'user', content: displayMessage }])
        setIsLoading(true)

        try {
            const contextStr = messages.map(m => `${m.role === 'user' ? 'Utilisateur' : 'IA'}: ${m.content}`).join('\n')

            const response = await fetch('/api/ai-review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: `Contexte de la conversation:\n${contextStr}\n\nRéponse de l'utilisateur: ${userMessage}\n\nTexte original à améliorer: "${targetText}"\n\nBasé sur cette réponse, soit pose une question de suivi, soit propose une réécriture améliorée du texte.`,
                    type: 'improve',
                    fileContent: fileContent || undefined,
                    fileName: attachedFile?.name || undefined
                })
            })

            if (!response.ok) throw new Error('API error')

            const data = await response.json()
            setMessages(prev => [...prev, { role: 'assistant', content: data.suggestion }])

            // Clear file after sending
            removeFile()
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Erreur lors de la réponse.' }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSaveSettings = async () => {
        setIsLoading(true)
        try {
            await fetch('/api/ai-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompts })
            })
            setIsSettingsOpen(false)
        } catch (err) {
            console.error('Failed to save settings')
        } finally {
            setIsLoading(false)
        }
    }

    const handleApply = () => {
        const lastAssistantMsg = [...messages].reverse().find(m => m.role === 'assistant')
        if (lastAssistantMsg && onApplyCallback) {
            const match = lastAssistantMsg.content.match(/Version améliorée[:\s]*[""]?([^""]+)[""]?/i) ||
                lastAssistantMsg.content.match(/"([^"]+)"/)
            if (match) {
                onApplyCallback(match[1])
            }
        }
        closeModal()
    }

    const closeModal = (e) => {
        e?.stopPropagation()
        setIsOpen(false)
        setIsSettingsOpen(false)
        setMessages([])
        setInputValue('')
        removeFile()
    }

    const modalMarkup = isOpen && mounted && createPortal(
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-0 md:p-4"
            style={{ zIndex: 100000 }}
            onClick={closeModal}
        >
            <div
                className="bg-white rounded-none md:rounded-2xl shadow-2xl w-full max-w-2xl h-full md:h-auto md:max-h-[90vh] flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b bg-slate-50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Sparkles className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-slate-900 leading-none">Assistant de Rédaction IA</h3>
                            <p className="text-xs text-slate-500 mt-1">Mistral AI • Mode Conversation</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className={`p-2.5 rounded-xl transition-all ${isSettingsOpen ? 'bg-purple-100 text-purple-600 shadow-inner' : 'hover:bg-slate-200 text-slate-500'}`}
                            title="Configuration des prompts"
                        >
                            <Settings className="h-5 w-5" />
                        </button>
                        <button
                            onClick={closeModal}
                            className="p-2.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {isSettingsOpen ? (
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 text-sm text-amber-800">
                            <Settings className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p>Ces instructions modifient le comportement global de l'IA.</p>
                        </div>
                        {prompts ? (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest pl-1">Prompt de clarification</label>
                                    <textarea
                                        value={prompts.clarify}
                                        onChange={e => setPrompts({ ...prompts, clarify: e.target.value })}
                                        className="w-full h-40 text-sm p-4 border-2 border-slate-100 rounded-2xl focus:border-purple-500 outline-none font-mono bg-slate-50 focus:bg-white transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest pl-1">Prompt d'amélioration</label>
                                    <textarea
                                        value={prompts.improve}
                                        onChange={e => setPrompts({ ...prompts, improve: e.target.value })}
                                        className="w-full h-40 text-sm p-4 border-2 border-slate-100 rounded-2xl focus:border-purple-500 outline-none font-mono bg-slate-50 focus:bg-white transition-colors"
                                    />
                                </div>
                                <button
                                    onClick={handleSaveSettings}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-50"
                                >
                                    <Save className="h-5 w-5" /> Enregistrer la configuration
                                </button>
                            </div>
                        ) : (
                            <div className="flex py-20 justify-center"><RefreshCw className="h-8 w-8 animate-spin text-slate-200" /></div>
                        )}
                    </div>
                ) : (
                    <>
                        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[90%] md:max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' :
                                            msg.role === 'system' ? 'bg-slate-50 text-slate-400 text-[11px] font-mono border border-slate-100 rounded-none w-full text-center' :
                                                'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-100'
                                        }`}>
                                        <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-3 text-slate-400 text-sm font-medium animate-pulse">
                                    <div className="flex gap-1">
                                        {[0, 0.2, 0.4].map(d => <span key={d} className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }}></span>)}
                                    </div>
                                    Analyse en cours...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-6 border-t bg-white flex-shrink-0 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
                            {attachedFile && (
                                <div className="mb-4 flex items-center gap-2 p-2 bg-purple-50 border border-purple-100 rounded-xl w-fit animate-in fade-in slide-in-from-bottom-2">
                                    <FileText className="h-4 w-4 text-purple-600" />
                                    <span className="text-xs font-medium text-purple-700 truncate max-w-[200px]">{attachedFile.name}</span>
                                    <button
                                        onClick={removeFile}
                                        className="p-1 hover:bg-purple-200 rounded-full text-purple-400 hover:text-purple-600 transition-all"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                            <form onSubmit={sendMessage} className="flex gap-3">
                                <div className="relative flex-1 group">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Posez une question ou donnez du contexte..."
                                        className="w-full pl-5 pr-12 py-4 border-2 border-slate-100 rounded-2xl text-base focus:border-purple-500 outline-none transition-all placeholder:text-slate-300"
                                        disabled={isLoading}
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept=".txt,.md,.json"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isLoading}
                                            className="p-2.5 hover:bg-slate-100 text-slate-400 hover:text-purple-600 rounded-xl transition-all"
                                            title="Joindre un fichier (.txt, .md, .json)"
                                        >
                                            <Paperclip className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading || (!inputValue.trim() && !attachedFile)} className="px-6 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 disabled:opacity-30 transition-all active:scale-95 flex items-center justify-center shadow-xl shadow-purple-100">
                                    <Send className="h-6 w-6" />
                                </button>
                            </form>
                            <div className="flex items-center justify-between mt-6">
                                <button type="button" onClick={closeModal} className="text-sm font-medium text-slate-400 hover:text-slate-600 px-2 py-1 transition-colors">Annuler</button>
                                <button type="button" onClick={handleApply} className="flex items-center gap-2 px-6 py-2.5 bg-purple-50 text-purple-700 rounded-xl font-bold hover:bg-purple-100 transition-all border border-purple-100 active:scale-95">Appliquer la version finale</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>,
        document.body
    )

    return (
        <AIReviewContext.Provider value={{ startReview, isLoading, isOpen }}>
            {children}
            {mounted && modalMarkup}
        </AIReviewContext.Provider>
    )
}

export const useAIReview = () => useContext(AIReviewContext)
