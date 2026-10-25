// Tout ce qui raconte : la liste d'histoires, l'article, son chiffre, ses
// captures, la liste d'outils, les repères, l'appel final.
import Image from 'next/image'
import ContactTrigger from '../EditorialContact'
import { Eyebrow } from './Blocks'
import { vc } from './variant'

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
export function Tools({ items, variant }) {
  return (
    <ul className={vc('tools', 'tools', variant)}>
      {items.map((t, i) => (
        <li key={i}>
          {t.href
            ? <a href={t.href} className="what">{t.what}</a>
            : <span className="what">{t.what}</span>}
          <span className="gain">{t.gain}</span>
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

export function Outro({ eyebrow, cta, variant, eyebrowVariant, children }) {
  return (
    <section className={vc('outro', 'outro', variant)}>
      <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>
      <p>{children}</p>
      <ContactTrigger className="cta" label={cta} />
    </section>
  )
}
