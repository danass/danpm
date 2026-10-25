// Les polices des variantes « font ». Servies par Next (font-src 'self' dans
// la CSP, pas d'appel à Google au chargement). v0 reste la police système.
// Literata est bannie de tous les projets : ne pas la réintroduire.
import { Schibsted_Grotesk } from 'next/font/google'

export const grotesk = Schibsted_Grotesk({
  subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-grotesk', display: 'swap',
})
