'use client'

import { Mail, Linkedin, Github, Sparkles } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useState, useEffect } from 'react'
import ContactModal from './ContactModal'

export default function Footer() {
    const { t, language } = useLanguage()
    const [isContactOpen, setIsContactOpen] = useState(false)
    const [currentYear, setCurrentYear] = useState(2026)
    const stackInfo = "Next.js 15+, React 19, Tailwind CSS, PostCSS | ATS-friendly, Schema.org metadata, Print-optimized"

    useEffect(() => {
        setCurrentYear(new Date().getFullYear())
    }, [])

    return (
        <footer className="mt-20 pb-8 print:hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="relative group">
                    {/* Glassmorphic card */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl shadow-slate-200/50 -z-10 transition-all duration-500 group-hover:shadow-blue-100/50"></div>

                    <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div>
                                <h3 className="text-2xl font-light text-slate-900 tracking-tight">Daniel Assayag</h3>
                                <p className="text-slate-500 font-light mt-1">
                                    Product Manager • Paris, France
                                </p>
                            </div>

                            {/* Attribution Integrated */}
                            <div className="pt-4 border-t border-slate-200/50">
                                <div className="text-xs text-slate-400 font-light italic flex items-center justify-center md:justify-start gap-2">
                                    <span>{t.aboutCV.madeWith}</span>
                                    <span className="relative group/tooltip inline-block">
                                        <span className="text-slate-600 font-medium hover:text-blue-600 transition-colors cursor-help border-b border-slate-300 border-dotted">
                                            Cursor & Antigravity
                                        </span>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-[10px] rounded flex items-center gap-2 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                                            <Sparkles className="h-3 w-3 text-blue-400" />
                                            {stackInfo}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-6">
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-200/50 hover:-translate-y-0.5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                <Mail className="h-5 w-5 text-blue-400" />
                                <span className="relative font-medium tracking-wide">
                                    {language === 'fr' ? 'Me contacter' : 'Get in touch'}
                                </span>
                            </button>

                            <div className="flex items-center gap-2">
                                <a
                                    href="https://linkedin.com/in/daniel-assayag"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-sm"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>

                                <a
                                    href="https://github.com/danass"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-slate-100 hover:shadow-sm"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-light">
                        © {currentYear} Daniel Assayag • {language === 'fr' ? 'Imprimé avec soin' : 'Built for scale'}
                    </p>
                </div>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </footer>
    )
}
