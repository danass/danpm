import fs from 'fs'
import path from 'path'
import '../editorial.css'
import ContactTrigger from '../components/EditorialContact'

export const metadata = {
  title: 'CV · Daniel Assayag',
  description:
    "CV de Daniel Assayag, product manager de la squad Operations chez HomeExchange. Back-office, outils internes, anti-fraude, automatisation.",
}

function getCV() {
  const dataPath = path.join(process.cwd(), 'data', 'cv-data.json')
  const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  return raw.fr
}

function skillNames(skills) {
  return skills
    .map((s) => (typeof s === 'string' ? s : s?.name))
    .filter(Boolean)
    .join(', ')
}

export default function CVPage() {
  const cv = getCV()
  const h = cv.header || {}

  return (
    <div className="edito">
      <div className="page">

        <header className="top">
          <span className="name">Daniel Assayag</span>
          <nav aria-label="Navigation">
            <a href="/">Accueil</a>
            <a href="/Daniel_Assayag_CV.pdf">Télécharger le PDF</a>
          </nav>
        </header>

        <div className="cv-head">
          <h1>{h.name || 'Daniel Assayag'}</h1>
          <p className="role">{h.jobTitle || 'Product Manager'}</p>
          <div className="cv-contact">
            <ContactTrigger className="as-link" label="Me contacter" />
            <span className="print-only" id="pdf-contact"></span>
            {h.linkedin && <a href={`https://${h.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            {h.github && <a href={`https://${h.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {h.location && <span>{h.location}</span>}
          </div>
          {cv.profile?.description && (
            <p className="cv-summary">{cv.profile.description}</p>
          )}
        </div>

        <section>
          <p className="eyebrow">{cv.experience?.title || 'Expérience'}</p>

          {(cv.experiences || []).map((exp, i) => (
            <article className="cv-exp" key={i}>
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
                      <ul className="cv-ach">
                        {(sec.achievements || []).map((a, k) => (
                          <li key={k} dangerouslySetInnerHTML={{ __html: a }} />
                        ))}
                      </ul>
                    </div>
                  ))
                : (
                    <ul className="cv-ach" style={{ marginTop: 14 }}>
                      {(exp.achievements || []).map((a, k) => (
                        <li key={k} dangerouslySetInnerHTML={{ __html: a }} />
                      ))}
                    </ul>
                  )}
            </article>
          ))}
        </section>

        <section>
          <p className="eyebrow">Compétences</p>
          <div style={{ marginTop: 28 }}>
            {(cv.skills || []).map((cat, i) => (
              <div className="cv-skillrow" key={i}>
                <h4>{cat.category}</h4>
                <p>{skillNames(cat.skills || [])}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow">{cv.education?.title || 'Formation'}</p>
          <dl>
            {(cv.education?.data || []).map((e, i) => (
              <div key={i}>
                <dt>{e.degree}{e.institution ? ` · ${e.institution}` : ''}{e.details ? ` (${e.details})` : ''}</dt>
                <dd>{e.period}</dd>
              </div>
            ))}
            {(cv.education?.additional || []).map((e, i) => (
              <div key={`a${i}`}>
                <dt>{e.degree}{e.institution ? ` · ${e.institution}` : ''}{e.details ? ` (${e.details})` : ''}</dt>
                <dd>{e.period}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <p className="eyebrow">{cv.certifications?.title || 'Certifications'}</p>
          <dl>
            {(cv.certifications?.data || []).map((c, i) => (
              <div key={i}>
                <dt>{c.name}</dt>
                <dd>{c.issuer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <p className="eyebrow">Langues et autres</p>
          <div className="cv-html" style={{ marginTop: 20 }}>
            {cv.languages?.text && <div dangerouslySetInnerHTML={{ __html: cv.languages.text }} />}
            {cv.activities?.text && <div dangerouslySetInnerHTML={{ __html: cv.activities.text }} />}
          </div>
        </section>

        <footer>
          <ContactTrigger className="as-link" label="Me contacter" />
          <a href="/">danpm.com</a>
          <span>{h.location || 'Paris'}</span>
        </footer>

      </div>
    </div>
  )
}
