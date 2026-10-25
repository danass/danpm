// Les blocs de mise en page : intro, section à kicker, ligne de liens.
export function Intro({ children }) {
  return <div className="intro">{children}</div>
}

export function CvLine({ children }) {
  return <p className="cvline">{children}</p>
}

export function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>
}

// Une section ouvre sur son kicker quand elle en a un ; `className` et `id`
// passent tels quels (la section « outro » de l'accueil, les ancres de /travail).
export function Section({ id, className, eyebrow, children }) {
  return (
    <section id={id} className={className}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {children}
    </section>
  )
}
