// Les polices des variantes « font ». Servies par Next (font-src 'self' dans
// la CSP, pas d'appel à Google au chargement). v0 reste la police système.
import { Schibsted_Grotesk, Literata } from 'next/font/google'

export const grotesk = Schibsted_Grotesk({
  subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-grotesk', display: 'swap',
})
export const literata = Literata({
  subsets: ['latin'], weight: ['500', '700'], variable: '--font-serif', display: 'swap',
})
