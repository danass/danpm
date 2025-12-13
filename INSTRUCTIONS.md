# Instructions de Mise à Jour du CV

## 📝 Comment mettre à jour votre CV

### Informations Personnelles
Modifiez le fichier `app/components/Header.js` :
- Nom, email, téléphone, LinkedIn, localisation

### Profil Professionnel
Modifiez le fichier `app/components/CV.js` :
- Section "Profil Professionnel" - ajustez le texte selon vos besoins

### Expériences Professionnelles
Modifiez le fichier `app/components/Experience.js` :
- Ajoutez/modifiez les expériences dans le tableau `experiences`
- Chaque expérience contient : company, position, period, location, achievements

### Compétences
Modifiez le fichier `app/components/Skills.js` :
- Ajoutez/modifiez les compétences par catégorie dans `skillCategories`

### Formation
Modifiez le fichier `app/components/Education.js` :
- Ajoutez/modifiez les formations dans le tableau `education`

## 🎨 Personnalisation Visuelle

### Couleurs
Les couleurs principales sont définies dans Tailwind :
- Bleu principal : `blue-600`, `blue-700`
- Fond badges : `blue-50`
- Texte badges : `blue-700`

### Styles d'Impression
Les styles d'impression sont dans `app/globals.css` dans la section `@media print`

## 🔍 Optimisation ATS

Le CV est optimisé pour les systèmes ATS avec :
- ✅ Structure HTML sémantique
- ✅ Métadonnées Schema.org
- ✅ Mots-clés pertinents pour Product Manager
- ✅ Format texte simple et lisible
- ✅ Pas de colonnes complexes

## 📄 Export PDF

1. Cliquez sur le bouton "Imprimer / Exporter en PDF"
2. Ou utilisez `Cmd+P` (Mac) / `Ctrl+P` (Windows/Linux)
3. Dans la fenêtre d'impression, sélectionnez "Enregistrer en PDF"
4. Ajustez les marges si nécessaire (recommandé : 1.5cm)

## 🚀 Déploiement

Pour déployer le CV en ligne :
- Vercel (recommandé pour Next.js)
- Netlify
- GitHub Pages (avec export statique)

Pour un export statique :
```bash
npm run build
```
