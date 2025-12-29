'use client'

import { LanguageProvider } from '../contexts/LanguageContext'

export function LanguageProviderClient({ children, initialData }) {
  return (
    <LanguageProvider initialData={initialData}>
      {children}
    </LanguageProvider>
  )
}

