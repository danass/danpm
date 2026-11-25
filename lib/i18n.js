// Deux langues : l'anglais aux chemins racine, le français sous /fr.
// `lang` vaut 'fr' par défaut dans les composants, pour que les pages
// françaises (et la galerie /variantes) restent telles quelles.

export const UI = {
  en: {
    nav: 'Navigation', home: 'Home', work: 'Work', cv: 'CV', contact: 'Contact',
    switchLabel: 'Français', switchLang: 'fr',
    contactMe: 'Contact me', allStories: '← All stories',
    form: 'Contact form', close: 'Close', sent: 'Message sent', sentNote: 'I will reply by email.',
    writeMe: 'Write to me', yourName: 'Your name', yourEmail: 'Your email', message: 'Message',
    error: 'Sending failed. Try again, or reach me on LinkedIn.', sending: 'Sending…', send: 'Send',
    pdf: 'Download the PDF', pdfFile: '/Daniel_Assayag_CV.pdf',
    experience: 'Experience', skills: 'Skills', education: 'Education', certifications: 'Certifications', other: 'Languages and other',
  },
  fr: {
    nav: 'Navigation', home: 'Accueil', work: 'Travail', cv: 'CV', contact: 'Contact',
    switchLabel: 'English', switchLang: 'en',
    contactMe: 'Me contacter', allStories: '← Toutes les histoires',
    form: 'Formulaire de contact', close: 'Fermer', sent: 'Message envoyé', sentNote: 'Je vous répondrai par email.',
    writeMe: 'Écrivez-moi', yourName: 'Votre nom', yourEmail: 'Votre email', message: 'Message',
    error: 'L’envoi a échoué. Réessayez, ou contactez-moi via LinkedIn.', sending: 'Envoi…', send: 'Envoyer',
    pdf: 'Télécharger le PDF', pdfFile: '/Daniel_Assayag_CV_fr.pdf',
    experience: 'Expérience', skills: 'Compétences', education: 'Formation', certifications: 'Certifications', other: 'Langues et autres',
  },
}

// Chemin racine ('/travail') → chemin dans la langue ('/fr/travail').
export const localize = (lang, path) =>
  lang === 'fr' ? (path === '/' ? '/fr' : `/fr${path}`) : path

// Métadonnées de langue d'une page : hreflang + locale Open Graph.
export const langMeta = (lang, path) => ({
  alternates: {
    canonical: localize(lang, path),
    languages: { en: path, fr: localize('fr', path), 'x-default': path },
  },
  // Next ne fusionne pas openGraph avec celui du layout : on redonne l'objet
  // complet, comme avant (titre et accroche du site, dans la langue de la page).
  openGraph: {
    title: 'Daniel Assayag · Product Manager',
    description: lang === 'fr'
      ? 'J’automatise les tâches opérationnelles de HomeExchange.'
      : 'I automate the operational tasks of HomeExchange.',
    type: 'profile',
    locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    alternateLocale: lang === 'fr' ? 'en_US' : 'fr_FR',
  },
})
