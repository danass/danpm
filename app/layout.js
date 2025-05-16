import './globals.css'
import { Inter, Manrope } from 'next/font/google';
import Footer from './components/layout/Footer';
import GlobalHomeLink from './components/layout/ConditionalHomeLink'; // Path is still ConditionalHomeLink.js, but component is GlobalHomeLink
// import ScrollAwareBackButton from './components/layout/ScrollAwareBackButton'; // This will be removed

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
          <GlobalHomeLink /> {/* Use the global home link component */}
          {/* <ScrollAwareBackButton /> Remove if present */}
          
          <main className="pt-16">{children}</main> {/* Ensure pt-16 for spacing */}
          <Footer />
        </body>
      </html>
    )
  }