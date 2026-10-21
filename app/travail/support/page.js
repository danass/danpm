import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'Support · Daniel Assayag',
  description:
    "Ramener un remboursement de neuf minutes à un clic, chez HomeExchange.",
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
            <h2>Ramener un remboursement de neuf minutes à un clic</h2>
            <div className="stat">
              <b>625 h</b>
              <span>de travail support par an en jeu sur ce seul geste</span>
            </div>
            <p>
              Rembourser une adhésion demande cinq étapes manuelles : ouvrir la console de
              paiement, désactiver l&rsquo;abonnement, retirer les points, noter le cas dans un
              tableur, répondre au ticket. Le temps déclaré était de cinq minutes par cas.
              Je l&rsquo;ai mesuré, ticket par ticket, sur les traces Zendesk et back-office :
              neuf minutes en moyenne, ~376 cas par mois, et 87 % des remboursements exécutés
              par cinq personnes.
            </p>
            <p>
              J&rsquo;ai chiffré le coût du geste (environ 625 heures par an sur le seul
              périmètre des remboursements à 14 jours, ~1&nbsp;150 tous motifs confondus), puis
              spécifié le bouton qui exécute tout en une action : remboursement sur la
              plateforme de paiement, désactivation de l&rsquo;abonnement, reprise des points,
              réponse au membre. Seuls les rôles autorisés le verront, et chaque remboursement
              sera tracé avec son auteur. Les tickets ont été écrits depuis l&rsquo;analyse du
              code existant ; l&rsquo;endpoint de paiement a été codé en moins d&rsquo;une
              journée, et la V1 est en cours de livraison.
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
