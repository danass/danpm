import '../editorial.css'
import ContactTrigger from '../components/EditorialContact'

export const metadata = {
  title: 'Travail · Daniel Assayag',
  description:
    "Ce qui s'est vraiment passé chez HomeExchange, tiré de mes comptes-rendus de semaine : anti-fraude, refonte du back-office, automatisation du support. Et la méthode derrière.",
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
          <h1>Ce qui s&rsquo;est vraiment passé.</h1>
        </div>

        <section id="travail">
          <p className="eyebrow">Histoires</p>
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
        </section>

        <section id="methode">
          <p className="eyebrow">Méthode</p>

          <article className="story">
            <h2>Comment je travaille</h2>
            <p>
              Le process d&rsquo;équipe est réduit au minimum : un daily hybride, une
              rétrospective toutes les six semaines, le reste en asynchrone (Looms, écrits,
              canaux dédiés). Le temps de réunion va à la livraison : la roadmap trimestrielle
              est régulièrement dépassée, et les sujets ajoutés en cours de route sont livrés
              eux aussi.
            </p>
            <p>
              Des centaines de sujets passent chaque semaine : bugs, demandes, décisions,
              incidents. Chaque vendredi, un compte-rendu reconstitue ce que l&rsquo;équipe a
              livré, généré par un système que j&rsquo;ai construit moi-même : des agents
              Claude Code, un par étape du process produit (cadrage, idéation, spec, ticket,
              plan de tracking, revue de code), qui compilent nos conversations,
              nos tickets, notre code et les transcriptions de réunions en un document daté. Un
              sujet ouvert y revient de semaine en semaine, jusqu&rsquo;à sa résolution. Les
              histoires de cette page sortent de là.
            </p>
            <p>
              Ce qui est livré aux agents est documenté pour les agents : un inventaire des
              fonctionnalités du back-office, et une FAQ en vidéos courtes, classées par thème
              (bloquer un compte et tracer le motif, éditer un échange, gérer les coupons).
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
            <p>
              Les gains que j&rsquo;annonce suivent la même discipline. Chaque chiffre porte
              son statut : mesuré (une sortie d&rsquo;outil), modélisé (un volume mesuré
              multiplié par un temps unitaire), ou hypothèse posée pour être contestée. Et le
              bilan d&rsquo;impact garde en face les contre-métriques à ne pas dégrader en
              automatisant, et les contre-exemples : les demandes encore ouvertes y figurent
              aussi.
            </p>
            <p>Quand un geste revient trop souvent, j&rsquo;en fais un outil :</p>
            <ul className="tools">
              <li>
                <span className="what">Créer un compte de test complet</span>
                <span className="gain">5 min → 15 s</span>
              </li>
              <li>
                <span className="what">Collecter et suivre les retours des 200 agents, reliés aux tickets</span>
                <span className="gain">≈ 50 tickets traités</span>
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
            <div><dt>Utilisateurs internes du back-office</dt><dd>125 par jour ouvré, 349 sur 30 jours</dd></div>
            <div><dt>Tickets clos depuis février 2025</dt><dd>441, dont 30 epics</dd></div>
            <div><dt>Marquage des comptes frauduleux, déclencheur du traitement automatique</dt><dd>~100 %, contre ~30 % quand il ne déclenchait rien</dd></div>
            <div><dt>Messages d&rsquo;alerte anti-fraude envoyés à la main</dt><dd>~1 500 par mois → 0 depuis mai</dd></div>
            <div><dt>Temps rendu par les automatisations livrées en 2026</dt><dd>1 600 à 1 900 heures par an sur bases explicites, jusqu&rsquo;à ~3 400 en comptant la friction d&rsquo;interface, pas encore instrumentée</dd></div>
            <div><dt>Alertes anti-fraude envoyées automatiquement aux membres (vague de mai)</dt><dd>44 278 en dix jours</dd></div>
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
