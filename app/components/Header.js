'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'

export default function Header() {
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const { t } = useLanguage()

  return (
    <>
      <header className="print-avoid-break border-b border-slate-200 pb-8" itemScope itemType="https://schema.org/Person">
        <div className="flex items-start gap-8">
          <div className="flex-shrink-0">
            <Image
              src="/portrait.jpg"
              alt="Daniel Assayag"
              width={140}
              height={140}
              className="rounded-full object-cover border-4 border-white shadow-lg print:!border-black print:shadow-none print:outline-none cursor-pointer hover:scale-105 transition-transform print:cursor-default print:hover:scale-100"
              itemProp="image"
              priority
              onClick={() => setIsImageExpanded(true)}
            />
          </div>
        <div className="flex-1 pt-2">
          <h1 className="text-5xl font-light text-slate-900 mb-2 tracking-tight" itemProp="name">
            Daniel Assayag
          </h1>
          <p className="font-light text-2xl text-slate-600 mb-6" itemProp="jobTitle">{t.header.jobTitle}</p>
          <div className="flex flex-wrap gap-6 text-slate-500 text-sm">
            <p itemProp="email">
              📧 dseyag@gmail.com
            </p>
            <p itemProp="telephone">
              📱 +33 6 99 38 56 20
            </p>
            <p>
              <a 
                href="https://www.linkedin.com/in/daniel-assayag/" 
                itemProp="url" 
                className="text-slate-600 hover:text-slate-900 transition-colors print:text-black print:no-underline"
              >
                🌐 linkedin.com/in/daniel-assayag
              </a>
            </p>
            <p>
              <a 
                href="https://github.com/danass" 
                itemProp="url" 
                className="text-slate-600 hover:text-slate-900 transition-colors print:text-black print:no-underline"
              >
                💻 github.com/danass
              </a>
            </p>
            <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              📍 <span itemProp="addressLocality">{t.header.location}</span>, <span itemProp="addressCountry">France</span>
            </p>
          </div>
        </div>
      </div>
    </header>
    
    {/* Modal pour l'image agrandie */}
    {isImageExpanded && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fadeIn print:hidden"
        onClick={() => setIsImageExpanded(false)}
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
      </div>
    )}
    </>
  )
}
