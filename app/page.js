import './editorial.css'
import ContactTrigger from './components/EditorialContact'

export const metadata = {
  title: 'Daniel Assayag · Product Manager',
  description:
    "Product manager de la squad Operations chez HomeExchange. Back-office, outils internes, anti-fraude, automatisation du support.",
  openGraph: {
    title: 'Daniel Assayag · Product Manager',
    description:
      "Je construis les outils qui font tourner HomeExchange en coulisses.",
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
          <h1>Je construis les outils qui font tourner HomeExchange en coulisses.</h1>
          <p>
            Chez HomeExchange, 125 personnes ouvrent chaque jour ouvré un outil dont on ne parle
            jamais : le back-office. 349 l&rsquo;ont utilisé sur les trente derniers jours.
            C&rsquo;est mon produit. Mon travail : repérer là où l&rsquo;entreprise perd du
            temps, de l&rsquo;argent ou la confiance de ses membres, et régler le problème.
            <b> Parfois j&rsquo;écris les specs, parfois j&rsquo;écris le code.</b>
          </p>
          <p className="cvline">
            <a href="/Daniel_Assayag_CV.pdf">Télécharger le CV (PDF)</a>
            <a href="/cv">CV complet en ligne</a>
          </p>
        </div>

        <section id="apercu">
          <p className="eyebrow">Ce qui s&rsquo;est vraiment passé</p>
          <ul className="story-links">
            <li>
              <a href="/travail/anti-fraude">
                <span className="tag">Anti-fraude</span>
                Automatiser la réponse à la fraude, avant la plus grosse vague que la plateforme ait connue
              </a>
            </li>
            <li>
              <a href="/travail/back-office">
                <span className="tag">Back-office</span>
                Reconstruire le back-office sans jamais l&rsquo;arrêter
              </a>
            </li>
            <li>
              <a href="/travail/support">
                <span className="tag">Support</span>
                Automatiser un remboursement qui prenait cinq minutes, 380 fois par mois
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
          </ul>
          <p className="cvline">
            <a href="/travail">Ce qui a été livré, et la méthode →</a>
          </p>
        </section>

        <section className="outro">
          <p className="eyebrow">Travailler ensemble</p>
          <p>
            Vous cherchez un product manager qui mesure les problèmes avant de les résoudre,
            qui livre en semaines, et qui ouvre le code quand c&rsquo;est plus rapide ?
            Écrivez-moi.
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
