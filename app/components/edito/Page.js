// Le squelette commun aux onze pages : la coquille .edito/.page, l'en-tête et
// le pied. Même balisage qu'avant, rien de plus, rien de moins. C'est la
// version 0 : les variantes viendront dessus, elles ne la remplacent pas.
import '../../editorial.css'
import ContactTrigger from '../EditorialContact'

export function TopNav({ ariaLabel = 'Navigation' }) {
  return (
    <header className="top">
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
export function SiteFooter({ links }) {
  return (
    <footer id="contact">
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

export default function Page({ navLabel = 'Navigation', footer = FOOTER_SITE, children }) {
  return (
    <div className="edito">
      <div className="page">
        <TopNav ariaLabel={navLabel} />
        {children}
        <SiteFooter links={footer} />
      </div>
    </div>
  )
}
