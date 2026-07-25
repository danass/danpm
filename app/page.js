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
            Les trois histoires qui suivent viennent de mes notes de semaine, pas
            d&rsquo;une plaquette.
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
            <h2>Le mois où 14 500 arnaques sont arrivées d&rsquo;un coup</h2>
            <div className="stat">
              <b>0</b>
              <span>embauche nécessaire pour absorber l&rsquo;attaque</span>
            </div>
            <p className="kicker">
              Une attaque de fraude massive, c&rsquo;est le genre d&rsquo;événement qui met une
              équipe support à genoux. La nôtre n&rsquo;a rien senti.
            </p>
            <p>
              Des arnaqueurs contactent nos membres pour les attirer hors de la plateforme.
              Pendant longtemps, la défense a tenu sur une personne : à peu près 1 500 messages
              d&rsquo;alerte par mois, envoyés à la main, et un cas sur trois couvert. On a pris
              le problème à l&rsquo;envers : détecter et alerter automatiquement, et regarder
              chaque semaine ce que la machine absorbait à notre place.
            </p>
            <p>
              En mai, une attaque comme on n&rsquo;en avait jamais vue est tombée : 14 500 cas
              en quelques jours. Le système a tout encaissé. Pas d&rsquo;heures sup, personne
              laissé sans réponse. La direction a repris ces chiffres dans son dossier
              investisseurs.
            </p>
            <p>
              La suite est moins spectaculaire mais plus délicate : déplacer ce système vers
              notre nouvelle architecture pendant qu&rsquo;il tourne. La règle, posée en réunion,
              tient en une phrase : les fraudeurs ne prennent pas de vacances, donc la bascule
              se fera sans interruption.
            </p>
          </article>

          <article className="story">
            <p className="tag">Back-office</p>
            <h2>Reconstruire l&rsquo;avion en plein vol, avec deux développeurs</h2>
            <div className="stat">
              <b>8,3<small>/10</small></b>
              <span>satisfaction interne, contre 6,2 avant</span>
            </div>
            <p className="kicker">
              Cinq millions de comptes, 200 personnes dedans huit heures par jour, et
              interdiction d&rsquo;arrêter la machine pour la remplacer.
            </p>
            <p>
              À mon arrivée, le back-office était l&rsquo;outil que tout le monde subissait :
              lent, incomplet, impossible à faire évoluer. Personne ne se battait pour reprendre
              ce chantier, parce qu&rsquo;il fallait le mener sans jamais bloquer le support, les
              ventes ni le marketing, qui vivaient dedans.
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
            <h2>Cinq minutes d&rsquo;humain, 380 fois par mois</h2>
            <div className="stat">
              <b>28 j-h</b>
              <span>rendus au support chaque année</span>
            </div>
            <p className="kicker">
              Les meilleurs sujets produit ne sont pas dans la roadmap. Ils sont dans les gestes
              que le support répète sans se plaindre.
            </p>
            <p>
              Rembourser une adhésion, c&rsquo;était cinq étapes : ouvrir la console de paiement,
              désactiver l&rsquo;abonnement, retirer les points, noter le cas dans un tableur,
              répondre au ticket. Cinq minutes d&rsquo;attention humaine, 380 fois par mois, avec
              les erreurs qui vont avec.
            </p>
            <p>
              J&rsquo;ai regardé les équipes support faire, chiffré ce que ça coûtait, puis
              spécifié un bouton qui fait tout d&rsquo;un coup, avec les garde-fous qu&rsquo;exige
              un acte d&rsquo;argent : seuls les bons rôles le voient, et on sait toujours qui a
              remboursé quoi. Six semaines entre la demande et la mise en production.
            </p>
            <p>
              C&rsquo;est ça, pour moi, le métier : un problème mesuré, une solution livrée vite,
              une trace propre.
            </p>
          </article>
        </section>

        <section id="methode">
          <p className="eyebrow">Méthode</p>

          <article className="story">
            <h2>Ma mémoire est un système, pas un effort</h2>
            <p className="kicker">
              Un PM d&rsquo;opérations voit passer des centaines de sujets par semaine. La
              question n&rsquo;est pas de tout retenir : c&rsquo;est de ne rien laisser mourir.
            </p>
            <p>
              Chaque vendredi, un compte-rendu reconstitue ce que l&rsquo;équipe a livré :
              décisions, chiffres, incidents, sujets ouverts. Des agents IA que j&rsquo;ai
              configurés compilent nos conversations, nos tickets, notre code et les
              transcriptions de réunions en un document daté. Un sujet ouvert y revient de
              semaine en semaine, jusqu&rsquo;à sa résolution. Les histoires de cette page
              sortent de là.
            </p>
            <p>Et quand un geste revient trop souvent, j&rsquo;en fais un outil :</p>
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
            Si vous cherchez un product manager qui préfère un problème mesuré à une roadmap
            théorique, qui livre en semaines plutôt qu&rsquo;en trimestres, et qui ouvre le code
            quand ça va plus vite : parlons-nous.
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
