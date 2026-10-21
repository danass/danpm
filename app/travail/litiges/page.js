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
              <b>86 %</b>
              <span>de satisfaction membre sur les litiges en juin</span>
            </div>
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
