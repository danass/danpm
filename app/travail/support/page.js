import StoryPage from '@/app/components/edito/StoryPage'

export const metadata = {
  title: 'Support · Daniel Assayag',
  description:
    "Ramener un remboursement de neuf minutes à un clic, chez HomeExchange.",
}

export default function Support() {
  return (
    <StoryPage
      tag={<>Support</>}
      title={<>Ramener un remboursement de neuf minutes à un clic</>}
      stat={{ value: <>625 h</>, label: <>de travail support par an en jeu sur ce seul geste</> }}
    >
      <p>
        Rembourser une adhésion demande cinq étapes manuelles : ouvrir la console de
        paiement, désactiver l&rsquo;abonnement, retirer les points, noter le cas dans un
        tableur, répondre au ticket. Le temps déclaré était de cinq minutes par cas.
        Je l&rsquo;ai mesuré, ticket par ticket, sur les traces Zendesk et back-office :
        neuf minutes en moyenne, ~376 cas par mois, et 87 % des remboursements exécutés
        par cinq personnes.
      </p>
      <p>
        J&rsquo;ai chiffré le coût du geste (environ 625 heures par an sur le seul
        périmètre des remboursements à 14 jours, ~1&nbsp;150 tous motifs confondus), puis
        spécifié le bouton qui exécute tout en une action : remboursement sur la
        plateforme de paiement, désactivation de l&rsquo;abonnement, reprise des points,
        réponse au membre. Seuls les rôles autorisés le verront, et chaque remboursement
        sera tracé avec son auteur. Les tickets ont été écrits depuis l&rsquo;analyse du
        code existant ; l&rsquo;endpoint de paiement a été codé en moins d&rsquo;une
        journée, et la V1 est en cours de livraison.
      </p>
    </StoryPage>
  )
}
