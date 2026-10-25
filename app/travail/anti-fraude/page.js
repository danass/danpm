import StoryPage from '@/app/components/edito/StoryPage'
import { Figure, Figures, Serie, Barres, Cote, Parts } from '@/app/components/edito/Charts'

export const metadata = {
  title: 'Anti-fraude · Daniel Assayag',
  description:
    "Automatiser la réponse à la fraude chez HomeExchange, une semaine avant la plus grosse vague de scam que la plateforme ait connue.",
}

// Les séries viennent du registre KPI de la squad. Chaque figure dit si elle
// est mesurée (sortie d'outil) ou modélisée (volume mesuré × temps estimé).

// SCAM-01 : alertes envoyées à la main. ~1 900/mois en moyenne jusqu'en avril
// 2026, ~55/mois depuis juin. On trace les deux paliers, pas des mois inventés.
const ALERTES = [
  { x: 0.00, y: 1900 }, { x: 0.74, y: 1900 },  // nov. 2024 → avril 2026
  { x: 0.80, y: 55 },   { x: 1.00, y: 55 },    // juin → sept. 2026
]

// SCAM-13 : tags scammer posés par mois. De 45 à 84 par mois d'oct. 2025 à
// mars 2026 (plage), puis 263, 144, 124, 103 de juin à sept. 2026.
const TAGS = [
  { label: 'juin', value: 263, mark: true },
  { label: 'juil.', value: 144, mark: true },
  { label: 'août', value: 124, mark: true },
  { label: 'sept.', value: 103, mark: true },
]

// SCAM-08 / SCAM-09 : 722 h sur le mois de la vague, ~11 h un mois normal.
const HEURES = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
  .map((label) => ({ label, value: label === 'mai' ? 722 : 11, mark: label === 'mai', note: label === 'mai' ? '722 h' : '' }))

export default function AntiFraude() {
  return (
    <StoryPage
      tag={<>Anti-fraude</>}
      title={<>Automatiser la réponse à la fraude une semaine avant la plus grosse vague de scam</>}
      stat={{ value: <>14&nbsp;538</>, label: <>scammers traités pendant la vague (avril-mai)</> }}
    >
      <p>
        Des fraudeurs contactent nos membres pour les faire payer hors de la plateforme.
        Avant l&rsquo;automatisation, les agents envoyaient environ 1&nbsp;900 messages
        d&rsquo;alerte par mois, à la main, et le tag scammer n&rsquo;était posé que sur
        environ 30 % des cas ; le process fraude complet pesait 13&nbsp;000 tickets et
        3&nbsp;250 heures par an. J&rsquo;ai spécifié l&rsquo;automatisation de la chaîne :
        quand un agent marque un compte comme frauduleux, le système alerte tous les
        membres en contact, bloque le compte, retire ses annonces et invalide ses
        sessions.
      </p>

      <Figure caption="Messages d’alerte envoyés à la main par les agents, par mois." status="mesuré">
        <Serie
          ariaLabel="Alertes manuelles par mois : environ 1 900 jusqu'en avril 2026, une cinquantaine depuis juin"
          points={ALERTES}
          event={{ x: 0.74, text: 'mise en production, fin avril' }}
          yLabels={[{ x: 0, y: 1900, text: '~1 900 / mois' }, { x: 1, y: 55, text: '~55 / mois', anchor: 'end' }]}
          labels={[{ x: 0, text: 'nov. 2024' }, { x: 1, text: 'sept. 2026' }]}
        />
      </Figure>

      <Figure caption="Part des comptes frauduleux qui portent le tag scammer, celui qui déclenche la chaîne." status="mesuré">
        <Cote
          ariaLabel="Couverture du tag scammer : environ 30 % avant, environ 100 % après"
          avant={{ label: 'AVANT', value: 30, text: '~30 %' }}
          apres={{ label: 'APRÈS', value: 100, text: '~100 %' }}
          delta="le tag devient le déclencheur"
        />
      </Figure>

      <p>
        La mise en production a eu lieu fin avril. Une semaine plus tard, la vague a
        frappé : ~15&nbsp;000 tickets côté support. Neuf scammers traités sur dix
        l&rsquo;ont été sans qu&rsquo;un agent les déclenche, et ~45&nbsp;000 messages
        d&rsquo;alerte sont partis automatiquement dans le mois. Les alertes envoyées à
        la main sont passées d&rsquo;environ 1&nbsp;900 à une cinquantaine par mois.
      </p>

      <Figures>
        <Figure caption="Sur 14 538 scammers traités pendant la vague, la part traitée sans qu’un agent déclenche quoi que ce soit." status="mesuré">
          <Parts ariaLabel="Neuf scammers sur dix traités automatiquement" total={10} filled={9} text="9 sur 10" sub="sans déclenchement par un agent" />
        </Figure>
        <Figure caption="Tags scammer posés par mois : une plage de 45 à 84 avant, puis chaque mois depuis juin 2026." status="mesuré">
          <Barres
            ariaLabel="Tags scammer posés par mois : entre 45 et 84 d'octobre 2025 à mars 2026, puis 263, 144, 124 et 103 de juin à septembre 2026"
            band={{ span: 3, min: 45, max: 84, text: '45 à 84', label: 'oct. 2025 → mars 2026' }}
            bars={TAGS}
          />
        </Figure>
      </Figures>

      <Figure caption="Heures d’agent rendues par l’automatisation, mois par mois en 2026 : 722 sur le mois de la vague, une dizaine les autres mois, 844 sur l’année." status="modélisé à partir des volumes mesurés">
        <Barres ariaLabel="Heures d'agent rendues par mois en 2026 : 722 en mai, environ 11 les autres mois" bars={HEURES} unit=" h" />
      </Figure>

      <p>
        J&rsquo;ai ensuite piloté la migration de ce système vers notre nouvelle
        architecture, pendant qu&rsquo;il tournait, avec une contrainte fixée en comité
        technique : aucune interruption de service.
      </p>
    </StoryPage>
  )
}
