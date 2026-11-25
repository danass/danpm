import StoryPage from '@/app/components/edito/StoryPage'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'Clubs · Daniel Assayag',
  description:
    "Fixing HomeExchange club membership, then tooling club management.",
  ...langMeta('en', '/travail/clubs'),
}

export default function Clubs() {
  return (
    <StoryPage
      lang="en"
      slug="clubs"
      tag={<>Clubs</>}
      title={<>Fixing club membership, then tooling club management</>}
      stat={{ value: <>86</>, label: <>clubs, hundreds of thousands of memberships in the database</> }}
    >
      <p>
        HomeExchange hosts member clubs. A bug prevented people from joining them; I
        found the cause: the sign-up cookie was set on one domain, login happened on
        another, and the membership never completed. We rebuilt the flow: eligibility
        check by email with a single-use link, login, confirmation, welcome points.
        Members can join a club again.
      </p>
      <p>
        In parallel, we made club management a back-office screen: create, edit,
        translate into 11 languages, convert a club into a group, delete with a member
        export. Before, every new club was a request to the developers; marketing now
        runs its partnership tests on its own. On governance, I prepared and ran an
        alignment session with every team, which ended in a decision: no redesign this
        year, short iterations, a database cleanup, and a funded discovery for what
        comes next.
      </p>
    </StoryPage>
  )
}
