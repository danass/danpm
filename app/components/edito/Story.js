// Tout ce qui raconte : la liste d'histoires, l'article, son chiffre, ses
// captures, la liste d'outils, les repères, l'appel final.
import Image from 'next/image'
import ContactTrigger from '../EditorialContact'
import { Eyebrow } from './Blocks'
import { vc, vname } from './variant'

export function StoryLinks({ stories, variant }) {
  return (
    <ul className={vc('story-links', 'storyLinks', variant)}>
      {stories.map((s) => (
        <li key={s.slug}>
          <a href={`/travail/${s.slug}`}>
            <span className="tag">{s.tag}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Stat({ value, label, variant }) {
  return (
    <div className={vc('stat', 'stat', variant)}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  )
}

// `tag` et `title` acceptent du JSX : les titres portent des apostrophes
// typographiques et des espaces insécables qu'on garde tels quels.
export function Story({ tag, title, stat, statVariant, children }) {
  return (
    <article className="story">
      {tag ? <p className="tag">{tag}</p> : null}
      <h2>{title}</h2>
      {stat ? <Stat value={stat.value} label={stat.label} variant={statVariant} /> : null}
      {children}
    </article>
  )
}

export function Shot({ src, alt, width, height, children }) {
  return (
    <figure className="shot">
      <Image src={src} alt={alt} width={width} height={height} />
      <figcaption>{children}</figcaption>
    </figure>
  )
}

// Un outil par ligne : ce qu'il fait, ce qu'il rapporte. Avec `href`, le
// libellé devient un lien vers l'histoire.
// Le gain « avant → après » est découpé dès qu'on sort de v0, pour que les
// variantes puissent dessiner le passage. En v0 il reste une seule chaîne.
function Gain({ text, split }) {
  if (!split) return <span className="gain">{text}</span>
  const [from, to] = String(text).split(/\s*→\s*/)
  if (to === undefined) return <span className="gain"><span className="to">{from}</span></span>
  return (
    <span className="gain">
      <span className="from">{from}</span>
      <span className="arrow" aria-hidden="true">→</span>
      <span className="to">{to}</span>
    </span>
  )
}

export function Tools({ items, variant }) {
  const split = vname('tools', variant) !== 'v0'
  return (
    <ul className={vc('tools', 'tools', variant)}>
      {items.map((t, i) => (
        <li key={i}>
          {t.href
            ? <a href={t.href} className="what">{t.what}</a>
            : <span className="what">{t.what}</span>}
          <Gain text={t.gain} split={split} />
        </li>
      ))}
    </ul>
  )
}

// Une liste de définitions à deux colonnes : libellé à gauche, valeur à droite.
export function Facts({ items, variant }) {
  const cls = vc('', 'facts', variant).trim()
  return (
    <dl className={cls || undefined}>
      {items.map((f, i) => (
        <div key={i}><dt>{f.label}</dt><dd>{f.value}</dd></div>
      ))}
    </dl>
  )
}

// L'appel final est aussi une section : il prend la variante de section en
// plus de la sienne, sinon il garde son filet quand les autres l'ont perdu.
export function Outro({ eyebrow, cta, variant, eyebrowVariant, sectionVariant, children }) {
  return (
    <section className={vc(vc('outro', 'outro', variant), 'section', sectionVariant)}>
      <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>
      <p>{children}</p>
      <ContactTrigger className="cta" label={cta} />
    </section>
  )
}
