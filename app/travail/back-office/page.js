import StoryPage from '@/app/components/edito/StoryPage'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'Back-office · Daniel Assayag',
  description:
    "Rebuilding the HomeExchange back-office page by page, while 200 agents use it, with two developers.",
  ...langMeta('en', '/travail/back-office'),
}

export default function BackOffice() {
  return (
    <StoryPage
      lang="en"
      slug="back-office"
      tag={<>Back-office</>}
      title={<>Rebuilding the back-office while 200 agents use it</>}
      stat={{ value: <>8.3<small>/10</small></>, label: <>internal satisfaction, up from 6.2</> }}
    >
      <p>
        More than 200 agents open it every month (518 unique users in September) to
        manage member accounts. The old tool was slow, incomplete and impossible to
        evolve. It had to be replaced without blocking the teams.
      </p>
      <p>
        With two developers, we replaced it page by page, with agents recruited as beta
        testers and their feedback wired straight into our tickets. In three months, 26
        features requested by agents shipped, anomaly reports went from 35 a month to
        fewer than 2, and internal satisfaction rose from 6.2 to 8.3 out of 10. The tool
        can evolve again: every automation now lands there, and role-based access
        control, scoped with a specialist GDPR firm, is being rolled out feature by
        feature.
      </p>
    </StoryPage>
  )
}
