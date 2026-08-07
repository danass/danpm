import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'Support · Daniel Assayag',
  description:
    "Automatiser un remboursement qui prenait cinq minutes, 380 fois par mois, chez HomeExchange.",
}

export default function Support() {
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
            <p className="tag">Support</p>
            <h2>Automatiser un remboursement qui prenait cinq minutes, 380 fois par mois</h2>
            <div className="stat">
              <b>28 j-h</b>
              <span>rendus au support chaque année</span>
            </div>
            <p>
              Rembourser une adhésion demandait cinq étapes manuelles : ouvrir la console de
              paiement, désactiver l&rsquo;abonnement, retirer les points, noter le cas dans un
              tableur, répondre au ticket. Cinq minutes par cas, 380 cas par mois, avec des
              erreurs régulières.
            </p>
            <p>
              J&rsquo;ai observé les équipes support, chiffré le coût du geste, puis spécifié le
              bouton qui exécute tout en une action : remboursement sur la plateforme de
              paiement, désactivation de l&rsquo;abonnement, reprise des points, réponse au
              membre. Seuls les rôles autorisés le voient, chaque remboursement est tracé avec
              son auteur. Deux minutes par cas au lieu de cinq : 28 jours-homme rendus au
              support chaque année. J&rsquo;ai écrit les tickets depuis l&rsquo;analyse du code
              existant ; quatre jours plus tard, les premiers remboursements passaient sur
              Stripe et PayPal.
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
