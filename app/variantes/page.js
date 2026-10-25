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
import { pageClasses } from '@/app/components/edito/variant'
import { grotesk, literata } from '@/app/fonts'
import { STORIES } from '@/data/stories'

export const metadata = { title: 'Variantes · danpm', robots: { index: false, follow: false } }

const TOOLS = [
  { href: '/travail/staging-wizard', what: 'Créer un compte de test complet', gain: '5 min → 15 s' },
  { what: 'Collecter et suivre les retours des 200 agents, reliés aux tickets', gain: '55 remontées, 43 corrigées' },
  { what: 'Compiler le compte-rendu hebdomadaire', gain: '10 sources → 1 document' },
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
  const extra = pageClasses({ font: 'v0', space: 'v0', mark: 'v0', ...page })
  const cls = ['edito', ...extra, grotesk.variable, literata.variable].join(' ')
  return <div className="gal-sample"><div className={cls}><div className="page">{children}</div></div></div>
}

function Block({ id, title, cfgKey, intro, variants, render }) {
  return (
    <div className="gal-block" id={id}>
      <h2>{title}<code>{cfgKey}</code></h2>
      <p>{intro}</p>
      {variants.map(([v, label, page]) => (
        <div className="gal-var" key={v}>
          <h3><code>{v}</code><span>{label}</span></h3>
          {render(v, page)}
        </div>
      ))}
    </div>
  )
}

