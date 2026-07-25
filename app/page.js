import './editorial.css'

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
            Chez HomeExchange, 200 personnes ouvrent chaque matin un outil dont on ne parle
            jamais : le back-office. C&rsquo;est mon produit. Mon travail : repérer là où
            l&rsquo;entreprise perd du temps, de l&rsquo;argent ou la confiance de ses membres,
            et régler le problème. <b>Parfois j&rsquo;écris les specs, parfois j&rsquo;écris le code.</b>
          </p>
          <p>
            Les histoires qui suivent sont tirées de mes comptes-rendus de semaine.
            Les chiffres sont réels.
          </p>
          <p className="cvline">
            <a href="/Daniel_Assayag_CV.pdf">Télécharger le CV (PDF)</a>
            <a href="/cv">Version interactive</a>
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
              d&rsquo;alerte par mois, à la main, et environ un tiers des cas était couvert.
              J&rsquo;ai fait automatiser la détection et l&rsquo;alerte de bout en bout, puis
              suivi chaque semaine le volume traité par le système.
            </p>
            <p>
              En mai 2026, une vague de scam d&rsquo;une ampleur inédite a visé nos membres :
              14 500 tentatives en quelques jours. Le système les a détectées et mitigées
              automatiquement : messages d&rsquo;alerte envoyés, comptes bloqués, conversations
              traitées. L&rsquo;équipe support n&rsquo;a pas eu besoin de renfort. La direction a
              repris ces chiffres dans son dossier investisseurs.
            </p>
            <p>
              Je pilote maintenant la migration de ce système vers notre nouvelle architecture,
              pendant qu&rsquo;il tourne. La contrainte fixée en réunion d&rsquo;architecture :
              aucune interruption de service pendant la bascule, parce que les attaques ne
              s&rsquo;arrêtent pas.
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
              Le back-office gère 5 millions de comptes. 200 personnes du support, des ventes et
              du marketing y travaillent chaque jour. L&rsquo;ancien outil était lent, incomplet
              et impossible à faire évoluer. Il fallait le remplacer sans jamais bloquer les
              équipes qui l&rsquo;utilisaient.
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
              J&rsquo;ai observé les équipes support, chiffré le coût de ce geste, puis spécifié
              un bouton qui exécute tout d&rsquo;un coup, avec les garde-fous nécessaires pour un
              acte de paiement : seuls les rôles autorisés le voient, et chaque remboursement est
              tracé avec son auteur. Six semaines entre la demande du support et la mise en
              production.
            </p>
          </article>
        </section>

        <section id="methode">
          <p className="eyebrow">Méthode</p>

          <article className="story">
            <h2>Comment je travaille</h2>
            <p>
              Des centaines de sujets passent chaque semaine : bugs, demandes, décisions,
              incidents. Chaque vendredi, un compte-rendu reconstitue ce que l&rsquo;équipe a
              livré. Des agents IA que j&rsquo;ai configurés compilent nos conversations, nos
              tickets, notre code et les transcriptions de réunions en un document daté. Un
              sujet ouvert y revient de semaine en semaine, jusqu&rsquo;à sa résolution. Les
              histoires de cette page sortent de là.
            </p>
            <p>
              J&rsquo;ai la codebase de l&rsquo;entreprise clonée en local. J&rsquo;écris mes
              spécifications à partir du code réel, pas de suppositions : je vérifie ce qui
              existe, je pointe les fichiers concernés, et les tickets arrivent aux développeurs
              déjà cadrés. Quand une idée mérite d&rsquo;être testée, je code d&rsquo;abord un
              prototype. Et chaque fonctionnalité livrée dans le back-office embarque un suivi
              d&rsquo;usage et des droits limités aux bons rôles.
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
            </ul>
          </article>
        </section>

        <section id="reperes">
          <p className="eyebrow">Repères</p>
          <dl>
            <div><dt>Comptes gérés par le back-office</dt><dd>5 millions</dd></div>
            <div><dt>Utilisateurs internes quotidiens</dt><dd>200</dd></div>
            <div><dt>Tickets livrés depuis février 2025</dt><dd>340+</dd></div>
            <div><dt>Couverture automatique des cas de fraude</dt><dd>~100 % (contre ~30 %)</dd></div>
            <div><dt>Messages d&rsquo;alerte manuels par mois</dt><dd>1 500 → quasi zéro</dd></div>
            <div><dt>Résolution médiane des litiges</dt><dd>1,1 jour</dd></div>
          </dl>
        </section>

        <section className="outro">
          <p className="eyebrow">Travailler ensemble</p>
          <p>
            Vous cherchez un product manager qui mesure les problèmes avant de les résoudre,
            qui livre en semaines, et qui ouvre le code quand c&rsquo;est plus rapide ?
            Écrivez-moi.
          </p>
          <a className="cta" href="mailto:dan@danpm.com">Écrivez-moi · dan@danpm.com</a>
        </section>

        <footer id="contact">
          <a href="mailto:dan@danpm.com">dan@danpm.com</a>
          <a href="https://linkedin.com/in/daniel-assayag" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/danass" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>Paris</span>
        </footer>

      </div>
    </div>
  )
}
