import StoryPage from '@/app/components/edito/StoryPage'

export const metadata = {
  title: 'Anti-fraude · Daniel Assayag',
  description:
    "Automatiser la réponse à la fraude chez HomeExchange, une semaine avant la plus grosse vague de scam que la plateforme ait connue.",
}

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
      <p>
        La mise en production a eu lieu fin avril. Une semaine plus tard, la vague a
        frappé : ~15&nbsp;000 tickets côté support. Neuf scammers traités sur dix
        l&rsquo;ont été sans qu&rsquo;un agent les déclenche, et ~45&nbsp;000 messages
        d&rsquo;alerte sont partis automatiquement dans le mois. Les alertes envoyées à
        la main sont passées d&rsquo;environ 1&nbsp;900 à une cinquantaine par mois.
      </p>
      <p>
        J&rsquo;ai ensuite piloté la migration de ce système vers notre nouvelle
        architecture, pendant qu&rsquo;il tournait, avec une contrainte fixée en comité
        technique : aucune interruption de service.
      </p>
    </StoryPage>
  )
}
