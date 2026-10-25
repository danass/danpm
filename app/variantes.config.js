// La table d'assemblage : la mise en page du site. Chaque composant lit ici
// la variante qu'il prend. « v0 » est la version d'avant les variantes.
//
// Valeurs actuelles = les choix de Daniel (25 oct. 2026). Les commentaires
// listent les deux voisines proposées pour chacun, visibles dans la galerie
// (npm run dev, puis /variantes).
export const V = {
  font:       'v0',                          // · grotesk

  top:        'points-fin-haut',             // · points-fin-haut-casse · points-fin-haut-air
  intro:      'marque-deux-tons-inverse',    // · marque-fin-deux-tons-inverse · marque-deux-tons-inverse-grand
  eyebrow:    'filet-court-gris-devant',     // · filet-court-encre-devant · filet-long-gris-devant
  section:    'sans-filet-128',              // · sans-filet-104 · sans-filet-160
  storyLinks: 'tag-apres',                   // · tag-apres-casse · tag-apres-fleche
  stat:       'inverse-grand',               // · inverse-geant · inverse-ligne
  tools:      'colonnes',                    // · colonnes-barre · colonnes-trace
  facts:      'grandes-valeurs',             // · grandes-valeurs-24 · grandes-valeurs-gris
  outro:      'fleche-texte',                // · fleche-texte-26 · fleche-texte-lien
  footer:     'massif-court-points',         // · massif-court-48 · massif-court-air
}
