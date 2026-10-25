import fs from 'fs'
import path from 'path'
import Page from '@/app/components/edito/Page'
import { Section } from '@/app/components/edito/Blocks'
import { CvHead, CvExperience, CvSkills, CvDefList, CvHtml } from '@/app/components/edito/Cv'

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

// Une ligne de formation : diplôme · école (détail), puis la période.
const schoolRow = (e, key) => ({
  key,
  term: `${e.degree}${e.institution ? ` · ${e.institution}` : ''}${e.details ? ` (${e.details})` : ''}`,
  detail: e.period,
})

export default function CVPage() {
  const cv = getCV()
  const h = cv.header || {}
  const education = [
    ...(cv.education?.data || []).map((e, i) => schoolRow(e, i)),
    ...(cv.education?.additional || []).map((e, i) => schoolRow(e, `a${i}`)),
  ]
  const certifications = (cv.certifications?.data || []).map((c, i) => ({ key: i, term: c.name, detail: c.issuer }))

  return (
    <Page footer={[{ href: '/', label: 'danpm.com' }, h.location || 'Paris']}>

      <CvHead header={h} summary={cv.profile?.description} />

      <Section eyebrow={cv.experience?.title || 'Expérience'}>
        {(cv.experiences || []).map((exp, i) => <CvExperience exp={exp} key={i} />)}
      </Section>

      <Section eyebrow="Compétences">
        <CvSkills categories={cv.skills} />
      </Section>

      <Section eyebrow={cv.education?.title || 'Formation'}>
        <CvDefList rows={education} />
      </Section>

      <Section eyebrow={cv.certifications?.title || 'Certifications'}>
        <CvDefList rows={certifications} />
      </Section>

      <Section eyebrow="Langues et autres">
        <CvHtml blocks={[cv.languages?.text, cv.activities?.text]} />
      </Section>

    </Page>
  )
}
