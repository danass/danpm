// Une page d'histoire : le retour vers la liste, puis l'article. Les huit
// pages de /travail/* ne gardent que leur texte.
import Page from './Page'
import { Intro, CvLine, Section } from './Blocks'
import { Story } from './Story'

export default function StoryPage({ tag, title, stat, children }) {
  return (
    <Page>
      <Intro>
        <CvLine><a href="/travail">← Toutes les histoires</a></CvLine>
      </Intro>
      <Section>
        <Story tag={tag} title={title} stat={stat}>
          {children}
        </Story>
      </Section>
    </Page>
  )
}
