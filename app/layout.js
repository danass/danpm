import './globals.css'
import { Inter, Manrope } from 'next/font/google';
import Footer from './components/layout/Footer';
import ConditionalHomeLink from './components/layout/ConditionalHomeLink'; // Import the new component

export const metadata = {
  title: 'Portfolio – HomeExchange Case Study',
  description: 'A product case study inspired by HomeExchange, presented in a modern and clean style.',
  // icon: '/favicon.ico', // Can be uncommented if favicon is present
};

const manrope = Manrope({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({ children }) {
    return (
      <html lang="en" className="bg-white font-sans" style={{ fontFamily: 'Manrope, Inter, Nunito, Arial, Helvetica, sans-serif' }}>
        <head>
          <title>{metadata.title}</title><meta name="description" content={metadata.description} /><link rel="icon" href="/favicon.ico" />
        </head>
        <body className={`${manrope.className} bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 relative`}>
          <ConditionalHomeLink /> {/* Use the new component here */}
          
          <main >{children}</main> {/* pt-16 was added to prevent overlap with a potential fixed header */}
          <Footer />
        </body>
      </html>
    )
  }