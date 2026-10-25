import StoryPage from '@/app/components/edito/StoryPage'

export const metadata = {
  title: 'Litiges · Daniel Assayag',
  description:
    "Reprendre le Resolution Center HomeExchange, développé par un prestataire externe.",
}

export default function Litiges() {
  return (
    <StoryPage
      tag={<>Litiges</>}
      title={<>Reprendre le Resolution Center, développé par un prestataire externe</>}
      stat={{ value: <>86 %</>, label: <>de satisfaction membre sur les litiges en juin</> }}
    >
      <p>
        Le Resolution Center gère les litiges et les garanties de dépôt entre membres,
        depuis le back-office, connecté à Zendesk. Sa deuxième phase a remplacé le
        Google Sheet où vivaient les incidents : incidents et compensations se gèrent
        dans l&rsquo;outil, échanges avec les membres et l&rsquo;équipe finance compris.
      </p>
      <p>
        L&rsquo;outil avait été développé par un prestataire externe dont la mission se
        terminait ; j&rsquo;ai repris le domaine : indicateurs mensuels, arbitrage des
        demandes, coordination de la fin de contrat, passage en mode maintenance. La
        satisfaction membre tient à 86 % en juin, et les virements du Resolution Center
        tournent à ~230 par mois. J&rsquo;ai aussi livré la création automatique
        d&rsquo;un dossier quand un hôte annule un séjour : l&rsquo;équipe support
        n&rsquo;a plus à le créer à la main.
      </p>
    </StoryPage>
  )
}
