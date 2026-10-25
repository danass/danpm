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
  { id: 'font', key: 'font', title: 'Police', intro: 'Système retenue. Grotesk reste en alternative, sans conviction pour l’instant.',
    variants: [['v0', 'système (Helvetica / San Francisco)', R], ['grotesk', 'Schibsted Grotesk partout']],
    render: (v) => <Sample page={{ font: v }}><Intro>{INTRO}</Intro><Section eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 3)} /></Section></Sample> },

  { id: 'charts', key: 'charts', title: 'Graphes', intro: 'Les quatre formes, retenues. Composants à données, pas variantes de style.',
    variants: [['serie', 'une grandeur dans le temps, avec la bascule marquée', R], ['cote', 'un avant et un après, cotés', R], ['parts', 'une proportion, en carrés', R], ['barres', 'une valeur par période, avec une plage pour ce qu’on ne détaille pas', R]],
    render: (v) => <Sample><div className="gal-pad">
      {v === 'serie' && <Figure caption="Messages d’alerte envoyés à la main, par mois." status="mesuré"><Serie points={[{x:0,y:1900},{x:.74,y:1900},{x:.8,y:55},{x:1,y:55}]} event={{ x: .74, text: 'mise en production' }} yLabels={[{x:0,y:1900,text:'~1 900 / mois'},{x:1,y:55,text:'~55 / mois',anchor:'end'}]} labels={[{x:0,text:'nov. 2024'},{x:1,text:'sept. 2026'}]} /></Figure>}
      {v === 'cote' && <Figure caption="Couverture du tag scammer." status="mesuré"><Cote avant={{label:'AVANT',value:30,text:'~30 %'}} apres={{label:'APRÈS',value:100,text:'~100 %'}} delta="le tag devient le déclencheur" /></Figure>}
      {v === 'parts' && <Figure caption="Scammers traités sans déclenchement par un agent." status="mesuré"><Parts total={10} filled={9} text="9 sur 10" sub="sans déclenchement par un agent" /></Figure>}
      {v === 'barres' && <Figure caption="Tags scammer posés par mois." status="mesuré"><Barres band={{span:3,min:45,max:84,text:'45 à 84',label:'oct. 2025 → mars 2026'}} bars={[{label:'juin',value:263,mark:true},{label:'juil.',value:144,mark:true},{label:'août',value:124,mark:true},{label:'sept.',value:103,mark:true}]} /></Figure>}
    </div></Sample> },

  { id: 'top', key: 'top', title: 'En-tête', intro: 'Retenu : points-fin-haut.',
    variants: [['v0', 'avant les variantes'], ['points-fin-haut', 'filet d’un pixel, navigation fine à points, plus de hauteur', R], ['points-fin-haut-casse', 'la même, navigation en casse normale', N], ['points-fin-haut-air', 'la même, sans filet : l’air seul sépare', N]],
    render: (v) => <Sample><TopNav variant={v} /><div className="gal-pad" /></Sample> },

  { id: 'intro', key: 'intro', title: 'Intro', intro: 'Retenu : la marque, avec les deux tons inversés.',
    variants: [['v0', 'avant les variantes'], ['marque-deux-tons-inverse', 'trait de 48 px, première ligne en encre, la suite en gris', R], ['marque-fin-deux-tons-inverse', 'le même, trait plus discret (32 × 2)', N], ['marque-deux-tons-inverse-grand', 'le même, titre à 64 px', N]],
    render: (v) => <Sample><Intro variant={v}>{INTRO}</Intro><div className="gal-pad" /></Sample> },

  { id: 'eyebrow', key: 'eyebrow', title: 'Kicker', intro: 'Retenu : un filet court et gris, devant le mot.',
    variants: [['v0', 'avant les variantes'], ['filet-court-gris-devant', 'filet gris de 40 px devant', R], ['filet-court-encre-devant', 'le même filet, en noir', N], ['filet-long-gris-devant', 'filet gris de 80 px', N]],
    render: (v) => <Sample><div className="gal-pad"><Eyebrow variant={v}>Histoires</Eyebrow></div></Sample> },

  { id: 'section', key: 'section', title: 'Section', intro: 'Retenu : sans filet, 128 px.',
    variants: [['v0', 'filet de 2 px'], ['sans-filet-128', '128 px d’espace', R], ['sans-filet-104', '104 px : un peu plus serré', N], ['sans-filet-160', '160 px : encore plus aéré', N]],
    render: (v) => <Sample><Section variant={v} eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 2)} /></Section><Section variant={v} eyebrow="Repères"><Facts items={FACTS.slice(0, 2)} /></Section><div className="gal-pad" /></Sample> },

  { id: 'storyLinks', key: 'storyLinks', title: 'Liste d’histoires', intro: 'Retenu : le titre d’abord, le tag au bout de la ligne.',
    variants: [['v0', 'tag au-dessus du titre'], ['tag-apres', 'tag en capitales grises au bout de la ligne', R], ['tag-apres-casse', 'le tag en casse normale', N], ['tag-apres-fleche', 'le tag suivi d’une flèche', N]],
    render: (v) => <Sample><Section eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 4)} variant={v} /></Section><div className="gal-pad" /></Sample> },

  { id: 'stat', key: 'stat', title: 'Chiffre d’ouverture', intro: 'Retenu : inversé, en grand.',
    variants: [['v0', 'avant les variantes'], ['inverse-grand', 'bloc inversé, chiffre à 56 px, libellé dessous', R], ['inverse-geant', 'le chiffre à 80 px', N], ['inverse-ligne', 'chiffre et libellé sur la même ligne', N]],
    render: (v) => <Sample><div className="gal-pad"><p className="tag">{STAT.tag}</p><Stat variant={v} value={STAT.value} label={STAT.label} /></div></Sample> },

  { id: 'tools', key: 'tools', title: 'Outils', intro: 'Retenu : colonnes alignées, avant | → | après.',
    variants: [['v0', 'avant les variantes'], ['colonnes', 'avant gris, flèche, après en gras, alignés', R], ['colonnes-barre', 'les colonnes, l’avant barré', N], ['colonnes-trace', 'les colonnes, la flèche devient un trait fléché', N]],
    render: (v) => <Sample><div className="gal-pad"><Tools items={TOOLS} variant={v} /></div></Sample> },

  { id: 'facts', key: 'facts', title: 'Repères', intro: 'Retenu : grandes valeurs.',
    variants: [['v0', 'avant les variantes'], ['grandes-valeurs', 'valeurs à 20 px', R], ['grandes-valeurs-24', 'valeurs à 24 px', N], ['grandes-valeurs-gris', 'libellé gris et plus petit, la valeur porte seule', N]],
    render: (v) => <Sample><div className="gal-pad"><Facts items={FACTS} variant={v} /></div></Sample> },

  { id: 'outro', key: 'outro', title: 'Appel final', intro: 'Retenu : la phrase en grand, le lien fléché.',
    variants: [['v0', 'avant les variantes'], ['fleche-texte', 'phrase à 22 px, lien à 18', R], ['fleche-texte-26', 'phrase à 26 px', N], ['fleche-texte-lien', 'phrase à 22, lien à 24', N]],
    render: (v) => <Sample><Outro variant={v} eyebrow="Travailler ensemble" cta="Écrivez-moi">{OUTRO_TEXT}</Outro><div className="gal-pad" /></Sample> },

  { id: 'footer', key: 'footer', title: 'Pied', intro: 'Retenu : filet épais court, points entre les éléments.',
    variants: [['v0', 'avant les variantes'], ['massif-court-points', 'filet de 96 × 6 px, points', R], ['massif-court-48', 'filet de 48 px', N], ['massif-court-air', 'plus d’air entre le filet et les liens', N]],
    render: (v) => <Sample><SiteFooter links={FOOTER_HOME} variant={v} /></Sample> },
]

export default function Galerie() {
  if (process.env.NODE_ENV === 'production' && process.env.SHOW_VARIANTES !== '1') notFound()
  return (
    <div className="gal">
      <div className="gal-wrap">
        <nav className="gal-nav">
          <h1>Variantes</h1>
          <p>Pour chaque composant : la v0, le choix retenu (en ligne), deux voisines. On assemble dans <code>app/variantes.config.js</code>.</p>
          {BLOCKS.map((b) => <a key={b.id} href={`#${b.id}`}>{b.title} <code>{b.key}</code></a>)}
        </nav>
        <main>
          {BLOCKS.map((b) => <Block key={b.id} id={b.id} title={b.title} cfgKey={b.key} intro={b.intro} variants={b.variants} render={b.render} />)}
        </main>
      </div>
    </div>
  )
}
