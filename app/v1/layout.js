import '../globals.css'
import '../globals-v1.css'

export const metadata = {
  title: 'Daniel Assayag - Product Manager | CV V1',
  description: 'Product Manager spécialisé dans la modernisation de systèmes legacy et l\'optimisation produit',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
