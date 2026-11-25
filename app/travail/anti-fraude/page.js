import StoryPage from '@/app/components/edito/StoryPage'
import { Figure, Figures, Serie, Barres, Cote, Parts } from '@/app/components/edito/Charts'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'Fraud · Daniel Assayag',
  description:
    "Automating the fraud response at HomeExchange, one week before the biggest scam wave the platform had ever seen.",
  ...langMeta('en', '/travail/anti-fraude'),
}

// Mêmes séries que la version française (registre KPI : SCAM-01, SCAM-13,
// SCAM-08 / SCAM-09), seuls les libellés changent.
const ALERTS = [
  { x: 0.00, y: 1900 }, { x: 0.74, y: 1900 },  // Nov. 2024 → April 2026
  { x: 0.80, y: 55 },   { x: 1.00, y: 55 },    // June → Sept. 2026
]

const TAGS = [
  { label: 'June', value: 263, mark: true },
  { label: 'July', value: 144, mark: true },
  { label: 'Aug.', value: 124, mark: true },
  { label: 'Sept.', value: 103, mark: true },
]

const HOURS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
  .map((label) => ({ label, value: label === 'May' ? 722 : 11, mark: label === 'May', note: label === 'May' ? '722 h' : '' }))

export default function Fraud() {
  return (
    <StoryPage
      lang="en"
      slug="anti-fraude"
      tag={<>Fraud</>}
      title={<>Automating the fraud response one week before the biggest scam wave</>}
      stat={{ value: <>14,538</>, label: <>scammers handled during the wave (April-May)</> }}
    >
      <p>
        Fraudsters contact our members to get them to pay outside the platform. Before
        the automation, agents sent about 1,900 alert messages a month by hand, and the
        scammer tag was applied to only about 30% of cases; the full fraud process came
        to 13,000 tickets and 3,250 hours a year. I specified the automation of the whole
        chain: when an agent flags an account as fraudulent, the system alerts every
        member in contact with it, blocks the account, removes its listings and
        invalidates its sessions.
      </p>

      <Figure caption="Alert messages sent by hand by agents, per month." status="measured">
        <Serie
          ariaLabel="Manual alerts per month: about 1,900 until April 2026, around fifty since June"
          points={ALERTS}
          event={{ x: 0.74, text: 'release, late April' }}
          yLabels={[{ x: 0, y: 1900, text: '~1,900 / month' }, { x: 1, y: 55, text: '~55 / month', anchor: 'end' }]}
          labels={[{ x: 0, text: 'Nov. 2024' }, { x: 1, text: 'Sept. 2026' }]}
        />
      </Figure>

      <Figure caption="Share of fraudulent accounts carrying the scammer tag, the one that triggers the chain." status="measured">
        <Cote
          ariaLabel="Scammer tag coverage: about 30% before, about 100% after"
          avant={{ label: 'BEFORE', value: 30, text: '~30%' }}
          apres={{ label: 'AFTER', value: 100, text: '~100%' }}
          delta="the tag becomes the trigger"
        />
      </Figure>

      <p>
        The release went live at the end of April. A week later, the wave hit: ~15,000
        tickets on the support side. Nine out of ten scammers were handled without an
        agent triggering anything, and ~45,000 alert messages went out automatically
        that month. Alerts sent by hand dropped from about 1,900 to around fifty a month.
      </p>

      <Figures>
        <Figure caption="Of the 14,538 scammers handled during the wave, the share handled without an agent triggering anything." status="measured">
          <Parts ariaLabel="Nine scammers out of ten handled automatically" total={10} filled={9} text="9 in 10" sub="without an agent triggering it" />
        </Figure>
        <Figure caption="Scammer tags applied per month: a range of 45 to 84 before, then each month since June 2026." status="measured">
          <Barres
            ariaLabel="Scammer tags applied per month: between 45 and 84 from October 2025 to March 2026, then 263, 144, 124 and 103 from June to September 2026"
            band={{ span: 3, min: 45, max: 84, text: '45 to 84', label: 'Oct. 2025 → Mar. 2026' }}
            bars={TAGS}
          />
        </Figure>
      </Figures>

      <Figure caption="Agent hours returned by the automation, month by month in 2026: 722 in the month of the wave, about ten in other months, 844 over the year." status="modeled from measured volumes">
        <Barres ariaLabel="Agent hours returned per month in 2026: 722 in May, about 11 in other months" bars={HOURS} unit=" h" />
      </Figure>

      <p>
        I then led the migration of this system to our new architecture while it was
        running, under a constraint set in technical committee: no service interruption.
      </p>
    </StoryPage>
  )
}
