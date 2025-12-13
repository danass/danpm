# CV - Daniel Assayag

CV optimisé pour ATS (Applicant Tracking Systems) créé avec Next.js 15+, React 19, et Tailwind CSS.

## 🚀 Démarrage Rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## 📄 Export PDF

1. Ouvrez le CV dans le navigateur
2. Appuyez sur `Cmd+P` (Mac) ou `Ctrl+P` (Windows/Linux)
3. Sélectionnez "Enregistrer en PDF"
4. Ajustez les marges si nécessaire

## 🌐 Versions

- **Français** : `http://localhost:3000/`
- **Anglais** : `http://localhost:3000/en`

## 🔍 Test ATS

Votre CV est déjà optimisé pour ATS, mais vous pouvez le tester avec :

### Option 1 : Outils en Ligne (Recommandé - Pas d'installation)
- **ResumeATS** : https://resumeats.io (100% gratuit, pas d'inscription)
- **Woberry** : https://www.woberry.com/ats-resume-checker
- **ATSScan** : https://www.atsscan.com

### Option 2 : Script Local
```bash
# Vérifier la structure ATS
node ats-checker.js
```

### Option 3 : OpenCATS (Nécessite Docker)
Voir `README_OPENCATS.md` pour l'installation.

**Pour des alternatives sans Docker, voir `ATS_TESTING_ALTERNATIVES.md`**

## ✨ Fonctionnalités

- ✅ Optimisé pour ATS (Schema.org, HTML sémantique)
- ✅ Version française et anglaise
- ✅ Mode collapse/expand pour les sections
- ✅ Export PDF optimisé
- ✅ Responsive design
- ✅ Print-friendly

## 📁 Structure

```
app/
  components/
    CV.js              # Version française
    CV-en.js           # Version anglaise
    Header.js           # En-tête avec photo
    Experience.js       # Expériences professionnelles
    Skills.js           # Compétences
    Education.js        # Formation
    Certifications.js   # Certifications
    Languages.js        # Langues
    Activities.js       # Activités
    AboutCV.js          # À propos
```

## 🛠️ Technologies

- Next.js 15+
- React 19
- Tailwind CSS
- PostCSS

## 📝 Modification du Contenu

Voir `INSTRUCTIONS.md` pour les instructions détaillées.

## 🎯 Optimisations ATS

Voir `ATS_OPTIMIZATION.md` pour la liste complète des optimisations.
