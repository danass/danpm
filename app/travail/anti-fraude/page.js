import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'Anti-fraude · Daniel Assayag',
  description:
    "Automatiser la réponse à la fraude chez HomeExchange, avant la plus grosse vague de scam que la plateforme ait connue.",
}

export default function AntiFraude() {
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
            <p className="tag">Anti-fraude</p>
            <h2>Automatiser la réponse à la fraude, avant la plus grosse vague que la plateforme ait connue</h2>
            <div className="stat">
              <b>14 500</b>
              <span>tentatives de scam mitigées pendant la vague de mai</span>
            </div>
            <p>
              Des fraudeurs contactent nos membres pour les faire payer hors de la plateforme.
              Avant l&rsquo;automatisation, un agent envoyait environ 1 500 messages
              d&rsquo;alerte par mois, à la main, plusieurs minutes ou heures après la
              détection ; et le marquage «&nbsp;fraudeur&nbsp;» du compte, qui ne déclenchait
              rien, n&rsquo;était posé que dans un tiers des cas. J&rsquo;ai fait automatiser la
              chaîne complète : quand un agent marque un compte comme frauduleux, le système
              alerte tous les membres en contact, bloque le compte, retire ses annonces et
              invalide ses sessions. Le marquage déclenchant désormais tout le reste, il est
              devenu systématique, et les membres exposés sont alertés en quelques secondes.
            </p>
            <p>
              La mise en production a eu lieu fin avril. Une semaine plus tard, la plus grosse
              vague de scam que la plateforme ait connue a frappé : 14 500 tentatives détectées.
              En dix jours, le système a déclenché 13 407 traitements automatiques
              et envoyé 44 278 messages d&rsquo;alerte. La direction a repris ces chiffres dans
              son dossier investisseurs, et l&rsquo;a résumé ainsi au webinaire d&rsquo;entreprise
              de juillet : «&nbsp;zéro travail manuel pendant l&rsquo;attaque&nbsp;». Depuis mai,
              plus aucun message d&rsquo;alerte n&rsquo;est parti à la main. En temps
              d&rsquo;agent rendu, le modèle calé sur les chiffres réels de mai donne environ
              840 heures sur 2026, dont l&rsquo;essentiel pendant l&rsquo;attaque, et environ
              130 heures sur une année sans vague.
            </p>
            <p>
              J&rsquo;ai ensuite piloté la migration de ce système vers notre nouvelle
              architecture, pendant qu&rsquo;il tournait, avec une contrainte fixée en comité
              technique : aucune interruption de service, parce que les attaques ne
              s&rsquo;arrêtent pas.
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
