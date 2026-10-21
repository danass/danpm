import '../editorial.css'
import ContactTrigger from '../components/EditorialContact'

export const metadata = {
  title: 'Travail · Daniel Assayag',
  description:
    "Huit histoires tirées de mes comptes-rendus de semaine chez HomeExchange : anti-fraude, refonte du back-office, automatisation du support. Et la méthode.",
}

export default function Travail() {
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
          <h1>Et au quotidien, ça ressemble à ça.</h1>
        </div>

        <section id="travail">
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
        </section>

        <section id="methode">
          <p className="eyebrow">Méthode</p>

          <article className="story">
            <h2>Comment je travaille</h2>
            <p>
              Le process d&rsquo;équipe est réduit au minimum : un daily hybride, une
              rétrospective toutes les six semaines, le reste en asynchrone (Looms, écrits,
              canaux dédiés).
            </p>
            <p>
              Chaque vendredi, un compte-rendu reconstitue ce que l&rsquo;équipe a livré dans
              la semaine : bugs, demandes, décisions, incidents. Il est généré par un système
              que j&rsquo;ai construit : des agents Claude Code, un par étape du process
              produit (cadrage, idéation, spec, ticket, plan de tracking, revue de code), qui
              compilent nos conversations, nos tickets, notre code et les transcriptions de
              réunions en un document daté. Un sujet ouvert y revient de semaine en semaine,
              jusqu&rsquo;à sa résolution. Les histoires de cette page en sortent.
            </p>
            <p>
              Chaque livraison destinée aux agents du support est documentée pour eux : un
              inventaire des fonctionnalités du back-office, et une FAQ en vidéos courtes,
              classées par thème (bloquer un compte et tracer le motif, éditer un échange,
              gérer les coupons).
            </p>
            <p>
              Les repos du back-office, de l&rsquo;API et de la couche d&rsquo;accès sont clonés
              en local. Avant de rédiger un ticket, je lis le code : chaque règle métier que
              j&rsquo;annonce est vérifiée dans le source, et les tickets arrivent aux
              développeurs déjà cadrés, avec le suivi d&rsquo;usage et les droits d&rsquo;accès
              exigés dès la spécification. Sur les sujets incertains, je code d&rsquo;abord un
              prototype branché sur des données réelles : le pré-remplissage d&rsquo;annonce et
              la page de recherche ont existé en prototype avant d&rsquo;être spécifiés.
            </p>
            <p>
              Je teste chaque ticket livré sur l&rsquo;environnement de test de sa branche, le
              ticket et le code ouverts à côté, et je décris les anomalies au timestamp près
              depuis un enregistrement d&rsquo;écran. Pour les chiffres, je construis mes
              requêtes SQL sur les schémas réels des tables, et je ne retiens un résultat que
              quand deux sources concordent.
            </p>
            <p>Quand un geste revient trop souvent, j&rsquo;en fais un outil :</p>
            <ul className="tools">
              <li>
                <a href="/travail/staging-wizard" className="what">Créer un compte de test complet</a>
                <span className="gain">5 min → 15 s</span>
              </li>
              <li>
                <span className="what">Collecter et suivre les retours des 200 agents, reliés aux tickets</span>
                <span className="gain">55 remontées, 43 corrigées</span>
              </li>
              <li>
                <span className="what">Compiler le compte-rendu hebdomadaire</span>
                <span className="gain">10 sources → 1 document</span>
              </li>
              <li>
                <span className="what">Prévenir les agents concernés par un changement, depuis les données d&rsquo;usage</span>
                <span className="gain">1 commande</span>
              </li>
              <li>
                <span className="what">Traiter en masse une liste de comptes frauduleux</span>
                <span className="gain">utilisé pendant la vague de mai</span>
              </li>
              <li>
                <span className="what">Chiffrer les gains d&rsquo;une automatisation avant de la lancer (heures, euros, scénarios)</span>
                <span className="gain">1 page interactive</span>
              </li>
              <li>
                <span className="what">Suivre en direct la satisfaction et les demandes des agents, branché sur Slack</span>
                <span className="gain">1 tableau de bord</span>
              </li>
              <li>
                <span className="what">Déclencher une pull request automatique depuis un ticket étiqueté « ai-ready »</span>
                <span className="gain">du ticket à la PR</span>
              </li>
              <li>
                <span className="what">Mesurer l&rsquo;adoption des outils IA de l&rsquo;équipe produit</span>
                <span className="gain">1 dashboard</span>
              </li>
            </ul>
          </article>
        </section>

        <section id="reperes">
          <p className="eyebrow">Repères</p>
          <dl>
            <div><dt>Comptes gérés par le back-office</dt><dd>plusieurs millions</dd></div>
            <div><dt>Agents ayant ouvert le back-office sur un mois</dt><dd>213 (518 utilisateurs uniques)</dd></div>
            <div><dt>Tickets clos sur les projets de la squad (sept. 2025 → juil. 2026)</dt><dd>432</dd></div>
            <div><dt>Couverture du tag scammer</dt><dd>~30 % → ~100 %</dd></div>
            <div><dt>Heures d&rsquo;agent économisées par l&rsquo;automatisation scam en 2026</dt><dd>~844, dont 722 pendant la vague</dd></div>
            <div><dt>Messages d&rsquo;alerte scam envoyés pendant le mois de la vague</dt><dd>~45&nbsp;000</dd></div>
            <div><dt>Satisfaction interne du back-office</dt><dd>8,3/10, contre 6,2 avant</dd></div>
          </dl>
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
