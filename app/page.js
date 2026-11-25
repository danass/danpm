import Page, { FOOTER_HOME } from '@/app/components/edito/Page'
import { Intro, CvLine, Section } from '@/app/components/edito/Blocks'
import { StoryLinks, Outro } from '@/app/components/edito/Story'
import { STORIES_EN } from '@/data/stories'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'Daniel Assayag · Product Manager',
  description:
    "Product manager of the Operations squad at HomeExchange. Back-office, internal tools, fraud prevention, support automation.",
  openGraph: {
    title: 'Daniel Assayag · Product Manager',
    description:
      "I automate the operational tasks of HomeExchange.",
    type: 'profile',
    locale: 'en_US',
    alternateLocale: 'fr_FR',
  },
  alternates: langMeta('en', '/').alternates,
}

export default function Home() {
  return (
    <Page navLabel="Main navigation" footer={FOOTER_HOME} lang="en" path="/">

      <Intro>
        <h1 className="ton-nom">I automate the operational tasks of <span className="nom">HomeExchange</span>.</h1>
        <p>
          I design with the people who use the tools: 200 agents as beta testers,
          internal satisfaction up from 6.2 to 8.3/10. I read the code before writing a
          ticket, so every business rule I state is checked in the source. I quantify
          each project before and after: 844 agent hours returned by the fraud
          automation in 2026.
        </p>
        <CvLine>
          <a href="/Daniel_Assayag_CV.pdf">Download the CV (PDF)</a>
          <a href="/cv">Full CV online</a>
        </CvLine>
      </Intro>

      <Section id="apercu" eyebrow="Stories">
        <StoryLinks stories={STORIES_EN} lang="en" />
        <CvLine>
          <a href="/travail">The method and the key figures →</a>
        </CvLine>
      </Section>

      <Outro eyebrow="Working together" cta="Write to me" lang="en" />

    </Page>
  )
}
