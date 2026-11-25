import StoryPage from '@/app/components/edito/StoryPage'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'Access & GDPR · Daniel Assayag',
  description:
    "Bringing order to roles and access in the HomeExchange back-office.",
  ...langMeta('en', '/travail/acces-rgpd'),
}

export default function AccessGdpr() {
  return (
    <StoryPage
      lang="en"
      slug="acces-rgpd"
      tag={<>Access &amp; GDPR</>}
      title={<>Bringing order to back-office roles and access</>}
    >
      <p>
        With a specialist GDPR firm, I moved back-office access control to a role-based
        model: an account can hold several roles, and the whole authentication chain
        supports it.
      </p>
      <p>
        Rights are set feature by feature: the first sensitive actions are gated in the
        interface, the rest is specified and in development. Roles are assigned as soon
        as each agent arrives, and the account list was cleaned up: access for departed
        contractors removed, a full review sorted by last login.
      </p>
    </StoryPage>
  )
}
