// Le squelette commun aux onze pages : la coquille .edito/.page, l'en-tête et
// le pied. Même balisage qu'avant, rien de plus, rien de moins. C'est la
// version 0 : les variantes viennent dessus par des classes, elles ne la
// remplacent pas.
import '../../editorial.css'
import '../../variantes.css'
import ContactTrigger from '../EditorialContact'
import { vc, pageClasses } from './variant'
import { grotesk, literata } from '../../fonts'

export function TopNav({ ariaLabel = 'Navigation', variant }) {
  return (
    <header className={vc('top', 'top', variant)}>
      <span className="name">Daniel Assayag</span>
      <nav aria-label={ariaLabel}>
        <a href="/">Accueil</a>
        <a href="/travail">Travail</a>
        <a href="/cv">CV</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

// `links` : la liste après « Me contacter ». Un objet {href, label, external}
// devient un lien, une chaîne devient un simple <span>.
export function SiteFooter({ links, variant }) {
  const cls = vc('', 'footer', variant).trim()
  return (
    <footer id="contact" className={cls || undefined}>
      <ContactTrigger className="as-link" label="Me contacter" />
      {links.map((l, i) =>
        typeof l === 'string'
          ? <span key={i}>{l}</span>
          : l.external
            ? <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            : <a key={i} href={l.href}>{l.label}</a>
      )}
    </footer>
  )
}

export const FOOTER_SITE = [{ href: '/', label: 'danpm.com' }, 'Paris']
export const FOOTER_HOME = [
  { href: 'https://linkedin.com/in/daniel-assayag', label: 'LinkedIn', external: true },
  { href: 'https://github.com/danass', label: 'GitHub', external: true },
  'Paris',
]

// `v` : surcharge ponctuelle de la table d'assemblage, pour la galerie.
export default function Page({ navLabel = 'Navigation', footer = FOOTER_SITE, v = {}, children }) {
  const extra = pageClasses(v)
  const fontVars = extra.some((c) => c.startsWith('font-')) ? ` ${grotesk.variable} ${literata.variable}` : ''
  const cls = ['edito', ...extra].join(' ') + fontVars
  return (
    <div className={cls}>
      <div className="page">
        <TopNav ariaLabel={navLabel} variant={v.top} />
        {children}
        <SiteFooter links={footer} variant={v.footer} />
      </div>
    </div>
  )
}
