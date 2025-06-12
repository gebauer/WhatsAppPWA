const translations = {
  en: {
    title: 'WhatsApp Link Generator',
    phoneLabel: 'Phone Number',
    messageLabel: 'Message (optional)',
    generateButton: 'Generate Link',
    copyButton: 'Copy Link',
    settingsTitle: 'Settings',
    countryCodeLabel: 'Country Code',
    closeButton: 'Close',
    updateAvailable: 'Update Available',
    updateMessage: 'A new version is available. Would you like to update now?',
    updateButton: 'Update Now',
    closeUpdateButton: 'Later'
  },
  de: {
    title: 'WhatsApp Link Generator',
    phoneLabel: 'Telefonnummer',
    messageLabel: 'Nachricht (optional)',
    generateButton: 'Link generieren',
    copyButton: 'Link kopieren',
    settingsTitle: 'Einstellungen',
    countryCodeLabel: 'Ländervorwahl',
    closeButton: 'Schließen',
    updateAvailable: 'Update verfügbar',
    updateMessage: 'Eine neue Version ist verfügbar. Möchten Sie jetzt aktualisieren?',
    updateButton: 'Jetzt aktualisieren',
    closeUpdateButton: 'Später'
  }
};

export class I18n {
  constructor() {
    this.languageSelector = document.getElementById('languageSelector');
    this.currentLang = localStorage.getItem('language') || 'en';
    this.init();
  }

  init() {
    this.loadLanguage();
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.languageSelector.addEventListener('change', () => {
      this.setLanguage(this.languageSelector.value);
    });
  }

  loadLanguage() {
    this.languageSelector.value = this.currentLang;
    this.updateTranslations();
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updateTranslations();
  }

  updateTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[this.currentLang][key]) {
        element.textContent = translations[this.currentLang][key];
      }
    });
  }

  getTranslation(key) {
    return translations[this.currentLang][key] || key;
  }
} 