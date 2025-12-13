import './globals.css'

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

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
