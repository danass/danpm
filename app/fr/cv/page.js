import CvPage from '@/app/components/edito/CvPage'
import { langMeta } from '@/lib/i18n'

export const metadata = {
  title: 'CV · Daniel Assayag',
  description:
    "CV de Daniel Assayag, product manager de la squad Operations chez HomeExchange. Back-office, outils internes, anti-fraude, automatisation.",
  ...langMeta('fr', '/cv'),
}

export default function CVPage() {
  return <CvPage lang="fr" />
}
