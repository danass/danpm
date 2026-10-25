// Le nom de classe d'une variante : rien pour v0, « v-<nom> » sinon. C'est ce
// « rien » qui garantit que la version actuelle ne bouge pas d'un pixel tant
// qu'on n'a pas choisi autre chose.
import { V } from '../../variantes.config'

export function vc(base, key, override) {
  const v = override ?? V[key] ?? 'v0'
  return v === 'v0' ? base : `${base} v-${v}`
}

// Les classes de niveau page. Espace et couleur de marque sont restés en v0 :
// seule la police garde une alternative.

// Le nom résolu d'une variante, pour les composants qui changent de balisage.
export function vname(key, override) {
  return override ?? V[key] ?? 'v0'
}

export function pageClasses(override = {}) {
  const pick = (k) => override[k] ?? V[k] ?? 'v0'
  const out = []
  if (pick('font') !== 'v0')  out.push(`font-${pick('font')}`)
  return out
}
