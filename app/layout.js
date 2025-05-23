import './globals.css'
import './styles/design-system.css'
import { Inter, Manrope } from 'next/font/google';
import Footer from './components/layout/Footer';
import GlobalHomeLink from './components/layout/GlobalHomeLink';
// import ScrollAwareBackButton from './components/layout/ScrollAwareBackButton'; // This will be removed

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Portfolio – HomeExchange Case Study',
  description: 'A product case study inspired by HomeExchange, presented in a modern and clean style.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
    return (
      <html lang="en" className={`bg-white ${manrope.variable} ${inter.variable} font-sans font-manrope`}>
        <body className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 relative">
          <GlobalHomeLink /> {/* Use the global home link component */}
          {/* <ScrollAwareBackButton /> Remove if present */}
          
          <main className="pt-16">{children}</main> {/* Ensure pt-16 for spacing */}
          <Footer />
        </body>
      </html>
    )
  }