import StoryPage from '@/app/components/edito/StoryPage'

export const metadata = {
  title: 'Annulations · Daniel Assayag',
  description:
    "Automatiser la recherche de remplacement après une annulation d'hôte chez HomeExchange.",
}

export default function Annulations() {
  return (
    <StoryPage
      tag={<>Annulations</>}
      title={<>Automatiser la recherche de remplacement après une annulation</>}
      stat={{ value: <>~7&nbsp;000 h</>, label: <>de temps agent par an, mesuré (6&nbsp;120 à 8&nbsp;050)</> }}
    >
      <p>
        Quand un hôte annule un séjour, un agent aide le membre à retrouver un logement :
        il se connecte au compte du membre, refait la recherche et écrit aux hôtes un par
        un, à sa place. Des dizaines de milliers d&rsquo;annulations d&rsquo;hôte par an, environ
        11&nbsp;300 cas avec une vraie recherche, 34 minutes de temps agent mesuré par
        cas. Et la pire note de satisfaction du flux tombe à 58,7 % quand le remplacement
        proposé est refusé.
      </p>
      <p>
        J&rsquo;ai chiffré le problème en croisant les données support et les données
        internes, et identifié le goulot : le nombre d&rsquo;hôtes contactés et la
        vitesse de la prise de contact. J&rsquo;ai donc spécifié une recherche
        multi-filtres branchée sur le moteur interne, et des messages envoyés en masse
        au nom de HomeExchange plutôt qu&rsquo;au nom du membre : aujourd&rsquo;hui,
        des centaines de milliers de messages par an sont écrits par des agents depuis le compte
        d&rsquo;un membre. Le dossier d&rsquo;annulation se crée automatiquement ; la
        recherche de remplacement se lancera depuis ce dossier.
      </p>
      <p>
        Je co-pilote le sujet avec notre designer, à partir d&rsquo;entretiens menés avec
        les agents. Automatiser la seule recherche libérerait déjà ~2&nbsp;500 heures par
        an ; l&rsquo;objectif est la prise de contact par dizaines en une action, sans que
        personne n&rsquo;ait à entrer dans le compte d&rsquo;un membre.
      </p>
    </StoryPage>
  )
}
