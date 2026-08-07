import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'Clubs · Daniel Assayag',
  description:
    "Réparer l'adhésion aux clubs HomeExchange, puis outiller leur gestion.",
}

export default function Clubs() {
  return (
    <div className="edito">
      <div className="page">

        <header className="top">
          <span className="name">Daniel Assayag</span>
          <nav aria-label="Navigation">
            <a href="/">Accueil</a>
            <a href="/travail">Travail</a>
            <a href="/cv">CV</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="intro">
          <p className="cvline"><a href="/travail">← Toutes les histoires</a></p>
        </div>

        <section>
          <article className="story">
            <p className="tag">Clubs</p>
            <h2>Réparer l&rsquo;adhésion aux clubs, puis outiller leur gestion</h2>
            <div className="stat">
              <b>58 000</b>
              <span>membres dans le plus grand club</span>
            </div>
            <p>
              HomeExchange héberge des clubs de membres, dont certains très gros. Un bug
              empêchait les membres de rejoindre un club. J&rsquo;ai identifié la cause : le
              cookie d&rsquo;inscription était posé sur un domaine, la connexion se faisait sur
              un autre, l&rsquo;adhésion ne se finalisait jamais. Nous avons reconstruit le
              parcours : vérification d&rsquo;éligibilité par email avec un lien à usage unique,
              connexion, confirmation, points de bienvenue. Les membres peuvent à nouveau
              rejoindre un club.
            </p>
            <p>
              En parallèle, nous avons fait de la gestion des clubs un écran du back-office :
              créer, modifier, traduire en 11 langues, convertir un club en groupe, supprimer
              avec export des membres. Avant, chaque création de club était une demande faite aux
              développeurs ; le marketing lance maintenant ses tests de partenariats en
              autonomie, et c&rsquo;est l&rsquo;une des livraisons présentées au webinaire
              d&rsquo;entreprise de juillet. Sur la gouvernance, j&rsquo;ai préparé et animé une
              session d&rsquo;alignement réunissant toutes les équipes. Décision :
              pas de refonte cette année, des itérations courtes, un nettoyage de la base, et
              une discovery financée pour la suite.
            </p>
          </article>
        </section>

        <footer id="contact">
          <ContactTrigger className="as-link" label="Me contacter" />
          <a href="/">danpm.com</a>
          <span>Paris</span>
        </footer>

      </div>
    </div>
  )
}
