import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'Accès & RGPD · Daniel Assayag',
  description:
    "Remettre de l'ordre dans les rôles et les accès du back-office HomeExchange.",
}

export default function AccesRgpd() {
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
            <p className="tag">Accès &amp; RGPD</p>
            <h2>Remettre de l&rsquo;ordre dans les rôles et les accès du back-office</h2>
            <p>
              Avec un accompagnement RGPD, j&rsquo;ai fait évoluer le contrôle d&rsquo;accès du
              back-office vers un modèle par rôle : plusieurs rôles possibles par compte, un
              prérequis technique en place sur toute la chaîne d&rsquo;authentification depuis
              juillet.
            </p>
            <p>
              Les droits par fonctionnalité sont en place : le bouton de remboursement
              n&rsquo;est visible que des rôles autorisés. Les rôles sont attribués par paires à
              l&rsquo;arrivée de chaque agent, et la liste des comptes a été nettoyée : accès des
              prestataires partis supprimés, revue complète triée par dernière connexion.
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
