import StoryPage from '@/app/components/edito/StoryPage'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'Support · Daniel Assayag',
  description:
    "Turning a nine-minute refund into one click, at HomeExchange.",
  ...langMeta('en', '/travail/support'),
}

export default function Support() {
  return (
    <StoryPage
      lang="en"
      slug="support"
      tag={<>Support</>}
      title={<>Turning a nine-minute refund into one click</>}
      stat={{ value: <>625 h</>, label: <>of support work a year at stake on this single task</> }}
    >
      <p>
        Refunding a membership takes five manual steps: open the payment console,
        deactivate the subscription, remove the points, log the case in a spreadsheet,
        reply to the ticket. The reported time was five minutes per case. I measured it,
        ticket by ticket, from Zendesk and back-office traces: nine minutes on average,
        ~376 cases a month, and 87% of refunds carried out by five people.
      </p>
      <p>
        I put a cost on the task (about 625 hours a year for 14-day refunds alone, ~1,150
        across all reasons), then specified the button that does it all in one action:
        refund on the payment platform, subscription deactivation, points reversal, reply
        to the member. Only authorized roles will see it, and every refund will be logged
        with its author. The tickets were written from an analysis of the existing code;
        the payment endpoint was coded in under a day, and V1 is currently shipping.
      </p>
    </StoryPage>
  )
}
