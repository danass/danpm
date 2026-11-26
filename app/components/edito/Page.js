// Le squelette commun aux onze pages : la coquille .edito/.page, l'en-tête et
// le pied. Même balisage qu'avant, rien de plus, rien de moins. C'est la
// version 0 : les variantes viennent dessus par des classes, elles ne la
// remplacent pas.
import '../../editorial.css'
import '../../variantes.css'
import ContactTrigger from '../EditorialContact'
import { vc, pageClasses } from './variant'
import { grotesk } from '../../fonts'
import { UI, localize } from '@/lib/i18n'

// `path` : le chemin de la page sans préfixe de langue, pour le lien vers
// l'autre langue. Sans `path`, pas de lien (la galerie /variantes).
export function TopNav({ ariaLabel = 'Navigation', variant, lang = 'fr', path, hideName = false }) {
  const t = UI[lang]
  return (
    <header className={vc('top', 'top', variant)}>
      {/* Le span reste vide sur /cv (le nom y est déjà le titre) pour garder la mise en page. */}
      <span className="name">{hideName ? null : 'Daniel Assayag'}</span>
      <nav aria-label={ariaLabel}>
        <a href={localize(lang, '/')}>{t.home}</a>
        <a href={localize(lang, '/travail')}>{t.work}</a>
        <a href={localize(lang, '/cv')}>{t.cv}</a>
        <a href="#contact">{t.contact}</a>
        {path ? <a href={localize(t.switchLang, path)} hrefLang={t.switchLang} lang={t.switchLang}>{t.switchLabel}</a> : null}
      </nav>
    </header>
  )
}

// `links` : la liste après « Me contacter ». Un objet {href, label, external}
// devient un lien, une chaîne devient un simple <span>.
export function SiteFooter({ links, variant, lang = 'fr' }) {
  const cls = vc('', 'footer', variant).trim()
  return (
    <footer id="contact" className={cls || undefined}>
      <ContactTrigger className="as-link" label={UI[lang].contactMe} lang={lang} />
      {links.map((l, i) =>
        typeof l === 'string'
          ? <span key={i}>{l}</span>
          : l.external
            ? <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            : <a key={i} href={localize(lang, l.href)}>{l.label}</a>
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
export default function Page({ navLabel = 'Navigation', footer = FOOTER_SITE, v = {}, lang = 'fr', path, hideName = false, children }) {
  const extra = pageClasses(v)
  const fontVars = extra.some((c) => c.startsWith('font-')) ? ` ${grotesk.variable}` : ''
  const cls = ['edito', ...extra].join(' ') + fontVars
  return (
    <div className={cls} lang={lang}>
      <div className="page">
        <TopNav ariaLabel={navLabel} variant={v.top} lang={lang} path={path} hideName={hideName} />
        {children}
        <SiteFooter links={footer} variant={v.footer} lang={lang} />
      </div>
    </div>
  )
}
