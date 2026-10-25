import StoryPage from '@/app/components/edito/StoryPage'

export const metadata = {
  title: 'Accès & RGPD · Daniel Assayag',
  description:
    "Remettre de l'ordre dans les rôles et les accès du back-office HomeExchange.",
}

export default function AccesRgpd() {
  return (
    <StoryPage
      tag={<>Accès &amp; RGPD</>}
      title={<>Remettre de l&rsquo;ordre dans les rôles et les accès du back-office</>}
    >
      <p>
        Accompagné d&rsquo;un cabinet spécialisé RGPD, j&rsquo;ai fait passer le
        contrôle d&rsquo;accès du back-office à un modèle par rôles : un compte peut
        cumuler plusieurs rôles, et toute la chaîne d&rsquo;authentification le supporte.
      </p>
      <p>
        Les droits se règlent fonctionnalité par fonctionnalité : les premières actions
        sensibles sont gatées côté interface, le reste est spécifié et en développement.
        Les rôles sont attribués dès l&rsquo;arrivée de chaque agent, et la liste des
        comptes a été nettoyée : accès des prestataires partis supprimés, revue complète
        triée par dernière connexion.
      </p>
    </StoryPage>
  )
}
