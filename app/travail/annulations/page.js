import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'Annulations · Daniel Assayag',
  description:
    "Automatiser la recherche de remplacement après une annulation d'hôte chez HomeExchange.",
}

export default function Annulations() {
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
            <p className="tag">Annulations</p>
            <h2>Automatiser la recherche de remplacement après une annulation</h2>
            <div className="stat">
              <b>3 500 h</b>
              <span>de temps agent par an sur ces recherches</span>
            </div>
            <p>
              Quand un hôte annule un séjour, un agent aide le membre à retrouver un logement :
              il se connecte au compte du membre, refait la recherche et écrit aux hôtes un par
              un, à sa place. Environ 7 000 tickets par an, 3 500 heures de temps agent, quatre
              jours de résolution médiane. Et le pire résultat du support quand personne ne
              répond : 18 % des cas se terminent sans réponse, avec la satisfaction la plus
              basse de toutes les catégories.
            </p>
            <p>
              J&rsquo;ai chiffré le problème en croisant les données support et les données
              internes, et identifié le goulot : pas le jugement de l&rsquo;agent, la portée et
              la vitesse de la prise de contact. La solution : une recherche multi-filtres
              branchée sur le moteur interne, et des messages envoyés en masse au nom de
              HomeExchange, plus au nom du membre. Le dossier d&rsquo;annulation se crée
              automatiquement ; la recherche de remplacement se lance depuis ce dossier.
            </p>
            <p>
              Je co-pilote le sujet avec notre designer, à partir d&rsquo;entretiens menés avec
              les agents. La prise de contact passe d&rsquo;un hôte à la fois à des dizaines en
              une action, et plus personne n&rsquo;a à se connecter au compte d&rsquo;un membre.
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
