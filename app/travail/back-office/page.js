import StoryPage from '@/app/components/edito/StoryPage'

export const metadata = {
  title: 'Back-office · Daniel Assayag',
  description:
    "Reconstruire le back-office HomeExchange page par page, pendant que 200 agents l'utilisent, avec deux développeurs.",
}

export default function BackOffice() {
  return (
    <StoryPage
      tag={<>Back-office</>}
      title={<>Reconstruire le back-office pendant que 200 agents l&rsquo;utilisent</>}
      stat={{ value: <>8,3<small>/10</small></>, label: <>satisfaction interne, contre 6,2 avant</> }}
    >
      <p>
        Plus de 200 agents l&rsquo;ouvrent chaque mois (518 utilisateurs uniques en
        septembre), pour gérer les comptes de plusieurs millions de membres.
        L&rsquo;ancien outil était lent, incomplet et impossible à faire évoluer. Il
        fallait le remplacer sans bloquer les équipes.
      </p>
      <p>
        Avec deux développeurs, on l&rsquo;a remplacé page par page, des agents recrutés
        comme bêta-testeurs et leurs retours branchés directement sur nos tickets. En
        trois mois, 26 fonctionnalités demandées par les agents ont été livrées, les
        signalements d&rsquo;anomalies sont passés de 35 par mois à moins de 2, et la
        satisfaction interne est montée de 6,2 à 8,3 sur 10. L&rsquo;outil peut de
        nouveau évoluer : chaque automatisation s&rsquo;y installe désormais, et le
        contrôle d&rsquo;accès par rôles, cadré avec un cabinet spécialisé RGPD, s&rsquo;y
        déploie fonctionnalité par fonctionnalité.
      </p>
    </StoryPage>
  )
}
