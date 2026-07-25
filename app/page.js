import './editorial.css'
import ContactTrigger from './components/EditorialContact'

export const metadata = {
  title: 'Daniel Assayag · Product Manager',
  description:
    "Product manager de la squad Operations chez HomeExchange. Back-office, outils internes, anti-fraude, automatisation du support. Trois histoires tirées de mes notes de semaine.",
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
            <a href="#travail">Travail</a>
            <a href="#methode">Méthode</a>
            <a href="#reperes">Repères</a>
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
          <p>
            Les histoires qui suivent sont tirées de mes comptes-rendus de semaine.
            Les chiffres sont réels.
          </p>
          <p className="cvline">
            <a href="/Daniel_Assayag_CV.pdf">Télécharger le CV (PDF)</a>
            <a href="/cv">CV complet en ligne</a>
          </p>
        </div>

        <section id="travail">
          <p className="eyebrow">Trois histoires</p>

          <article className="story">
            <p className="tag">Anti-fraude</p>
            <h2>En mai, les membres ont reçu 14 500 tentatives de scam. Toutes ont été mitigées automatiquement.</h2>
            <div className="stat">
              <b>14 500</b>
              <span>tentatives de scam mitigées pendant la vague de mai</span>
            </div>
            <p>
              Des fraudeurs contactent nos membres pour les faire payer hors de la plateforme.
              Avant l&rsquo;automatisation, un agent envoyait environ 1 500 messages
              d&rsquo;alerte par mois, à la main. Un tiers des cas était couvert, et ce
              traitement représentait environ 3 250 heures de travail par an. J&rsquo;ai fait
              automatiser la chaîne complète : quand un agent marque un compte comme frauduleux,
              le système alerte tous les membres en contact, bloque le compte, retire ses
              annonces et invalide ses sessions.
            </p>
            <p>
              La mise en production a eu lieu fin avril. Une semaine plus tard, la plus grosse
              vague de scam que la plateforme ait connue a frappé : 14 500 tentatives reçues par
              les membres. En dix jours, le système a déclenché 13 407 traitements automatiques
              et envoyé 44 278 messages d&rsquo;alerte. L&rsquo;équipe support n&rsquo;a pas eu
              besoin de renfort. La direction a repris ces chiffres dans son dossier
              investisseurs.
            </p>
            <p>
              Je pilote maintenant la migration de ce système vers notre nouvelle architecture,
              pendant qu&rsquo;il tourne : la première partie est migrée et démontrée en interne.
              La contrainte fixée en réunion d&rsquo;architecture : aucune interruption de
              service pendant la bascule, parce que les attaques ne s&rsquo;arrêtent pas.
            </p>
          </article>

          <article className="story">
            <p className="tag">Back-office</p>
            <h2>Reconstruire le back-office sans jamais l&rsquo;arrêter</h2>
            <div className="stat">
              <b>8,3<small>/10</small></b>
              <span>satisfaction interne, contre 6,2 avant</span>
            </div>
            <p>
              Le back-office gère 5 millions de comptes. 349 personnes du support, des ventes et
              du marketing l&rsquo;ont utilisé sur les trente derniers jours, 125 chaque jour
              ouvré. L&rsquo;ancien outil était lent, incomplet et impossible à faire évoluer.
              Il fallait le remplacer sans jamais bloquer les équipes qui l&rsquo;utilisaient.
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
              support chaque année. Les tickets ont été écrits depuis l&rsquo;analyse du code
              existant ; le développement a démarré trois jours après.
            </p>
          </article>

          <article className="story">
            <p className="tag">Clubs</p>
            <h2>Réparer l&rsquo;adhésion aux clubs, puis outiller leur gestion</h2>
            <div className="stat">
              <b>58 000</b>
              <span>membres dans le plus grand club</span>
            </div>
            <p>
              HomeExchange héberge des clubs de membres, dont certains très gros. Un bug
              empêchait les membres de rejoindre un club. J&rsquo;ai identifié la cause : le
              cookie d&rsquo;inscription était posé sur un domaine, la connexion se faisait sur
              un autre, l&rsquo;adhésion ne se finalisait jamais. Nous avons reconstruit le
              parcours : vérification d&rsquo;éligibilité par email avec un lien à usage unique,
              connexion, confirmation, points de bienvenue. Les membres peuvent à nouveau
              rejoindre un club.
            </p>
            <p>
              En parallèle, la gestion des clubs est devenue un écran du back-office : créer,
              modifier, traduire en 11 langues, convertir un club en groupe, supprimer avec
              export des membres. Avant, chaque création de club était une demande faite aux
              développeurs. Sur la gouvernance, j&rsquo;ai préparé et animé une session
              d&rsquo;alignement avec 22 participants de toutes les équipes. Décision : pas de
              refonte cette année, des itérations courtes, un nettoyage de la base, et une
              discovery financée pour la suite.
            </p>
          </article>

          <article className="story">
            <p className="tag">Litiges</p>
            <h2>Reprendre le Resolution Center, développé par un prestataire externe</h2>
            <div className="stat">
              <b>1,13 j</b>
              <span>résolution médiane des litiges en juin</span>
            </div>
            <p>
              Le Resolution Center gère les litiges et les garanties de dépôt entre membres. Il
              a été développé par un prestataire externe dont la mission se termine. J&rsquo;ai
              repris le domaine : suivi des indicateurs mensuels, arbitrage des demandes,
              coordination de la fin de contrat, passage en mode maintenance.
            </p>
            <p>
              En juin : 1 456 litiges traités, 86 % de satisfaction, 1,13 jour de résolution
              médiane, le meilleur niveau depuis le lancement. J&rsquo;ai aussi fait aboutir la
              création automatique d&rsquo;un dossier de litige quand un hôte annule un séjour :
              l&rsquo;équipe support n&rsquo;a plus à le créer à la main.
            </p>
          </article>

          <article className="story">
            <p className="tag">Accès &amp; RGPD</p>
            <h2>327 comptes internes avaient un accès complet au back-office</h2>
            <div className="stat">
              <b>327</b>
              <span>comptes à accès complet identifiés par l&rsquo;audit</span>
            </div>
            <p>
              Un audit mené avec un cabinet spécialisé RGPD a établi que 327 collaborateurs
              disposaient d&rsquo;un accès complet au back-office, quel que soit leur métier.
              J&rsquo;ai pris le sujet. Le prérequis technique, permettre plusieurs rôles par
              compte, a été livré en juillet sur toute la chaîne d&rsquo;authentification.
            </p>
            <p>
              Le programme est lancé : des droits par fonctionnalité (le bouton de remboursement
              n&rsquo;est visible que des rôles autorisés), une règle d&rsquo;attribution
              systématique à l&rsquo;arrivée d&rsquo;un agent, et le nettoyage de la liste des
              comptes : accès des prestataires partis supprimés, revue complète triée par
              dernière connexion.
            </p>
          </article>
        </section>

        <section id="livre">
          <p className="eyebrow">Livré entre avril et juillet 2026</p>

          <article className="story">
            <p>
              113 tickets livrés en quinze semaines, une quarantaine de fonctionnalités, avec
              deux développeurs. Les principales, par domaine :
            </p>

            <div className="feat-group">
              <h3>Anti-fraude</h3>
              <ul>
                <li>Traitement d&rsquo;un compte frauduleux en un clic : alertes à tous les membres en contact, blocage, retrait des annonces, sessions invalidées</li>
                <li>Relance possible après une attaque sans jamais envoyer deux fois le même message</li>
                <li>Alerte renforcée sur les ajouts massifs de points</li>
              </ul>
            </div>

            <div className="feat-group">
              <h3>Comptes membres</h3>
              <ul>
                <li>Motif obligatoire et tracé à la désactivation d&rsquo;un compte</li>
                <li>Statut CRM visible sur la fiche membre, resynchronisation automatique à la réactivation</li>
                <li>Chaque action d&rsquo;un agent sur un abonnement est enregistrée avec son auteur</li>
              </ul>
            </div>

            <div className="feat-group">
              <h3>GuestPoints (la monnaie interne)</h3>
              <ul>
                <li>Valeur par nuit éditable directement, sans passer par un développeur</li>
                <li>Import en masse sécurisé : prévisualisation, erreurs bloquantes, import par email</li>
              </ul>
            </div>

            <div className="feat-group">
              <h3>Photos et annonces</h3>
              <ul>
                <li>Export des photos originales d&rsquo;un logement en un clic (avant : un ticket développeur avec VPN et scripts)</li>
                <li>Suppression de toutes les photos en une action, plein écran en qualité maximale</li>
              </ul>
            </div>

            <div className="feat-group">
              <h3>Support</h3>
              <ul>
                <li>Remboursement d&rsquo;une adhésion en une action, tracé et limité aux rôles autorisés</li>
                <li>Taux de réponse expliqué : les agents voient la décomposition du calcul et peuvent répondre aux membres</li>
                <li>Contenu des étiquettes visible au survol : trois clics économisés, des centaines de fois par jour</li>
              </ul>
            </div>

            <div className="feat-group">
              <h3>Qualité</h3>
              <ul>
                <li>Infrastructure de tests unitaires du back-office, huit chantiers</li>
                <li>Plan de mesure d&rsquo;usage complet : chaque fonctionnalité livrée est suivie</li>
              </ul>
            </div>
          </article>
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
              livré. Des agents IA que j&rsquo;ai configurés compilent nos conversations, nos
              tickets, notre code et les transcriptions de réunions en un document daté. Un
              sujet ouvert y revient de semaine en semaine, jusqu&rsquo;à sa résolution. Les
              histoires de cette page sortent de là.
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
            <div><dt>Comptes gérés par le back-office</dt><dd>5 millions</dd></div>
            <div><dt>Utilisateurs internes du back-office</dt><dd>125 par jour ouvré, 349 sur 30 jours</dd></div>
            <div><dt>Tickets clos depuis février 2025</dt><dd>441, dont 30 epics</dd></div>
            <div><dt>Couverture automatique des cas de fraude</dt><dd>~100 % (contre ~30 %)</dd></div>
            <div><dt>Temps de traitement manuel de la fraude économisé</dt><dd>~3 250 heures par an</dd></div>
            <div><dt>Alertes anti-fraude envoyées automatiquement aux membres (vague de mai)</dt><dd>44 278 en dix jours</dd></div>
            <div><dt>Satisfaction interne du back-office</dt><dd>8,3/10, contre 6,2 avant</dd></div>
          </dl>
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
