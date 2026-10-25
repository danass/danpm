// La table d'assemblage. Chaque composant du site lit ici la variante qu'il
// doit prendre. « v0 » est la version actuelle.
//
// Pour assembler : remplacer un « v0 » par le nom d'une variante vue dans la
// galerie (npm run dev, puis /variantes). Un composant à la fois.
// Espace et couleur de marque sont restés en v0 et n'ont plus d'alternative.
export const V = {
  font:       'v0',   // v0 système · grotesk

  top:        'v0',   // points-fin · points-fin-casse · points-fin-haut
  intro:      'v0',   // marque · deux-tons · marque-deux-tons · marque-fin · deux-tons-inverse
  eyebrow:    'v0',   // filet · filet-gris · filet-court · filet-devant
  section:    'v0',   // sans-filet · sans-filet-64 · sans-filet-128
  storyLinks: 'v0',   // tag-texte · tag-barre · tag-colonne · tag-apres
  stat:       'v0',   // inverse · encadre · inverse-grand · encadre-fin · encadre-large
  tools:      'v0',   // gain-d-abord · barre · fleche · colonnes
  facts:      'v0',   // deux-colonnes · grandes-valeurs · entre-deux · entre-deux-filet
  outro:      'v0',   // fleche · fleche-grand · fleche-texte
  footer:     'v0',   // massif · massif-points · massif-court
}
