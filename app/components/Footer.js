'use client'

import { Mail, Linkedin, Github } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useState } from 'react'
import ContactModal from './ContactModal'

export default function Footer() {
    const { language } = useLanguage()
    const [isContactOpen, setIsContactOpen] = useState(false)

    const currentYear = new Date().getFullYear()

    return (
        <footer className="mt-20 pb-12 print:hidden">
            <div className="max-w-4xl mx-auto px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-slate-200/60">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-light text-slate-900 mb-2">Daniel Assayag</h3>
                        <p className="text-sm text-slate-500 font-light">
                            Product Manager • Paris, France
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            <Mail className="h-4 w-4" />
                            <span className="text-sm font-medium">{language === 'fr' ? 'Me contacter' : 'Contact me'}</span>
                        </button>

                        <a
                            href="https://linkedin.com/in/daniel-assayag"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>

                        <a
                            href="https://github.com/danass"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-200"
                            aria-label="GitHub"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400 font-light">
                        © {currentYear} Daniel Assayag. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
                    </p>
                </div>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </footer>
    )
}
