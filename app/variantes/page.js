// La galerie des variantes : chaque composant, de v0 au plus marqué, avec le
// vrai contenu du site. On y choisit ; on assemble dans variantes.config.js.
//
// Locale seulement : en production la route n'existe pas, sauf à poser
// SHOW_VARIANTES=1 au build. Et jamais indexée.
import { notFound } from 'next/navigation'
import './galerie.css'
import '../editorial.css'
import '../variantes.css'
import { TopNav, SiteFooter, FOOTER_HOME } from '@/app/components/edito/Page'
import { Intro, CvLine, Section, Eyebrow } from '@/app/components/edito/Blocks'
import { StoryLinks, Stat, Tools, Facts, Outro } from '@/app/components/edito/Story'
import { Figure, Serie, Barres, Cote, Parts } from '@/app/components/edito/Charts'
import { pageClasses } from '@/app/components/edito/variant'
import { grotesk } from '@/app/fonts'
import { STORIES } from '@/data/stories'

export const metadata = { title: 'Variantes · danpm', robots: { index: false, follow: false } }

const TOOLS = [
  { href: '/travail/staging-wizard', what: 'Créer un compte de test complet', gain: '5 min → 15 s' },
  { what: 'Collecter et suivre les retours des 200 agents, reliés aux tickets', gain: '55 remontées, 43 corrigées' },
  { what: 'Compiler le compte-rendu hebdomadaire', gain: '10 sources → 1 document' },
  { what: 'Prévenir les agents concernés par un changement, depuis les données d’usage', gain: '1 commande' },
]
const FACTS = [
  { label: 'Couverture du tag scammer', value: '~30 % → ~100 %' },
  { label: 'Heures d’agent économisées par l’automatisation scam en 2026', value: '~844, dont 722 pendant la vague' },
  { label: 'Satisfaction interne du back-office', value: '8,3/10, contre 6,2 avant' },
]
const INTRO = (
  <>
    <h1>Je construis le back-office et les outils internes de HomeExchange.</h1>
    <p>Je conçois avec les utilisateurs finaux, j’écris des specs au plus près du code et j’accompagne les décisions d’architecture, technique et produit. Je tiens mes roadmaps, et l’impact de chaque projet est chiffré.</p>
    <CvLine><a href="/Daniel_Assayag_CV.pdf">Télécharger le CV (PDF)</a><a href="/cv">CV complet en ligne</a></CvLine>
  </>
)
const OUTRO_TEXT = 'Si vous avez besoin de tracer une vision pour embrayer une migration, d’avoir de l’impact sur ce qui est livré et de tenir les timelines de vos ambitions, écrivez-moi.'

// Un échantillon : la coquille .edito, avec les classes de niveau page si on
// en montre une, et le composant dedans.
function Sample({ page = {}, children }) {
  const extra = pageClasses({ font: 'v0', ...page })
  const cls = ['edito', ...extra, grotesk.variable].join(' ')
  return <div className="gal-sample"><div className={cls}><div className="page">{children}</div></div></div>
}

function Block({ id, title, cfgKey, intro, variants, render }) {
  return (
    <div className="gal-block" id={id}>
      <h2>{title}<code>{cfgKey}</code></h2>
      <p>{intro}</p>
      {variants.map(([v, label, status]) => (
        <div className="gal-var" key={v}>
          <h3><code>{v}</code>{status ? <em className={`gal-st gal-${status}`}>{status}</em> : null}<span>{label}</span></h3>
          {render(v)}
        </div>
      ))}
    </div>
  )
}

const STAT = { tag: 'Anti-fraude', value: '1 900 → ~55', label: 'messages d’alerte manuels par mois' }
const R = 'retenu', N = 'nouveau'

