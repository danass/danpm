import './globals.css'
import LanguageProviderWrapper from './components/LanguageProviderWrapper'
import { CollapseProvider } from './contexts/CollapseContext'
import { EditProvider } from './contexts/EditContext'
import { AIReviewProvider } from './contexts/AIReviewContext'
import LanguageSetter from './components/LanguageSetter'
import { Toaster } from './components/ui/toaster'

export const metadata = {
  title: 'Daniel Assayag · Product Manager',
  description: "Product manager de la squad Operations chez HomeExchange. Back-office, outils internes, anti-fraude, automatisation du support. Des histoires tirées de mes notes de semaine, pas d'une plaquette.",
  keywords: 'Product Manager, Product Ops, Operations, Back-office, Outils internes, Anti-fraude, Automatisation, Trust and Safety, HomeExchange, Paris',
  authors: [{ name: 'Daniel Assayag' }],
  creator: 'Daniel Assayag',
  openGraph: {
    title: 'Daniel Assayag · Product Manager',
    description: 'Je construis les outils qui font tourner HomeExchange en coulisses.',
    type: 'profile',
    locale: 'fr_FR',
  },
}

export default async function RootLayout({ children, params, searchParams }) {
  // Unwrap params and searchParams (Next.js 15 requirement)
  // They are promises that need to be awaited in server components
  // Handle undefined values safely
  if (params) await params
  if (searchParams) await searchParams

  return (
    <html lang="fr">
      <body>
        <LanguageProviderWrapper>
          <CollapseProvider>
            <EditProvider>
              <AIReviewProvider>
                <LanguageSetter />
                {children}
                <Toaster />
              </AIReviewProvider>
            </EditProvider>
          </CollapseProvider>
        </LanguageProviderWrapper>
      </body>
    </html>
  )
}
