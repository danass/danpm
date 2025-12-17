import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'
import LanguageSetter from './components/LanguageSetter'

export const metadata = {
  title: 'Daniel Assayag - Product Manager | CV',
  description: 'Product Manager junior avec expertise en product strategy, roadmap planning, user research, A/B testing, agile methodology, stakeholder management, et collaboration cross-fonctionnelle. Spécialisé dans la gestion de produits technologiques.',
  keywords: 'Product Manager, Product Management, Product Strategy, Roadmap Planning, User Research, A/B Testing, Agile, Scrum, Stakeholder Management, PRD, Product Requirements, KPIs, Metrics, Product Analytics, User Experience, Product Discovery, Backlog Management, Sprint Planning',
  authors: [{ name: 'Daniel Assayag' }],
  creator: 'Daniel Assayag',
  openGraph: {
    title: 'Daniel Assayag - Product Manager | CV',
    description: 'Product Manager junior spécialisé dans la gestion de produits technologiques',
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
        <LanguageProvider>
          <LanguageSetter />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
