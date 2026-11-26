// La page CV, commune aux deux langues : /cv (anglais) et /fr/cv.
// Les données viennent de data/cv-data.json, une branche par langue.
import fs from 'fs'
import path from 'path'
import Page from './Page'
import { Section } from './Blocks'
import { CvHead, CvExperience, CvSkills, CvDefList, CvHtml } from './Cv'
import { UI } from '@/lib/i18n'

function getCV(lang) {
  const dataPath = path.join(process.cwd(), 'data', 'cv-data.json')
  const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  return raw[lang]
}

// Une ligne de formation : diplôme · école (détail), puis la période.
const schoolRow = (e, key) => ({
  key,
  term: `${e.degree}${e.institution ? ` · ${e.institution}` : ''}${e.details ? ` (${e.details})` : ''}`,
  detail: e.period,
})

export default function CvPage({ lang = 'fr' }) {
  const t = UI[lang]
  const cv = getCV(lang)
  const h = cv.header || {}
  const education = [
    ...(cv.education?.data || []).map((e, i) => schoolRow(e, i)),
    ...(cv.education?.additional || []).map((e, i) => schoolRow(e, `a${i}`)),
  ]
  const certifications = (cv.certifications?.data || []).map((c, i) => ({ key: i, term: c.name, detail: c.issuer }))

  return (
    <Page lang={lang} path="/cv" hideName footer={[{ href: '/', label: 'danpm.com' }, h.location || 'Paris']}>

      <CvHead header={h} summary={cv.profile?.description} lang={lang} />

      <Section eyebrow={cv.experience?.title || t.experience}>
        {(cv.experiences || []).map((exp, i) => <CvExperience exp={exp} key={i} />)}
      </Section>

      <Section eyebrow={t.skills}>
        <CvSkills categories={cv.skills} />
      </Section>

      <Section eyebrow={cv.education?.title || t.education}>
        <CvDefList rows={education} />
      </Section>

      <Section eyebrow={cv.certifications?.title || t.certifications}>
        <CvDefList rows={certifications} />
      </Section>

      <Section eyebrow={t.other}>
        <CvHtml blocks={[cv.languages?.text, cv.activities?.text]} />
      </Section>

    </Page>
  )
}