const BLOCKS = [
  { id: 'font', key: 'font', title: 'Police', intro: 'Niveau page. v0 est la police système ; chaque variante remplace tout ou seulement les titres.',
    variants: [['v0', 'système (Helvetica / San Francisco)'], ['grotesk', 'Schibsted Grotesk partout'], ['titres-serif', 'Literata sur les titres, le texte ne bouge pas']],
    render: (v) => <Sample page={{ font: v }}><Intro>{INTRO}</Intro><Section eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 3)} /></Section></Sample> },
  { id: 'space', key: 'space', title: 'Espace', intro: 'Niveau page. Le rythme vertical : serré pour aller vite, aéré pour laisser respirer.',
    variants: [['v0', 'tel quel'], ['serre', 'sections à 44 px, intro à 40 px'], ['aere', 'texte 16 px, sections à 104 px, intro à 96 px']],
    render: (v) => <Sample page={{ space: v }}><Intro>{INTRO}</Intro><Section eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 3)} /></Section></Sample> },
  { id: 'mark', key: 'mark', title: 'Couleur de marque', intro: 'Niveau page. La couleur que les variantes « marquées » utilisent (carré du kicker, chiffres, bouton plein, bandeau). Encre par défaut : rien ne change tant qu\'aucune variante ne l\'appelle.',
    variants: [['v0', 'encre'], ['bleu', '#12327E, 11,8:1 sur blanc'], ['vert', '#15573C, 8,5:1 sur blanc']],
    render: (v) => <Sample page={{ mark: v }}><Section eyebrow="Anti-fraude" eyebrowVariant="carre"><Stat variant="grand" value="1 900 → ~55" label="messages d’alerte manuels par mois" /></Section><Outro variant="plein" eyebrow="Travailler ensemble" cta="Écrivez-moi">{OUTRO_TEXT}</Outro></Sample> },
  { id: 'top', key: 'top', title: 'En-tête', intro: 'Le nom et la navigation, sous un filet.',
    variants: [['v0', 'tel quel'], ['points', 'liens séparés par un point médian'], ['cartouche', 'le nom en cartouche inversé'], ['fin', 'filet d’un pixel, plus d’air, navigation plus petite et plus espacée']],
    render: (v) => <Sample><TopNav variant={v} /><div className="gal-pad" /></Sample> },
  { id: 'intro', key: 'intro', title: 'Intro', intro: 'Le titre de la page et son chapeau.',
    variants: [['v0', 'tel quel'], ['grand', 'titre jusqu’à 64 px, interlettrage plus serré'], ['marque', 'un trait de 48 px au-dessus du titre'], ['deux-tons', 'la première ligne du titre en gris']],
    render: (v) => <Sample><Intro variant={v}>{INTRO}</Intro><div className="gal-pad" /></Sample> },
  { id: 'eyebrow', key: 'eyebrow', title: 'Kicker', intro: 'Le petit titre en capitales qui ouvre une section.',
    variants: [['v0', 'tel quel'], ['carre', 'un carré de 7 px devant'], ['filet', 'un filet qui court jusqu’au bord'], ['pastille', 'dans une pastille à bord fin']],
    render: (v) => <Sample><div className="gal-pad"><Eyebrow variant={v}>Histoires</Eyebrow></div></Sample> },
  { id: 'section', key: 'section', title: 'Section', intro: 'Le filet et l’espace qui séparent deux sections.',
    variants: [['v0', 'filet de 2 px'], ['fin', 'filet de 1 px, moins d’espace'], ['double', 'filet double'], ['sans-filet', 'pas de filet, 96 px d’espace']],
    render: (v) => <Sample><Section variant={v} eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 2)} /></Section><Section variant={v} eyebrow="Repères"><Facts items={FACTS.slice(0, 2)} /></Section><div className="gal-pad" /></Sample> },
  { id: 'storyLinks', key: 'storyLinks', title: 'Liste d’histoires', intro: 'Les huit histoires, sur l’accueil et sur /travail.',
    variants: [['v0', 'tag au-dessus du titre'], ['tag-en-ligne', 'le tag en pastille, sur la ligne du titre'], ['numerotes', 'numérotées 01 à 08 : c’est une vraie séquence'], ['grille', 'deux colonnes, flèche en fin de titre']],
    render: (v) => <Sample><Section eyebrow="Histoires"><StoryLinks stories={STORIES.slice(0, 4)} variant={v} /></Section><div className="gal-pad" /></Sample> },
  { id: 'stat', key: 'stat', title: 'Chiffre d’ouverture', intro: 'Le chiffre qui ouvre chaque histoire.',
    variants: [['v0', 'tel quel'], ['grand', '56 px, le libellé dessous'], ['encadre', 'dans un cadre de 2 px'], ['inverse', 'bloc inversé, encre sur blanc devient blanc sur encre']],
    render: (v) => <Sample><div className="gal-pad"><p className="tag">Anti-fraude</p><Stat variant={v} value="1 900 → ~55" label="messages d’alerte manuels par mois" /></div></Sample> },
  { id: 'tools', key: 'tools', title: 'Outils', intro: 'La liste « quand un geste revient trop souvent, j’en fais un outil ».',
    variants: [['v0', 'tel quel'], ['pointilles', 'une ligne de points mène au gain'], ['pastille', 'le gain en pastille'], ['gain-d-abord', 'le gain à gauche, en couleur de marque']],
    render: (v) => <Sample><div className="gal-pad"><Tools items={TOOLS} variant={v} /></div></Sample> },
  { id: 'facts', key: 'facts', title: 'Repères', intro: 'La liste de définitions de /travail#reperes.',
    variants: [['v0', 'tel quel'], ['grandes-valeurs', 'valeurs à 20 px'], ['pointilles', 'une ligne de points mène à la valeur'], ['deux-colonnes', 'deux colonnes, libellé dessus, valeur à 24 px']],
    render: (v) => <Sample><div className="gal-pad"><Facts items={FACTS} variant={v} /></div></Sample> },
  { id: 'outro', key: 'outro', title: 'Appel final', intro: '« Travailler ensemble », et le bouton.',
    variants: [['v0', 'bouton à bord'], ['plein', 'bouton plein'], ['fleche', 'un lien souligné avec une flèche, sans bouton'], ['bandeau', 'toute la section en bandeau inversé']],
    render: (v) => <Sample><Outro variant={v} eyebrow="Travailler ensemble" cta="Écrivez-moi">{OUTRO_TEXT}</Outro><div className="gal-pad" /></Sample> },
  { id: 'footer', key: 'footer', title: 'Pied', intro: 'Contact, liens, ville.',
    variants: [['v0', 'tel quel'], ['points', 'séparés par un point médian'], ['empile', 'une ligne par élément'], ['massif', 'filet de 6 px']],
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
