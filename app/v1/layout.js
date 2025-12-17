import '../globals.css'
import '../globals-v1.css'

export const metadata = {
  title: 'Daniel Assayag - Product Manager | CV V1',
  description: 'Product Manager spécialisé dans la modernisation de systèmes legacy et l\'optimisation produit',
}

export default async function RootLayout({ children, params, searchParams }) {
  // Unwrap params and searchParams (Next.js 15 requirement)
  // They are promises that need to be awaited in server components
  // Handle undefined values safely
  if (params) await params
  if (searchParams) await searchParams

  return (
    <html lang="fr">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
