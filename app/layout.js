import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.danpm.com'),
  title: 'Daniel Assayag · Product Manager',
  description: "Product manager of the Operations squad at HomeExchange. Back-office, internal tools, fraud prevention, support automation. Stories drawn from my weekly notes, not from a brochure.",
  keywords: 'Product Manager, Product Ops, Operations, Back-office, Internal tools, Fraud prevention, Automation, Trust and Safety, HomeExchange, Paris',
  authors: [{ name: 'Daniel Assayag' }],
  creator: 'Daniel Assayag',
  openGraph: {
    title: 'Daniel Assayag · Product Manager',
    description: 'I automate the operational tasks of HomeExchange.',
    type: 'profile',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
