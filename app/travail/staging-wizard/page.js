import Image from 'next/image'
import '../../editorial.css'
import ContactTrigger from '../../components/EditorialContact'

export const metadata = {
  title: 'StagingWizard · Daniel Assayag',
  description:
    "Genèse et mécanique de StagingWizard, l'outil interne que j'ai codé pour créer un compte de test HomeExchange complet en 15 secondes au lieu de 5 minutes.",
}

export default function StagingWizard() {
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
            <p className="tag">Outils internes</p>
            <h2>Créer un compte de test HomeExchange complet en 15 secondes</h2>
            <div className="stat">
              <b>5 min → 15 s</b>
              <span>pour un compte de test complet et configuré</span>
            </div>
            <p>
              Je teste chaque ticket livré sur l&rsquo;environnement de sa branche, avec le
              compte qui correspond au scénario du jour&nbsp;: un compte neuf pour un parcours
              d&rsquo;inscription, un compte avec un logement en ligne et un abonnement actif
              pour une fonctionnalité back-office, une paire de comptes pour tester un échange.
              Reconstruire ce compte à la main (inscription, vérification d&rsquo;email,
              remplissage du logement, activation d&rsquo;un abonnement) prenait environ cinq
              minutes, plusieurs fois par jour. À la mi-mars, j&rsquo;ai commencé à coder
              StagingWizard pour supprimer ce geste.
            </p>
            <p>
              L&rsquo;outil expose des modules qu&rsquo;on active à la carte&nbsp;: identité,
              logement (avec plusieurs instances, chacune sa description, ses photos, ses
              disponibilités), entité légale, moyen de paiement, abonnement, échange. On choisit
              la combinaison utile au ticket du jour et l&rsquo;outil déroule le scénario
              complet contre le staging&nbsp;: BFF, back-office et Auth0.
            </p>

            <figure className="shot">
              <Image
                src="/travail/staging-wizard-identity.png"
                alt="Interface de StagingWizard : liste des modules, étapes planifiées et formulaire du module Identité"
                width={1400}
                height={875}
              />
              <figcaption>
                Les modules à cocher, les étapes que le scénario va exécuter, et le formulaire
                du module Identité — projet, numéro de scénario, nom et email dérivés
                automatiquement.
              </figcaption>
            </figure>

            <p>
              Chaque scénario se traduit en une vingtaine d&rsquo;étapes déclarées dans un seul
              fichier, sous forme de graphe de dépendances&nbsp;: création du compte,
              synchronisation Auth0, vérification d&rsquo;email, obtention d&rsquo;un jeton
              utilisateur, puis en parallèle l&rsquo;onboarding, le logement, l&rsquo;abonnement,
              l&rsquo;échange. Les étapes qui écrivent sur le même compte s&rsquo;exécutent en
              série&nbsp;; celles qui touchent des services indépendants tournent en parallèle.
              La connexion se fait en tant qu&rsquo;administrateur back-office, qui échange son
              jeton contre un jeton du compte de test via Auth0 — jamais de mot de passe à
              saisir à la main. L&rsquo;abonnement est créé gratuitement via un coupon interne à
              100&nbsp;%, sans appel à Stripe.
            </p>

            <figure className="shot">
              <Image
                src="/travail/staging-wizard-modules.png"
                alt="Modules Entité légale, Moyen de paiement et Abonnement activés dans StagingWizard"
                width={1400}
                height={875}
              />
              <figcaption>
                Entité légale, moyen de paiement et abonnement activés&nbsp;: le compte sera
                rattaché à l&rsquo;entité légale française, avec un abonnement actif créé sans
                appel à Stripe.
              </figcaption>
            </figure>

            <p>
              Codé à partir de mi-mars, seul sur la partie produit&nbsp;; un développeur de
              l&rsquo;équipe a branché l&rsquo;infrastructure (Terraform, CI/CD, déploiement sur
              le staging). Le prototype tournait sur SQLite&nbsp;; il est passé sur DynamoDB,
              puis dans Docker. Une réécriture en avril a introduit le moteur d&rsquo;étapes
              actuel et l&rsquo;authentification par impersonation. Ensuite, deux chantiers en
              parallèle. La vitesse&nbsp;: paralléliser les étapes indépendantes, faire tourner
              l&rsquo;onboarding pendant que le logement s&rsquo;écrit. La sécurité, une fois
              l&rsquo;outil sorti de mon seul usage&nbsp;: le cantonner au staging, sortir les
              secrets du code, isoler ses cookies des autres applications HomeExchange.
            </p>
            <p>
              Un scénario complet (compte, logement, abonnement) se joue en 15 secondes au
              lieu de cinq minutes de clics. Sur une semaine à tester plusieurs tickets par
              jour, c&rsquo;est le geste qui revenait le plus souvent, et celui que
              j&rsquo;ai supprimé en premier.
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
