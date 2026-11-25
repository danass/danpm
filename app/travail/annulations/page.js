import StoryPage from '@/app/components/edito/StoryPage'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'Cancellations · Daniel Assayag',
  description:
    "Automating the replacement search after a host cancellation at HomeExchange.",
  ...langMeta('en', '/travail/annulations'),
}

export default function Cancellations() {
  return (
    <StoryPage
      lang="en"
      slug="annulations"
      tag={<>Cancellations</>}
      title={<>Automating the replacement search after a cancellation</>}
      stat={{ value: <>~7,000 h</>, label: <>of agent time a year, measured (6,120 to 8,050)</> }}
    >
      <p>
        When a host cancels a stay, an agent helps the member find another home: they log
        into the member&rsquo;s account, redo the search and write to hosts one by one,
        on the member&rsquo;s behalf. Tens of thousands of host cancellations a year,
        about 11,300 cases with a real search, 34 minutes of measured agent time per
        case. And the flow&rsquo;s worst satisfaction score falls to 58.7% when the
        proposed replacement is turned down.
      </p>
      <p>
        I sized the problem by cross-referencing support data with internal data, and
        found the bottleneck: how many hosts get contacted, and how fast. So I specified
        a multi-filter search wired to the internal engine, and bulk messages sent in
        HomeExchange&rsquo;s name rather than the member&rsquo;s: today, hundreds of
        thousands of messages a year are written by agents from a member&rsquo;s account.
        The cancellation case is now created automatically; the replacement search will
        start from that case.
      </p>
      <p>
        I co-lead the topic with our designer, based on interviews with agents.
        Automating the search alone would already free ~2,500 hours a year; the goal is
        contacting hosts by the dozen in one action, without anyone having to enter a
        member&rsquo;s account.
      </p>
    </StoryPage>
  )
}
