'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'
import { useCollapse } from '../contexts/CollapseContext'
import { useEdit } from '../contexts/EditContext'
import { ChevronDown, ChevronUp, Minimize2, Maximize2, Edit, Printer, Mail } from 'lucide-react'
import SaveButton from './SaveButton'
import EditableText from './EditableText'
import ContactModal from './ContactModal'

export default function Header() {
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, language, changeLanguage } = useLanguage()
  const { isCollapsed, toggleCollapse, isCompact, toggleCompact } = useCollapse()
  const { isEditMode, toggleEditMode, setHasChanges } = useEdit()
  const { updateData } = useLanguage()
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check URL parameter for edit mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const editParam = params.get('edit')
      setCanEdit(editParam === 'true' || editParam === '1')
    }
  }, [])

  const handleJobTitleChange = (newValue) => {
    updateData('header.jobTitle', newValue)
    setHasChanges(true)
  }

  const toggleLanguage = () => {
    changeLanguage(language === 'fr' ? 'en' : 'fr')
  }

  return (
    <>
      <header className={`print-avoid-break border-b border-slate-200 ${isCompact ? 'pb-4' : 'pb-8'}`} itemScope itemType="https://schema.org/Person">
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0">
            <Image
              src="/portrait.jpg"
              alt="Daniel Assayag"
              width={isCompact ? 100 : 140}
              height={isCompact ? 100 : 140}
              className={`rounded-full object-cover border-4 border-white shadow-lg print:!border-white print:shadow-none print:outline-none cursor-pointer hover:scale-105 transition-transform print:cursor-default print:hover:scale-100 ${isCompact ? 'w-[100px] h-[100px]' : 'w-[140px] h-[140px]'}`}
              itemProp="image"
              priority
              onClick={() => setIsImageExpanded(true)}
            />
          </div>
          <div className="flex-1 pt-2">
            <div className="flex items-center justify-between mb-2">
              <h1 className={`${isCompact ? 'text-4xl' : 'text-5xl'} font-light text-slate-900 tracking-tight`} itemProp="name">
                <EditableText
                  value={t.header?.name || "Daniel Assayag"}
                  onChange={(val) => {
                    updateData('header.name', val)
                    setHasChanges(true)
                  }}
                  className="inline"
                />
              </h1>
              <div className="flex items-center gap-2 print:hidden">
                {isEditMode && <SaveButton />}

                <button
                  onClick={async () => {
                    // Download PDF from server (Puppeteer renders it properly)
                    try {
                      const baseUrl = window.location.origin
                      const response = await fetch(`/api/pdf?baseUrl=${encodeURIComponent(baseUrl)}`)

                      if (!response.ok) throw new Error('PDF generation failed')

                      const blob = await response.blob()
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'Daniel_Assayag_CV.pdf'
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      URL.revokeObjectURL(url)
                    } catch (error) {
                      console.error('PDF download error:', error)
                      alert('Erreur lors du téléchargement du PDF')
                    }
                  }}
                  className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 px-3 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 print:hidden"
                  aria-label={language === 'fr' ? 'Télécharger PDF' : 'Download PDF'}
                  title={language === 'fr' ? 'Télécharger en PDF' : 'Download as PDF'}
                >
                  <Printer className="h-4 w-4" />
                  <span className="text-xs">PDF</span>
                </button>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 print:hidden"
                  aria-label={language === 'fr' ? 'Me contacter' : 'Contact me'}
                  title={language === 'fr' ? 'Me contacter' : 'Contact me'}
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-xs">{language === 'fr' ? 'Contact' : 'Contact'}</span>
                </button>

                {canEdit && (
                  <button
                    onClick={toggleEditMode}
                    className={`flex items-center gap-1 text-sm ${isEditMode ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'} active:bg-slate-200 px-3 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2`}
                    aria-label={isEditMode ? (language === 'fr' ? 'Quitter le mode édition' : 'Exit edit mode') : (language === 'fr' ? 'Mode édition' : 'Edit mode')}
                    title={isEditMode ? (language === 'fr' ? 'Quitter le mode édition' : 'Exit edit mode') : (language === 'fr' ? 'Mode édition' : 'Edit mode')}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="text-xs">{isEditMode ? (language === 'fr' ? 'Édition' : 'Editing') : (language === 'fr' ? 'Éditer' : 'Edit')}</span>
                  </button>
                )}

                <button
                  onClick={toggleCompact}
                  className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 px-3 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  aria-label={isCompact ? (language === 'fr' ? 'Mode normal' : 'Normal mode') : (language === 'fr' ? 'Mode compact' : 'Compact mode')}
                  title={isCompact ? (language === 'fr' ? 'Mode normal' : 'Normal mode') : (language === 'fr' ? 'Mode compact' : 'Compact mode')}
                >
                  {isCompact ? (
                    <>
                      <Maximize2 className="h-4 w-4" />
                      <span className="text-xs">{language === 'fr' ? 'Normal' : 'Normal'}</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 className="h-4 w-4" />
                      <span className="text-xs">{language === 'fr' ? 'Compact' : 'Compact'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={toggleLanguage}
                  className="text-3xl hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md p-2 hover:bg-slate-100 active:bg-slate-200"
                  aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
                  title={language === 'fr' ? 'Switch to English' : 'Passer en français'}
                >
                  {language === 'fr' ? '🇬🇧' : '🇫🇷'}
                </button>
              </div>
            </div>
            <p className={`font-light ${isCompact ? 'text-xl' : 'text-2xl'} text-slate-600 ${isCompact ? 'mb-4' : 'mb-6'}`} itemProp="jobTitle">
              <EditableText
                value={t.header.jobTitle}
                onChange={handleJobTitleChange}
                className="inline"
              />
            </p>
            <div className={`flex flex-wrap ${isCompact ? 'gap-4' : 'gap-6'} text-slate-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
              <p itemProp="email">
                📧{' '}
                {isEditMode ? (
                  <EditableText
                    value={t.header?.email || "dseyag@gmail.com"}
                    onChange={(val) => {
                      updateData('header.email', val)
                      setHasChanges(true)
                    }}
                    className="inline"
                  />
                ) : (
                  <a href={`mailto:${t.header?.email || "dseyag@gmail.com"}`} className="text-slate-600 hover:text-slate-900 transition-colors print:text-black print:no-underline">
                    {t.header?.email || "dseyag@gmail.com"}
                  </a>
                )}
              </p>
              <p>
                {isEditMode ? (
                  <>
                    🌐{' '}
                    <EditableText
                      value={t.header?.linkedin || "linkedin.com/in/daniel-assayag"}
                      onChange={(val) => {
                        updateData('header.linkedin', val)
                        setHasChanges(true)
                      }}
                      className="inline"
                    />
                  </>
                ) : (
                  <a
                    href={`https://${t.header?.linkedin || "www.linkedin.com/in/daniel-assayag"}`}
                    itemProp="url"
                    className="text-slate-600 hover:text-slate-900 transition-colors print:text-black print:no-underline"
                  >
                    🌐 {t.header?.linkedin || "linkedin.com/in/daniel-assayag"}
                  </a>
                )}
              </p>
              <p>
                {isEditMode ? (
                  <>
                    💻{' '}
                    <EditableText
                      value={t.header?.github || "github.com/danass"}
                      onChange={(val) => {
                        updateData('header.github', val)
                        setHasChanges(true)
                      }}
                      className="inline"
                    />
                  </>
                ) : (
                  <a
                    href={`https://${t.header?.github || "github.com/danass"}`}
                    itemProp="url"
                    className="text-slate-600 hover:text-slate-900 transition-colors print:text-black print:no-underline"
                  >
                    💻 {t.header?.github || "github.com/danass"}
                  </a>
                )}
              </p>
              <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                📍{' '}
                <EditableText
                  value={t.header.location || "Paris, 5ème, France"}
                  onChange={(val) => {
                    updateData('header.location', val)
                    setHasChanges(true)
                  }}
                  className="inline"
                />
              </p>
            </div>
          </div>
        </div>
      </header >

      {/* Modal pour l'image agrandie */}
      {
        isImageExpanded && mounted && createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-[9999] flex items-center justify-center p-4 animate-fadeIn print:hidden"
            onClick={() => setIsImageExpanded(false)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsImageExpanded(false)}
                className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
                aria-label={t.header.closeModal}
              >
                ×
              </button>
              <Image
                src="/portrait.jpg"
                alt="Daniel Assayag"
                width={800}
                height={800}
                className="rounded-lg object-contain w-full h-full shadow-2xl"
                priority
              />
            </div>
          </div>,
          document.body
        )
      }

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
