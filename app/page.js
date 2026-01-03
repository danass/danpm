'use client'

import CV from './components/CV'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 print:bg-white overflow-hidden pb-12">
      {/* Animated background highlights */}
      <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl print:hidden"></div>
      <div className="absolute -left-24 top-96 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl print:hidden"></div>
      <div className="absolute right-1/3 bottom-32 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl print:hidden"></div>

      <CV />
      <Footer />
    </main>
  )
}
