# Alternatives à OpenCATS pour Tester votre CV

Puisque Docker n'est pas installé, voici des alternatives plus légères pour tester votre CV avec un ATS.

## 🌐 Option 1 : Outils en Ligne Gratuits (Recommandé)

### Les Meilleurs Outils Gratuits :

1. **ResumeATS** (https://resumeats.io)
   - ✅ 100% gratuit, pas d'inscription
   - ✅ Traitement dans le navigateur (confidentialité)
   - ✅ Score ATS + conseils d'optimisation

2. **Woberry** (https://www.woberry.com/ats-resume-checker)
   - ✅ Gratuit
   - ✅ Score détaillé + suggestions de mots-clés
   - ✅ Validation du formatage

3. **ATSScan** (https://www.atsscan.com)
   - ✅ Analyse instantanée
   - ✅ Pas de login requis
   - ✅ Vérifie les éléments critiques

4. **ResumeAdapter** (https://www.resumeadapter.com)
   - ✅ Analyse contre descriptions de poste
   - ✅ Gap analysis
   - ✅ Suggestions de réécriture IA

### Comment Utiliser :
1. Exportez votre CV en PDF (Cmd+P → Enregistrer en PDF)
2. Allez sur l'un de ces sites
3. Uploadez votre PDF
4. Analysez les résultats et optimisez

## 🐍 Option 2 : Script Python Simple (Local)

Un script Python léger qui extrait les informations clés de votre CV.

### Installation :
```bash
# Installer Python (si pas déjà fait)
# macOS: déjà installé
# Vérifier: python3 --version

# Installer les dépendances
pip3 install pdfplumber python-docx
```

### Script ATS Checker :
Voir `ats-checker.py` dans ce dossier.

## 📦 Option 3 : Outil Node.js Léger

Un script Node.js qui analyse la structure HTML de votre CV.

### Installation :
```bash
npm install --save-dev cheerio
```

### Script :
Voir `ats-checker.js` dans ce dossier.

## 🎯 Option 4 : Test Manuel

Votre CV est déjà optimisé pour ATS avec :
- ✅ Structure HTML sémantique
- ✅ Métadonnées Schema.org
- ✅ Mots-clés pertinents
- ✅ Format texte simple

### Checklist Manuelle :
- [ ] Toutes les sections sont lisibles
- [ ] Mots-clés Product Manager présents
- [ ] Dates formatées correctement
- [ ] Contact info claire
- [ ] Pas de colonnes complexes
- [ ] Texte sélectionnable

## 💡 Recommandation

**Utilisez les outils en ligne** (Option 1) - c'est le plus simple et le plus efficace :
1. ResumeATS pour un test rapide
2. Woberry pour une analyse détaillée
3. Comparez les résultats

Pas besoin d'installer quoi que ce soit, juste exporter votre PDF et uploader !
