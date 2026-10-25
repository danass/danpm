// Les blocs de mise en page : intro, section à kicker, ligne de liens.
import { vc } from './variant'

export function Intro({ variant, children }) {
  return <div className={vc('intro', 'intro', variant)}>{children}</div>
}

export function CvLine({ children }) {
  return <p className="cvline">{children}</p>
}

export function Eyebrow({ variant, children }) {
  return <p className={vc('eyebrow', 'eyebrow', variant)}>{children}</p>
}

// Une section ouvre sur son kicker quand elle en a un ; `className` et `id`
// passent tels quels (la section « outro » de l'accueil, les ancres de /travail).
export function Section({ id, className, eyebrow, variant, eyebrowVariant, children }) {
  const cls = vc(className || '', 'section', variant).trim()
  return (
    <section id={id} className={cls || undefined}>
      {eyebrow ? <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow> : null}
      {children}
    </section>
  )
}
