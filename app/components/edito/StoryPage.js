// Une page d'histoire : le retour vers la liste, puis l'article. Les huit
// pages de /travail/* ne gardent que leur texte.
import Page from './Page'
import { Intro, CvLine, Section } from './Blocks'
import { Story } from './Story'
import { UI, localize } from '@/lib/i18n'

export default function StoryPage({ tag, title, stat, lang = 'fr', slug, children }) {
  return (
    <Page lang={lang} path={slug ? `/travail/${slug}` : undefined}>
      <Intro>
        <CvLine><a href={localize(lang, '/travail')}>{UI[lang].allStories}</a></CvLine>
      </Intro>
      <Section>
        <Story tag={tag} title={title} stat={stat}>
          {children}
        </Story>
      </Section>
    </Page>
  )
}
