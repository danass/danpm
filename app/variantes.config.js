// La table d'assemblage. Chaque composant du site lit ici la variante qu'il
// doit prendre. « v0 » est la version actuelle, celle d'avant les variantes.
//
// Pour assembler : remplacer un « v0 » par le nom d'une variante vue dans la
// galerie (npm run dev, puis /variantes). Un composant à la fois, puis on
// regarde, puis on garde ou on revient. Rien d'autre à toucher.
export const V = {
  // Niveau page : s'appliquent à tout, partout.
  font:  'v0',   // v0 système · grotesk · titres-serif
  space: 'v0',   // v0 · serre · aere
  mark:  'v0',   // v0 encre · bleu · vert  (la couleur que les variantes marquées utilisent)

  // Composants.
  top:        'v0',   // v0 · points · cartouche · fin
  intro:      'v0',   // v0 · grand · marque · deux-tons
  eyebrow:    'v0',   // v0 · carre · filet · pastille
  section:    'v0',   // v0 · fin · double · sans-filet
  storyLinks: 'v0',   // v0 · tag-en-ligne · numerotes · grille
  stat:       'v0',   // v0 · grand · encadre · inverse
  tools:      'v0',   // v0 · pointilles · pastille · gain-d-abord
  facts:      'v0',   // v0 · grandes-valeurs · pointilles · deux-colonnes
  outro:      'v0',   // v0 · plein · fleche · bandeau
  footer:     'v0',   // v0 · points · empile · massif
}
