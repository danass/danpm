import StoryPage from '@/app/components/edito/StoryPage'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'Disputes · Daniel Assayag',
  description:
    "Taking over the HomeExchange Resolution Center, built by an external vendor.",
  ...langMeta('en', '/travail/litiges'),
}

export default function Disputes() {
  return (
    <StoryPage
      lang="en"
      slug="litiges"
      tag={<>Disputes</>}
      title={<>Taking over the Resolution Center, built by an external vendor</>}
      stat={{ value: <>86%</>, label: <>member satisfaction on disputes in June</> }}
    >
      <p>
        The Resolution Center handles disputes and deposit guarantees between members,
        from the back-office, connected to Zendesk. Its second phase replaced the Google
        Sheet where incidents used to live: incidents and compensations are managed in
        the tool, including exchanges with members and the finance team.
      </p>
      <p>
        The tool had been built by an external vendor whose engagement was ending; I took
        over the domain: monthly metrics, request arbitration, coordinating the end of
        the contract, moving to maintenance mode. Member satisfaction held at 86% in
        June, and Resolution Center payouts run at ~230 a month. I also shipped automatic
        case creation when a host cancels a stay: the support team no longer has to
        create it by hand.
      </p>
    </StoryPage>
  )
}
