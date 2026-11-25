import StoryPage from '@/app/components/edito/StoryPage'
import { Shot } from '@/app/components/edito/Story'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'StagingWizard · Daniel Assayag',
  description:
    "How StagingWizard came about and how it works: the internal tool I coded to create a complete HomeExchange test account in 15 seconds instead of 5 minutes.",
  ...langMeta('en', '/travail/staging-wizard'),
}

export default function StagingWizard() {
  return (
    <StoryPage
      lang="en"
      slug="staging-wizard"
      tag={<>Internal tools</>}
      title={<>Creating a complete HomeExchange test account in 15 seconds</>}
      stat={{ value: <>5 min → 15 s</>, label: <>for a complete, configured test account</> }}
    >
      <p>
        I test every shipped ticket on its branch&rsquo;s environment, with the account
        that fits the scenario of the day: a fresh account for a sign-up flow, an account
        with a live home and an active subscription for a back-office feature, a pair of
        accounts to test an exchange. Rebuilding that account by hand (sign-up, email
        verification, filling in the home, activating a subscription) took about five
        minutes, several times a day. In mid-March, I started coding StagingWizard to get
        rid of that task.
      </p>
      <p>
        The tool exposes modules you switch on as needed: identity, home (with several
        instances, each with its own description, photos and availability), legal
        entity, payment method, subscription, exchange. You pick the combination the
        day&rsquo;s ticket needs and the tool runs the full scenario against staging:
        BFF, back-office and Auth0.
      </p>

      <Shot src="/travail/staging-wizard-identity.png" alt="StagingWizard interface: list of modules, planned steps and the Identity module form" width={1400} height={875}>
          The modules to tick, the steps the scenario will run, and the Identity module
          form: project, scenario number, and a name and email derived automatically.
        </Shot>

      <p>
        Each scenario becomes about twenty steps declared in a single file, as a
        dependency graph: account creation, Auth0 sync, email verification, getting a
        user token, then onboarding, home, subscription and exchange in parallel. Steps
        that write to the same account run in sequence; those that touch independent
        services run in parallel. Login happens as a back-office administrator, who
        exchanges their token for a test-account token through Auth0, so there is never a
        password to type by hand. The subscription is created for free with an internal
        100% coupon, without calling Stripe.
      </p>

      <Shot src="/travail/staging-wizard-modules.png" alt="Legal entity, Payment method and Subscription modules switched on in StagingWizard" width={1400} height={875}>
          Legal entity, payment method and subscription switched on: the account will be
          attached to the French legal entity, with an active subscription created
          without calling Stripe.
        </Shot>

      <p>
        Coded from mid-March, alone on the product side; a developer on the team wired up
        the infrastructure (Terraform, CI/CD, deployment to staging). The prototype ran
        on SQLite; it moved to DynamoDB, then into Docker. A rewrite in April introduced
        the current step engine and impersonation-based authentication. Then two
        workstreams in parallel. Speed: running independent steps in parallel, running
        onboarding while the home is being written. Security, once the tool was used by
        more than just me: restricting it to staging, moving secrets out of the code,
        isolating its cookies from other HomeExchange applications.
      </p>
      <p>
        A full scenario (account, home, subscription) runs in 15 seconds instead of five
        minutes of clicking. In a week of testing several tickets a day, it was the task
        that came up most often, and the first one I got rid of.
      </p>
    </StoryPage>
  )
}
