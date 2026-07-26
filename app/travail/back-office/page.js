import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'Back-office · Daniel Assayag',
  description:
    "Reconstruire le back-office HomeExchange page par page, sans jamais l'arrêter, avec deux développeurs.",
}

export default function BackOffice() {
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
            <p className="tag">Back-office</p>
            <h2>Reconstruire le back-office sans jamais l&rsquo;arrêter</h2>
            <div className="stat">
              <b>8,3<small>/10</small></b>
              <span>satisfaction interne, contre 6,2 avant</span>
            </div>
            <p>
              349 personnes du support, des ventes et du marketing l&rsquo;ont utilisé sur les
              trente derniers jours, 125 chaque jour ouvré, pour gérer les comptes de plusieurs
              millions de membres &mdash; la moindre erreur pendant une refonte se répercute à
              cette échelle. L&rsquo;ancien outil était lent, incomplet et impossible à faire
              évoluer. Il fallait le remplacer sans jamais bloquer les équipes qui
              l&rsquo;utilisaient.
            </p>
            <p>
              Avec deux développeurs, on l&rsquo;a remplacé page par page : 340 tickets,
              12 pages, des agents recrutés comme bêta-testeurs et leurs retours branchés
              directement sur nos tickets. La satisfaction interne est passée de 6,2 à 8,3
              sur 10. Surtout, l&rsquo;outil est redevenu une base saine : c&rsquo;est là que
              chaque nouvelle automatisation s&rsquo;installe, avec des accès réglés rôle par
              rôle, cadrés avec un cabinet spécialisé RGPD.
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
