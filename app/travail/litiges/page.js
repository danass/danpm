import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'Litiges · Daniel Assayag',
  description:
    "Reprendre le Resolution Center HomeExchange, développé par un prestataire externe.",
}

export default function Litiges() {
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
            <p className="tag">Litiges</p>
            <h2>Reprendre le Resolution Center, développé par un prestataire externe</h2>
            <div className="stat">
              <b>1 456</b>
              <span>litiges gérés dans l&rsquo;outil en juin</span>
            </div>
            <p>
              Le Resolution Center gère les litiges et les garanties de dépôt entre membres. Sa
              deuxième phase a remplacé le Google Sheet des incidents : la gestion des incidents
              et des compensations se fait depuis le back-office, connectée à Zendesk, y compris
              les échanges avec les membres et l&rsquo;équipe finance.
            </p>
            <p>
              L&rsquo;outil a été développé par un prestataire externe dont la mission se
              termine : j&rsquo;ai repris le domaine. Suivi des indicateurs mensuels, arbitrage
              des demandes, coordination de la fin de contrat, passage en mode maintenance. En
              juin, 1 456 litiges y ont été traités, avec 86 % de satisfaction. J&rsquo;ai aussi
              fait aboutir la création automatique d&rsquo;un dossier quand un hôte annule un
              séjour : l&rsquo;équipe support n&rsquo;a plus à le créer à la main.
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
