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
