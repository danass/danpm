import Page, { FOOTER_HOME } from '@/app/components/edito/Page'
import { Intro, CvLine, Section } from '@/app/components/edito/Blocks'
import { StoryLinks, Outro } from '@/app/components/edito/Story'
import { STORIES } from '@/data/stories'

export const metadata = {
  title: 'Daniel Assayag · Product Manager',
  description:
    "Product manager de la squad Operations chez HomeExchange. Back-office, outils internes, anti-fraude, automatisation du support.",
  openGraph: {
    title: 'Daniel Assayag · Product Manager',
    description:
      "Je construis le back-office et les outils internes de HomeExchange.",
    type: 'profile',
    locale: 'fr_FR',
  },
}

export default function Home() {
  return (
    <Page navLabel="Navigation principale" footer={FOOTER_HOME}>

      <Intro>
        <h1>Je construis le back-office et les outils internes de HomeExchange.</h1>
        <p>
          Je conçois avec les utilisateurs finaux, j&rsquo;écris des specs au plus près du
          code et j&rsquo;accompagne les décisions d&rsquo;architecture, technique et produit.
          Je tiens mes roadmaps, et l&rsquo;impact de chaque projet est chiffré.
        </p>
        <CvLine>
          <a href="/Daniel_Assayag_CV.pdf">Télécharger le CV (PDF)</a>
          <a href="/cv">CV complet en ligne</a>
        </CvLine>
      </Intro>

      <Section id="apercu" eyebrow="Histoires">
        <StoryLinks stories={STORIES} />
        <CvLine>
          <a href="/travail">La méthode et les repères chiffrés →</a>
        </CvLine>
      </Section>

      <Outro eyebrow="Travailler ensemble" cta="Écrivez-moi">
        Si vous avez besoin de tracer une vision pour embrayer une migration,
        d&rsquo;avoir de l&rsquo;impact sur ce qui est livré et de tenir les timelines de vos
        ambitions, écrivez-moi.
      </Outro>

    </Page>
  )
}
