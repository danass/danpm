// Les blocs du CV. Les données viennent de data/cv-data.json ; ici on ne fait
// que les poser, avec le balisage que la feuille de style connaît.
import ContactTrigger from '../EditorialContact'

export function CvHead({ header: h, summary }) {
  return (
    <div className="cv-head">
      <h1>{h.name || 'Daniel Assayag'}</h1>
      <p className="role">{h.jobTitle || 'Product Manager'}</p>
      <div className="cv-contact">
        <ContactTrigger className="as-link" label="Me contacter" />
        <span className="print-only" id="pdf-contact"></span>
        <a href="/Daniel_Assayag_CV.pdf">Télécharger le PDF</a>
        {h.linkedin && <a href={`https://${h.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        {h.github && <a href={`https://${h.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>}
        {h.location && <span>{h.location}</span>}
      </div>
      {summary && <p className="cv-summary">{summary}</p>}
    </div>
  )
}

function Achievements({ items, style }) {
  return (
    <ul className="cv-ach" style={style}>
      {(items || []).map((a, k) => (
        <li key={k} dangerouslySetInnerHTML={{ __html: a }} />
      ))}
    </ul>
  )
}

export function CvExperience({ exp }) {
  return (
    <article className="cv-exp">
      <div className="cv-exp-top">
        <div>
          <h3>{exp.company}</h3>
          <p className="pos">{exp.position}</p>
        </div>
        <p className="when">
          {exp.period}
          {exp.location ? <><br />{exp.location}</> : null}
        </p>
      </div>
      {exp.sections
        ? exp.sections.map((sec, j) => (
            <div className="cv-sub" key={j}>
              <h4>{sec.title}</h4>
              <Achievements items={sec.achievements} />
            </div>
          ))
        : <Achievements items={exp.achievements} style={{ marginTop: 14 }} />}
    </article>
  )
}

function skillNames(skills) {
  return skills
    .map((s) => (typeof s === 'string' ? s : s?.name))
    .filter(Boolean)
    .join(', ')
}

export function CvSkills({ categories }) {
  return (
    <div style={{ marginTop: 28 }}>
      {(categories || []).map((cat, i) => (
        <div className="cv-skillrow" key={i}>
          <h4>{cat.category}</h4>
          <p>{skillNames(cat.skills || [])}</p>
        </div>
      ))}
    </div>
  )
}

// Formation et certifications partagent la même liste à deux colonnes.
export function CvDefList({ rows }) {
  return (
    <dl>
      {rows.map((r, i) => (
        <div key={r.key ?? i}><dt>{r.term}</dt><dd>{r.detail}</dd></div>
      ))}
    </dl>
  )
}

export function CvHtml({ blocks }) {
  return (
    <div className="cv-html" style={{ marginTop: 20 }}>
      {blocks.filter(Boolean).map((html, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </div>
  )
}
