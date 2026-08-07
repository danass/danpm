import './globals.css'

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

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}
