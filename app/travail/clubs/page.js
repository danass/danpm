import StoryPage from '@/app/components/edito/StoryPage'

export const metadata = {
  title: 'Clubs · Daniel Assayag',
  description:
    "Réparer l'adhésion aux clubs HomeExchange, puis outiller leur gestion.",
}

export default function Clubs() {
  return (
    <StoryPage
      tag={<>Clubs</>}
      title={<>Réparer l&rsquo;adhésion aux clubs, puis outiller leur gestion</>}
      stat={{ value: <>86</>, label: <>clubs, des centaines de milliers d&rsquo;adhésions en base</> }}
    >
      <p>
        HomeExchange héberge des clubs de membres. Un bug empêchait de les rejoindre ;
        j&rsquo;ai identifié la cause : le cookie d&rsquo;inscription était posé sur un
        domaine, la connexion se faisait sur un autre, l&rsquo;adhésion ne se finalisait
        jamais. Nous avons reconstruit le parcours : vérification d&rsquo;éligibilité
        par email avec un lien à usage unique, connexion, confirmation, points de
        bienvenue. Les membres peuvent à nouveau rejoindre un club.
      </p>
      <p>
        En parallèle, nous avons fait de la gestion des clubs un écran du back-office :
        créer, modifier, traduire en 11 langues, convertir un club en groupe, supprimer
        avec export des membres. Avant, chaque création de club était une demande faite aux
        développeurs ; le marketing lance maintenant ses tests de partenariats en
        autonomie. Sur la gouvernance, j&rsquo;ai préparé et animé une session
        d&rsquo;alignement réunissant toutes les équipes, conclue par une décision :
        pas de refonte cette année, des itérations courtes, un nettoyage de la base, et
        une discovery financée pour la suite.
      </p>
    </StoryPage>
  )
}
