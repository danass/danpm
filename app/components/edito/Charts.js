// Les graphes. Du SVG rendu côté serveur, sans script : une figure se lit
// comme une phrase, avec le chiffre écrit au bout du trait. Quatre formes,
// pour quatre manières de dire un résultat :
//
//   Serie   une grandeur dans le temps, avec l'événement qui la fait basculer
//   Barres  une valeur par période, avec une plage pour ce qu'on ne détaille pas
//   Cote    un avant et un après, cotés comme sur un relevé
//   Parts   une proportion, en carrés : neuf sur dix se compte du doigt
//
// Tout est en encre ; la couleur de marque (var(--mark)) ne porte que l'après.
import './charts.css'

const FONT = 'inherit'

// ── Figure : le cadre commun, légende et statut de la mesure ──────────────
export function Figure({ caption, status, children }) {
  return (
    <figure className="chart">
      {children}
      {(caption || status) && (
        <figcaption>
          {caption}
          {status ? <small> · {status}</small> : null}
        </figcaption>
      )}
    </figure>
  )
}

// Une grille de deux figures côte à côte sur grand écran.
export function Figures({ children }) {
  return <div className="charts-2">{children}</div>
}

// ── Serie ────────────────────────────────────────────────────────────────
// points : [{ x: 0..1, y }], labels : [{ x, text }] sur l'axe, event :
// { x, text } le moment marqué. `y` est lissé par max.
export function Serie({ points, labels = [], event, yLabels = [], ariaLabel }) {
  const W = 560, H = 190, L = 4, R = 4, T = 26, B = 36
  const ymax = Math.max(...points.map((p) => p.y)) * 1.1
  const X = (x) => L + x * (W - L - R)
  const Y = (y) => T + (1 - y / ymax) * (H - T - B)
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`).join(' ')
  const ev = event ? points.reduce((best, p) => (Math.abs(p.x - event.x) < Math.abs(best.x - event.x) ? p : best), points[0]) : null
  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
      <line className="axis" x1={L} y1={H - B + 4} x2={W - R} y2={H - B + 4} />
      <path className="line" d={path} />
      {yLabels.map((l, i) => (
        <text key={i} className="val" x={X(l.x)} y={Y(l.y) - 9} textAnchor={l.anchor || 'start'}>{l.text}</text>
      ))}
      {ev && (
        <g>
          <line className="event" x1={X(ev.x)} y1={T - 6} x2={X(ev.x)} y2={H - B + 4} />
          <circle className="dot" cx={X(ev.x)} cy={Y(ev.y)} r="5" />
          <text className="lbl" x={X(ev.x) + 9} y={T + 2}>{event.text}</text>
        </g>
      )}
      {labels.map((l, i) => (
        <text key={i} className="lbl" x={X(l.x)} y={H - 10} textAnchor={l.anchor || (l.x > 0.8 ? 'end' : l.x < 0.2 ? 'start' : 'middle')}>{l.text}</text>
      ))}
    </svg>
  )
}

// ── Barres ───────────────────────────────────────────────────────────────
// bars : [{ label, value, mark?, note? }] ; band : { label, text, min, max,
// span } pour une plage non détaillée qui précède (span = nombre de colonnes).
export function Barres({ bars, band, unit = '', ariaLabel, max }) {
  const W = 560, H = 190, T = 26, B = 34, GAP = 8
  const n = bars.length + (band ? band.span : 0)
  const bw = (W - GAP * (n - 1)) / n
  const ymax = (max ?? Math.max(...bars.map((b) => b.value), band ? band.max : 0)) * 1.12
  const Y = (v) => T + (1 - v / ymax) * (H - T - B)
  let col = 0
  const out = []
  if (band) {
    const x = 0, w = band.span * bw + (band.span - 1) * GAP
    out.push(
      <g key="band">
        <rect className="band" x={x} y={Y(band.max)} width={w} height={Y(band.min) - Y(band.max)} />
        <text className="val mut" x={x + w / 2} y={Y(band.max) - 8} textAnchor="middle">{band.text}</text>
        <text className="lbl" x={x + w / 2} y={H - 10} textAnchor="middle">{band.label}</text>
      </g>
    )
    col = band.span
  }
  bars.forEach((b, i) => {
    const x = (col + i) * (bw + GAP)
    out.push(
      <g key={i}>
        <rect className={b.mark ? 'bar mark' : 'bar'} x={x} y={Y(b.value)} width={bw} height={Y(0) - Y(b.value)} />
        <text className="val" x={x + bw / 2} y={Y(b.value) - 8} textAnchor="middle">{b.note ?? `${b.value.toLocaleString('fr-FR')}${unit}`}</text>
        <text className="lbl" x={x + bw / 2} y={H - 10} textAnchor="middle">{b.label}</text>
      </g>
    )
  })
  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
      {out}
      <line className="axis" x1="0" y1={Y(0) + 0.5} x2={W} y2={Y(0) + 0.5} />
    </svg>
  )
}

// ── Cote ─────────────────────────────────────────────────────────────────
// avant / apres : { label, value, text } ; delta : le texte posé sur la cote.
// Les longueurs sont proportionnelles aux valeurs, sauf `scale` fourni.
export function Cote({ avant, apres, delta, note, ariaLabel }) {
  const W = 560, H = 120
  const max = Math.max(avant.value, apres.value)
  const len = (v) => Math.max(10, (v / max) * 380)
  const a = len(avant.value), b = len(apres.value)
  const lo = Math.min(a, b), hi = Math.max(a, b)
  return (
    <svg className="chart-svg cote" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
      <text className="lbl" x="0" y="14">{avant.label}</text>
      <rect className="bar" x="0" y="22" width={a} height="14" />
      <text className="num" x={a + 10} y="35">{avant.text}</text>
      <text className="lbl" x="0" y="72">{apres.label}</text>
      <rect className="bar mark" x="0" y="80" width={b} height="14" />
      <text className="num mark" x={b + 10} y="93">{apres.text}</text>
      <path className="dim" d={`M${lo} 44 v8 M${hi} 44 v8 M${lo} 48 H${hi}`} />
      {delta && <text className="val mark" x={(lo + hi) / 2} y="62" textAnchor="middle">{delta}</text>}
      {note && <text className="lbl" x="0" y="114">{note}</text>}
    </svg>
  )
}

// ── Parts ────────────────────────────────────────────────────────────────
// total carrés, `filled` pleins. Dix carrés pour « neuf sur dix ».
export function Parts({ total = 10, filled, text, sub, ariaLabel }) {
  const size = 34, gap = 8, W = total * (size + gap) - gap, H = size + 58
  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
      {Array.from({ length: total }, (_, i) => (
        <rect key={i} className={i < filled ? 'sq mark' : 'sq'} x={i * (size + gap)} y="0" width={size} height={size} />
      ))}
      <text className="num mark" x="0" y={size + 30}>{text}</text>
      {sub && <text className="lbl" x="0" y={size + 50}>{sub}</text>}
    </svg>
  )
}
