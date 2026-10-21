import './editorial.css'
import ContactTrigger from './components/EditorialContact'

export const metadata = {
  title: 'Daniel Assayag · Product Manager',
  description:
    "Product manager de la squad Operations chez HomeExchange. Back-office, outils internes, anti-fraude, automatisation du support.",
  openGraph: {
    title: 'Daniel Assayag · Product Manager',
    description:
      "Je construis le back-office et les outils internes de HomeExchange.",
    type: 'profile',
    locale: 'fr_FR',
  },
}

export default function Home() {
  return (
    <div className="edito">
      <div className="page">

        <header className="top">
          <span className="name">Daniel Assayag</span>
          <nav aria-label="Navigation principale">
            <a href="/">Accueil</a>
            <a href="/travail">Travail</a>
            <a href="/cv">CV</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="intro">
          <h1>Je construis le back-office et les outils internes de HomeExchange.</h1>
          <p>
            Je conçois avec les utilisateurs finaux, j&rsquo;écris des specs au plus près du
            code et j&rsquo;accompagne les décisions d&rsquo;architecture, technique et produit.
            Je tiens mes roadmaps, et l&rsquo;impact de chaque projet est chiffré dans les
            histoires ci-dessous.
          </p>
          <p className="cvline">
            <a href="/Daniel_Assayag_CV.pdf">Télécharger le CV (PDF)</a>
            <a href="/cv">CV complet en ligne</a>
          </p>
        </div>

        <section id="apercu">
          <p className="eyebrow">Histoires</p>
          <ul className="story-links">
            <li>
              <a href="/travail/anti-fraude">
                <span className="tag">Anti-fraude</span>
                Automatiser la réponse à la fraude une semaine avant la plus grosse vague de scam
              </a>
            </li>
            <li>
              <a href="/travail/back-office">
                <span className="tag">Back-office</span>
                Reconstruire le back-office pendant que 200 agents l&rsquo;utilisent
              </a>
            </li>
            <li>
              <a href="/travail/support">
                <span className="tag">Support</span>
                Ramener un remboursement de neuf minutes à un clic
              </a>
            </li>
            <li>
              <a href="/travail/annulations">
                <span className="tag">Annulations</span>
                Automatiser la recherche de remplacement après une annulation
              </a>
            </li>
            <li>
              <a href="/travail/clubs">
                <span className="tag">Clubs</span>
                Réparer l&rsquo;adhésion aux clubs, puis outiller leur gestion
              </a>
            </li>
            <li>
              <a href="/travail/litiges">
                <span className="tag">Litiges</span>
                Reprendre le Resolution Center, développé par un prestataire externe
              </a>
            </li>
            <li>
              <a href="/travail/acces-rgpd">
                <span className="tag">Accès &amp; RGPD</span>
                Remettre de l&rsquo;ordre dans les rôles et les accès du back-office
              </a>
            </li>
            <li>
              <a href="/travail/staging-wizard">
                <span className="tag">Outils internes</span>
                Créer un compte de test HomeExchange complet en 15 secondes
              </a>
            </li>
          </ul>
          <p className="cvline">
            <a href="/travail">La méthode et les repères chiffrés →</a>
          </p>
        </section>

        <section className="outro">
          <p className="eyebrow">Travailler ensemble</p>
          <p>
            Si vous avez un back-office qui ralentit vos équipes ou du support à automatiser,
            écrivez-moi.
          </p>
          <ContactTrigger className="cta" label="Écrivez-moi" />
        </section>

        <footer id="contact">
          <ContactTrigger className="as-link" label="Me contacter" />
          <a href="https://linkedin.com/in/daniel-assayag" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/danass" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>Paris</span>
        </footer>

      </div>
    </div>
  )
}
