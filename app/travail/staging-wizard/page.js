import StoryPage from '@/app/components/edito/StoryPage'
import { Shot } from '@/app/components/edito/Story'

export const metadata = {
  title: 'StagingWizard · Daniel Assayag',
  description:
    "Genèse et mécanique de StagingWizard, l'outil interne que j'ai codé pour créer un compte de test HomeExchange complet en 15 secondes au lieu de 5 minutes.",
}

export default function StagingWizard() {
  return (
    <StoryPage
      tag={<>Outils internes</>}
      title={<>Créer un compte de test HomeExchange complet en 15 secondes</>}
      stat={{ value: <>5 min → 15 s</>, label: <>pour un compte de test complet et configuré</> }}
    >
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

      <Shot src="/travail/staging-wizard-identity.png" alt="Interface de StagingWizard : liste des modules, étapes planifiées et formulaire du module Identité" width={1400} height={875}>
          Les modules à cocher, les étapes que le scénario va exécuter, et le formulaire
          du module Identité — projet, numéro de scénario, nom et email dérivés
          automatiquement.
        </Shot>

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

      <Shot src="/travail/staging-wizard-modules.png" alt="Modules Entité légale, Moyen de paiement et Abonnement activés dans StagingWizard" width={1400} height={875}>
          Entité légale, moyen de paiement et abonnement activés&nbsp;: le compte sera
          rattaché à l&rsquo;entité légale française, avec un abonnement actif créé sans
          appel à Stripe.
        </Shot>

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
    </StoryPage>
  )
}
