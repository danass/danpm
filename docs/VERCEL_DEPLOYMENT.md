# Déploiement sur Vercel

## ✅ Étape 1 : Branche créée et commit effectué

La branche `cv` a été créée et le code du CV a été commité et pushé sur GitHub :
- **Branche** : `cv`
- **Repository** : `https://github.com/danass/danpm.git`
- **Commit** : "Add CV application with French and English versions"

## 📋 Étape 2 : Configuration Vercel

### Option A : Via l'interface Vercel

1. **Connectez-vous à Vercel** : https://vercel.com
2. **Allez dans votre projet `danpm`**
3. **Settings** → **Git**
4. **Production Branch** : Changez de `main` à `cv`
5. **Save**

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# Se connecter
vercel login

# Aller dans le projet
cd /Users/danielassayag/Documents/GitHub/danpm

# Lier au projet existant
vercel link

# Déployer la branche cv
vercel --prod
```

### Option C : Via le Dashboard Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez le projet `danpm`
3. Allez dans **Settings** → **Git**
4. Dans **Production Branch**, sélectionnez `cv`
5. Cliquez sur **Save**

## 🚀 Étape 3 : Vérification

Une fois configuré, Vercel déploiera automatiquement la branche `cv` à chaque push.

Pour vérifier :
1. Allez sur votre dashboard Vercel
2. Vérifiez que le dernier déploiement utilise la branche `cv`
3. Visitez votre site pour voir le CV

## 📝 Notes

- Le CV est accessible sur `/` (français) et `/en` (anglais)
- Le build fonctionne correctement (testé localement)
- Tous les fichiers nécessaires sont dans la branche `cv`



