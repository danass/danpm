'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isImageExpanded, setIsImageExpanded] = useState(false)

  return (
    <>
      <header className="print-avoid-break border-b border-slate-200 pb-8 print:pb-1 print:mb-1 print:pt-0" itemScope itemType="https://schema.org/Person">
        <div className="flex items-start gap-8 print:gap-4">
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
        <div className="flex-1 pt-2 print:pt-0">
          <h1 className="text-5xl font-light text-slate-900 mb-2 tracking-tight print:text-2xl print:mb-1" itemProp="name">
            Daniel Assayag
          </h1>
          <p className="font-light text-2xl text-slate-600 mb-6 print:text-base print:mb-2" itemProp="jobTitle">Product Manager</p>
          <div className="flex flex-wrap gap-6 text-slate-500 text-sm print:gap-3 print:text-xs print:leading-tight">
            <p itemProp="email" className="print:text-xs">
              <span className="print:hidden">📧 </span>dseyag@gmail.com
            </p>
            <p itemProp="telephone" className="print:text-xs">
              <span className="print:hidden">📱 </span>+33 6 99 38 56 20
            </p>
            <p className="print:text-xs">
              <a 
                href="https://www.linkedin.com/in/daniel-assayag/" 
                itemProp="url" 
                className="text-slate-600 hover:text-slate-900 transition-colors print:text-black print:no-underline"
              >
                <span className="print:hidden">🌐 </span>linkedin.com/in/daniel-assayag
              </a>
            </p>
            <p className="print:text-xs">
              <a 
                href="https://github.com/danass" 
                itemProp="url" 
                className="text-slate-600 hover:text-slate-900 transition-colors print:text-black print:no-underline"
              >
                <span className="print:hidden">💻 </span>github.com/danass
              </a>
            </p>
            <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="print:text-xs">
              <span className="print:hidden">📍 </span>
              <span itemProp="addressLocality">Paris, 5th</span>, <span itemProp="addressCountry">France</span>
            </p>
          </div>
        </div>
      </div>
    </header>
    
    {/* Modal for enlarged image */}
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
            aria-label="Close"
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
