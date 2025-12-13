#!/usr/bin/env node

/**
 * ATS Resume Checker - Analyse la structure HTML du CV
 * Usage: node ats-checker.js
 */

const fs = require('fs');
const path = require('path');

// Couleurs pour la console
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function checkATS() {
  console.log(`${colors.bold}${colors.blue}🔍 ATS Resume Checker${colors.reset}\n`);

  const checks = {
    schemaOrg: false,
    semanticHTML: false,
    keywords: false,
    contactInfo: false,
    structure: false
  };

  let score = 0;
  const maxScore = 5;

  // Vérifier les fichiers du CV
  const cvFiles = [
    'app/components/CV.js',
    'app/components/Header.js',
    'app/components/Experience.js',
    'app/components/Skills.js'
  ];

  console.log(`${colors.blue}Analyse des fichiers...${colors.reset}\n`);

  // Mots-clés à chercher (français et anglais)
  const keywords = [
    'Product Manager', 'Product Strategy', 'Roadmap', 'Stakeholder', 'Feature',
    'KPI', 'User Research', 'Agile', 'Scrum', 'Sprint', 'Backlog',
    'Product Manager', 'Stratégie Produit', 'Roadmap', 'Stakeholders',
    'Features', 'KPIs', 'Recherche Utilisateur', 'Agile', 'Scrum',
    'Priorisation', 'Prioritization', 'Specifications', 'Spécifications',
    'Data-driven', 'A/B Testing', 'Metrics', 'Métriques'
  ];
  
  const allFoundKeywords = new Set();
  let schemaOrgFound = false;
  let semanticHTMLFound = false;
  let contactInfoFound = false;
  let structureFound = false;

  cvFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check Schema.org
      if (content.includes('itemScope') && content.includes('itemType')) {
        if (!schemaOrgFound) {
          schemaOrgFound = true;
          checks.schemaOrg = true;
          score++;
          console.log(`${colors.green}✅${colors.reset} Schema.org metadata trouvé dans ${file}`);
        }
      }

      // Check Semantic HTML
      if (content.includes('<header>') || content.includes('<section>') || content.includes('<article>')) {
        if (!semanticHTMLFound) {
          semanticHTMLFound = true;
          checks.semanticHTML = true;
          score++;
          console.log(`${colors.green}✅${colors.reset} HTML sémantique trouvé dans ${file}`);
        }
      }

      // Check Keywords (accumuler tous les mots-clés trouvés)
      keywords.forEach(kw => {
        const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        if (regex.test(content)) {
          allFoundKeywords.add(kw);
        }
      });

      // Check Contact Info
      if (file.includes('Header')) {
        if (content.includes('email') || content.includes('telephone') || content.includes('linkedin')) {
          if (!contactInfoFound) {
            contactInfoFound = true;
            checks.contactInfo = true;
            score++;
            console.log(`${colors.green}✅${colors.reset} Informations de contact trouvées`);
          }
        }
      }

      // Check Structure
      if (content.includes('Experience') || content.includes('Skills') || content.includes('Education')) {
        if (!structureFound) {
          structureFound = true;
          checks.structure = true;
          score++;
          console.log(`${colors.green}✅${colors.reset} Structure claire trouvée`);
        }
      }
    }
  });

  // Vérifier les mots-clés (au moins 8 différents trouvés)
  if (allFoundKeywords.size >= 8) {
    checks.keywords = true;
    score++;
    console.log(`${colors.green}✅${colors.reset} Mots-clés pertinents trouvés (${allFoundKeywords.size} mots-clés uniques)`);
    console.log(`${colors.blue}   Mots-clés détectés: ${Array.from(allFoundKeywords).slice(0, 10).join(', ')}${allFoundKeywords.size > 10 ? '...' : ''}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️${colors.reset} Mots-clés: ${allFoundKeywords.size} trouvés (recommandé: 8+)`);
    console.log(`${colors.blue}   Mots-clés détectés: ${Array.from(allFoundKeywords).join(', ') || 'Aucun'}${colors.reset}`);
  }

  // Calcul du score
  const percentage = Math.round((score / maxScore) * 100);

  console.log(`\n${colors.bold}📊 Résultats:${colors.reset}\n`);
  console.log(`Score ATS: ${percentage}% (${score}/${maxScore})\n`);

  // Détails
  console.log(`${colors.bold}Détails:${colors.reset}`);
  console.log(`${checks.schemaOrg ? colors.green + '✅' : colors.red + '❌'}${colors.reset} Métadonnées Schema.org`);
  console.log(`${checks.semanticHTML ? colors.green + '✅' : colors.red + '❌'}${colors.reset} HTML sémantique`);
  console.log(`${checks.keywords ? colors.green + '✅' : colors.red + '❌'}${colors.reset} Mots-clés pertinents`);
  console.log(`${checks.contactInfo ? colors.green + '✅' : colors.red + '❌'}${colors.reset} Informations de contact`);
  console.log(`${checks.structure ? colors.green + '✅' : colors.red + '❌'}${colors.reset} Structure claire\n`);

  // Recommandations
  if (percentage >= 80) {
    console.log(`${colors.green}${colors.bold}🎉 Excellent ! Votre CV est bien optimisé pour ATS.${colors.reset}\n`);
  } else if (percentage >= 60) {
    console.log(`${colors.yellow}${colors.bold}⚠️  Bon, mais il y a des améliorations possibles.${colors.reset}\n`);
  } else {
    console.log(`${colors.red}${colors.bold}❌ Votre CV a besoin d'optimisations pour ATS.${colors.reset}\n`);
  }

  console.log(`${colors.blue}💡 Conseil: Testez aussi votre CV PDF sur des outils en ligne comme:${colors.reset}`);
  console.log(`   - ResumeATS (https://resumeats.io)`);
  console.log(`   - Woberry (https://www.woberry.com/ats-resume-checker)`);
  console.log(`   - ATSScan (https://www.atsscan.com)\n`);
}

// Exécuter
checkATS();
