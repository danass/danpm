import Page from '@/app/components/edito/Page'
import { Intro, Section } from '@/app/components/edito/Blocks'
import { StoryLinks, Story, Tools, Facts } from '@/app/components/edito/Story'
import { STORIES } from '@/data/stories'

export const metadata = {
  title: 'Travail · Daniel Assayag',
  description:
    "Huit histoires tirées de mes comptes-rendus de semaine chez HomeExchange : anti-fraude, refonte du back-office, automatisation du support. Et la méthode.",
}

const TOOLS = [
  { href: '/travail/staging-wizard', what: 'Créer un compte de test complet', gain: '5 min → 15 s' },
  { what: 'Collecter et suivre les retours des 200 agents, reliés aux tickets', gain: '55 remontées, 43 corrigées' },
  { what: 'Compiler le compte-rendu hebdomadaire', gain: '10 sources → 1 document' },
  { what: 'Prévenir les agents concernés par un changement, depuis les données d’usage', gain: '1 commande' },
  { what: 'Traiter en masse une liste de comptes frauduleux', gain: 'utilisé pendant la vague de mai' },
  { what: 'Chiffrer les gains d’une automatisation avant de la lancer (heures, euros, scénarios)', gain: '1 page interactive' },
  { what: 'Suivre en direct la satisfaction et les demandes des agents, branché sur Slack', gain: '1 tableau de bord' },
  { what: 'Déclencher une pull request automatique depuis un ticket étiqueté « ai-ready »', gain: 'du ticket à la PR' },
  { what: 'Mesurer l’adoption des outils IA de l’équipe produit', gain: '1 dashboard' },
]

const FACTS = [
  { label: 'Comptes gérés par le back-office', value: 'plusieurs millions' },
  { label: 'Agents ayant ouvert le back-office sur un mois', value: '213 (518 utilisateurs uniques)' },
  { label: 'Tickets clos sur les projets de la squad (sept. 2025 → juil. 2026)', value: '432' },
  { label: 'Couverture du tag scammer', value: '~30 % → ~100 %' },
  { label: 'Heures d’agent économisées par l’automatisation scam en 2026', value: '~844, dont 722 pendant la vague' },
  { label: 'Messages d’alerte scam envoyés pendant le mois de la vague', value: '~45 000' },
  { label: 'Satisfaction interne du back-office', value: '8,3/10, contre 6,2 avant' },
]

export default function Travail() {
  return (
    <Page>

      <Intro>
        <h1>Et au quotidien, ça ressemble à ça.</h1>
      </Intro>

      <Section id="travail" eyebrow="Histoires">
        <StoryLinks stories={STORIES} />
      </Section>

      <Section id="methode" eyebrow="Méthode">
        <Story title="Comment je travaille">
          <p>
            Le process d&rsquo;équipe est réduit au minimum : un daily hybride, une
            rétrospective toutes les six semaines, le reste en asynchrone (Looms, écrits,
            canaux dédiés).
          </p>
          <p>
            Chaque vendredi, un compte-rendu reconstitue ce que l&rsquo;équipe a livré dans
            la semaine : bugs, demandes, décisions, incidents. Il est généré par un système
            que j&rsquo;ai construit : des agents Claude Code, un par étape du process
            produit (cadrage, idéation, spec, ticket, plan de tracking, revue de code), qui
            compilent nos conversations, nos tickets, notre code et les transcriptions de
            réunions en un document daté. Un sujet ouvert y revient de semaine en semaine,
            jusqu&rsquo;à sa résolution. Les histoires de cette page en sortent.
          </p>
          <p>
            Chaque livraison destinée aux agents du support est documentée pour eux : un
            inventaire des fonctionnalités du back-office, et une FAQ en vidéos courtes,
            classées par thème (bloquer un compte et tracer le motif, éditer un échange,
            gérer les coupons).
          </p>
          <p>
            Les repos du back-office, de l&rsquo;API et de la couche d&rsquo;accès sont clonés
            en local. Avant de rédiger un ticket, je lis le code : chaque règle métier que
            j&rsquo;annonce est vérifiée dans le source, et les tickets arrivent aux
            développeurs déjà cadrés, avec le suivi d&rsquo;usage et les droits d&rsquo;accès
            exigés dès la spécification. Sur les sujets incertains, je code d&rsquo;abord un
            prototype branché sur des données réelles : le pré-remplissage d&rsquo;annonce et
            la page de recherche ont existé en prototype avant d&rsquo;être spécifiés.
          </p>
          <p>
            Je teste chaque ticket livré sur l&rsquo;environnement de test de sa branche, le
            ticket et le code ouverts à côté, et je décris les anomalies au timestamp près
            depuis un enregistrement d&rsquo;écran. Pour les chiffres, je construis mes
            requêtes SQL sur les schémas réels des tables, et je ne retiens un résultat que
            quand deux sources concordent.
          </p>
          <p>Quand un geste revient trop souvent, j&rsquo;en fais un outil :</p>
          <Tools items={TOOLS} />
        </Story>
      </Section>

      <Section id="reperes" eyebrow="Repères">
        <Facts items={FACTS} />
      </Section>

    </Page>
  )
}
