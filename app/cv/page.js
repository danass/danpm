import CvPage from '@/app/components/edito/CvPage'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'CV · Daniel Assayag',
  description:
    "CV of Daniel Assayag, product manager of the Operations squad at HomeExchange. Back-office, internal tools, fraud prevention, automation.",
  ...langMeta('en', '/cv'),
}

export default function CVPage() {
  return <CvPage lang="en" />
}
