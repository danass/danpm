// Le nom de classe d'une variante : rien pour v0, « v-<nom> » sinon. C'est ce
// « rien » qui garantit que la version actuelle ne bouge pas d'un pixel tant
// qu'on n'a pas choisi autre chose.
import { V } from '../../variantes.config'

export function vc(base, key, override) {
  const v = override ?? V[key] ?? 'v0'
  return v === 'v0' ? base : `${base} v-${v}`
}

// Les classes de niveau page (police, espace, couleur de marque).
export function pageClasses(override = {}) {
  const pick = (k) => override[k] ?? V[k] ?? 'v0'
  const out = []
  if (pick('font') !== 'v0')  out.push(`font-${pick('font')}`)
  if (pick('space') !== 'v0') out.push(`space-${pick('space')}`)
  if (pick('mark') !== 'v0')  out.push(`mark-${pick('mark')}`)
  return out
}