const BLOCKS = [
  { id: 'font', key: 'font', title: 'Police', intro: 'Niveau page. Système retenu pour l’instant, Grotesk laissée en alternative.',
    variants: [['v0', 'système (Helvetica / San Francisco)', R], ['grotesk', 'Schibsted Grotesk partout']],
    render: (v) => <Sample page={{ font: v }}><Intro>{INTRO}</Intro><Section eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 3)} /></Section></Sample> },

  { id: 'charts', key: 'charts', title: 'Graphes', intro: 'Les quatre formes, toutes retenues. Ce sont des composants à données, pas des variantes de style.',
    variants: [['serie', 'une grandeur dans le temps, avec la bascule marquée', R], ['cote', 'un avant et un après, cotés', R], ['parts', 'une proportion, en carrés', R], ['barres', 'une valeur par période, avec une plage pour ce qu’on ne détaille pas', R]],
    render: (v) => <Sample><div className="gal-pad">
      {v === 'serie' && <Figure caption="Messages d’alerte envoyés à la main, par mois." status="mesuré"><Serie points={[{x:0,y:1900},{x:.74,y:1900},{x:.8,y:55},{x:1,y:55}]} event={{ x: .74, text: 'mise en production' }} yLabels={[{x:0,y:1900,text:'~1 900 / mois'},{x:1,y:55,text:'~55 / mois',anchor:'end'}]} labels={[{x:0,text:'nov. 2024'},{x:1,text:'sept. 2026'}]} /></Figure>}
      {v === 'cote' && <Figure caption="Couverture du tag scammer." status="mesuré"><Cote avant={{label:'AVANT',value:30,text:'~30 %'}} apres={{label:'APRÈS',value:100,text:'~100 %'}} delta="le tag devient le déclencheur" /></Figure>}
      {v === 'parts' && <Figure caption="Scammers traités sans déclenchement par un agent." status="mesuré"><Parts total={10} filled={9} text="9 sur 10" sub="sans déclenchement par un agent" /></Figure>}
      {v === 'barres' && <Figure caption="Tags scammer posés par mois." status="mesuré"><Barres band={{span:3,min:45,max:84,text:'45 à 84',label:'oct. 2025 → mars 2026'}} bars={[{label:'juin',value:263,mark:true},{label:'juil.',value:144,mark:true},{label:'août',value:124,mark:true},{label:'sept.',value:103,mark:true}]} /></Figure>}
    </div></Sample> },

  { id: 'top', key: 'top', title: 'En-tête', intro: 'Retenu : un mélange de « points » et de « fin ». Le voici, et deux voisins.',
    variants: [['v0', 'tel quel'], ['points-fin', 'filet d’un pixel, navigation fine et espacée, séparée par des points', N], ['points-fin-casse', 'la même, en casse normale : la navigation cesse de crier', N], ['points-fin-haut', 'la même, avec plus de hauteur et un nom un peu plus présent', N]],
    render: (v) => <Sample><TopNav variant={v} /><div className="gal-pad" /></Sample> },

  { id: 'intro', key: 'intro', title: 'Intro', intro: 'Retenus : marque, deux tons. Plus leur combinaison et deux écarts.',
    variants: [['v0', 'tel quel'], ['marque', 'un trait de 48 px au-dessus du titre', R], ['deux-tons', 'la première ligne du titre en gris', R], ['marque-deux-tons', 'les deux ensemble', N], ['marque-fin', 'un trait plus court et plus fin, 32 × 2 px', N], ['deux-tons-inverse', 'l’inverse : la première ligne en encre, la suite en gris', N]],
    render: (v) => <Sample><Intro variant={v}>{INTRO}</Intro><div className="gal-pad" /></Sample> },

  { id: 'eyebrow', key: 'eyebrow', title: 'Kicker', intro: 'Retenu : filet. Trois façons de le poser.',
    variants: [['v0', 'tel quel'], ['filet', 'un filet qui court jusqu’au bord', R], ['filet-gris', 'le même filet, en gris clair', N], ['filet-court', 'un filet de 40 px seulement', N], ['filet-devant', 'le filet avant le mot, pas après', N]],
    render: (v) => <Sample><div className="gal-pad"><Eyebrow variant={v}>Histoires</Eyebrow></div></Sample> },

  { id: 'section', key: 'section', title: 'Section', intro: 'Retenu : sans filet. Trois respirations.',
    variants: [['v0', 'filet de 2 px'], ['sans-filet', '96 px d’espace', R], ['sans-filet-64', '64 px : plus serré', N], ['sans-filet-128', '128 px : plus aéré', N]],
    render: (v) => <Sample><Section variant={v} eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 2)} /></Section><Section variant={v} eyebrow="Repères"><Facts items={FACTS.slice(0, 2)} /></Section><div className="gal-pad" /></Sample> },

  { id: 'storyLinks', key: 'storyLinks', title: 'Liste d’histoires', intro: 'Le tag sur la ligne du titre, comme tu l’as aimé, mais sans pastille.',
    variants: [['v0', 'tag au-dessus du titre'], ['tag-texte', 'le tag en gris, suivi du titre', N], ['tag-barre', 'TAG / titre', N], ['tag-colonne', 'le tag dans une colonne fixe, les titres alignés', N], ['tag-apres', 'le titre d’abord, le tag au bout de la ligne', N]],
    render: (v) => <Sample><Section eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 4)} variant={v} /></Section><div className="gal-pad" /></Sample> },

  { id: 'stat', key: 'stat', title: 'Chiffre d’ouverture', intro: 'Retenus : inversé, encadré. Une variante de chaque, plus marquée ou plus légère.',
    variants: [['v0', 'tel quel'], ['inverse', 'bloc inversé', R], ['encadre', 'cadre de 2 px', R], ['inverse-grand', 'inversé, chiffre à 56 px, libellé dessous', N], ['encadre-fin', 'cadre d’un pixel', N], ['encadre-large', 'cadre sur toute la largeur', N]],
    render: (v) => <Sample><div className="gal-pad"><p className="tag">{STAT.tag}</p><Stat variant={v} value={STAT.value} label={STAT.label} /></div></Sample> },

  { id: 'tools', key: 'tools', title: 'Outils', intro: 'Retenu : gain d’abord. Et trois manières de dessiner le passage d’un état à l’autre (« 5 min → 15 s »). Un gain sans avant reste tel quel.',
    variants: [['v0', 'tel quel'], ['gain-d-abord', 'le gain à gauche', R], ['barre', 'l’avant barré et gris, l’après en gras', N], ['fleche', 'l’avant petit, une flèche tracée, l’après en grand', N], ['colonnes', 'avant | → | après, alignés comme un tableau', N]],
    render: (v) => <Sample><div className="gal-pad"><Tools items={TOOLS} variant={v} /></div></Sample> },

  { id: 'facts', key: 'facts', title: 'Repères', intro: 'Retenu : entre « deux colonnes » et « grandes valeurs ». Les deux, et le point d’équilibre.',
    variants: [['v0', 'tel quel'], ['deux-colonnes', 'deux colonnes, valeur à 24 px', R], ['grandes-valeurs', 'une colonne, valeur à 20 px', R], ['entre-deux', 'deux colonnes, valeur à 20 px', N], ['entre-deux-filet', 'la même, chaque repère ouvert par un filet', N]],
    render: (v) => <Sample><div className="gal-pad"><Facts items={FACTS} variant={v} /></div></Sample> },

  { id: 'outro', key: 'outro', title: 'Appel final', intro: 'Retenu : flèche. Plus grande, ou c’est la phrase qui grandit.',
    variants: [['v0', 'bouton à bord'], ['fleche', 'un lien souligné avec une flèche', R], ['fleche-grand', 'le lien à 28 px', N], ['fleche-texte', 'la phrase à 22 px, le lien à 18', N]],
    render: (v) => <Sample><Outro variant={v} eyebrow="Travailler ensemble" cta="Écrivez-moi">{OUTRO_TEXT}</Outro><div className="gal-pad" /></Sample> },

  { id: 'footer', key: 'footer', title: 'Pied', intro: 'Retenu : massif.',
    variants: [['v0', 'tel quel'], ['massif', 'filet de 6 px', R], ['massif-points', 'filet de 6 px, éléments séparés par des points', N], ['massif-court', 'le filet épais ne fait que 96 px', N]],
    render: (v) => <Sample><SiteFooter links={FOOTER_HOME} variant={v} /></Sample> },
]

export default function Galerie() {
  if (process.env.NODE_ENV === 'production' && process.env.SHOW_VARIANTES !== '1') notFound()
  return (
    <div className="gal">
      <div className="gal-wrap">
        <nav className="gal-nav">
          <h1>Variantes</h1>
          <p>Chaque composant, de v0 au plus marqué. On assemble dans <code>app/variantes.config.js</code>.</p>
          {BLOCKS.map((b) => <a key={b.id} href={`#${b.id}`}>{b.title} <code>{b.key}</code></a>)}
        </nav>
        <main>
          {BLOCKS.map((b) => <Block key={b.id} id={b.id} title={b.title} cfgKey={b.key} intro={b.intro} variants={b.variants} render={b.render} />)}
        </main>
      </div>
    </div>
  )
}
