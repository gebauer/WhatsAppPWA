const translations = {
  en: {
    title: 'WhatsApp Link Generator',
    phoneLabel: 'Phone Number',
    generateButton: 'Generate Link',
    copyButton: 'Copy Link',
    settingsTitle: 'Settings',
    countryCodeLabel: 'Country Code',
    closeButton: 'Close',
    updateAvailable: 'Update Available',
    updateMessage: 'A new version is available. Would you like to update now?',
    updateButton: 'Update Now',
    closeUpdateButton: 'Later',
    installPrompt: 'Install App'
  },
  de: {
    title: 'WhatsApp Link Generator',
    phoneLabel: 'Telefonnummer',
    generateButton: 'Link generieren',
    copyButton: 'Link kopieren',
    settingsTitle: 'Einstellungen',
    countryCodeLabel: 'Ländervorwahl',
    closeButton: 'Schließen',
    updateAvailable: 'Update verfügbar',
    updateMessage: 'Eine neue Version ist verfügbar. Möchten Sie jetzt aktualisieren?',
    updateButton: 'Jetzt aktualisieren',
    closeUpdateButton: 'Später',
    installPrompt: 'App installieren'
  }
};

export class I18n {
  constructor() {
    this.languageSelector = document.getElementById('languageSelector');
    this.currentLang = localStorage.getItem('language') || this.getBrowserLanguage();
    this.init();
  }

  init() {
    this.loadLanguage();
    this.attachEventListeners();
  }

  getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('de') ? 'de' : 'en';
  }

  attachEventListeners() {
    if (this.languageSelector) {
      this.languageSelector.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }
  }

  loadLanguage() {
    if (this.languageSelector) {
      this.languageSelector.value = this.currentLang;
      this.updateTranslations();
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.updateTranslations();
  }

  updateTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[this.currentLang] && translations[this.currentLang][key]) {
        element.textContent = translations[this.currentLang][key];
      }
    });

    // Update title
    document.title = translations[this.currentLang].title;
  }

  getTranslation(key) {
    return translations[this.currentLang]?.[key] || key;
  }
} 