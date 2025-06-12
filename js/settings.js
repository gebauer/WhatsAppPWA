export class Settings {
  constructor() {
    this.settingsButton = document.getElementById('settingsButton');
    this.settingsPanel = document.getElementById('settingsPanel');
    this.settingsOverlay = document.getElementById('settingsOverlay');
    this.countryCodeSelect = document.getElementById('countryCode');
    this.closeButton = document.querySelector('.close-button');
    
    this.init();
  }

  init() {
    this.loadSettings();
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.settingsButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openSettings();
    });

    this.settingsOverlay.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeSettings();
    });

    this.closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeSettings();
    });

    this.countryCodeSelect.addEventListener('change', () => {
      this.saveSettings();
    });
  }

  openSettings() {
    if (this.settingsPanel && this.settingsOverlay) {
      this.settingsPanel.style.display = 'block';
      this.settingsOverlay.style.display = 'block';
    }
  }

  closeSettings() {
    if (this.settingsPanel && this.settingsOverlay) {
      this.settingsPanel.style.display = 'none';
      this.settingsOverlay.style.display = 'none';
    }
  }

  getDefaultCountryCode() {
    // Map of language codes to country codes
    const countryCodeMap = {
      'de': '49',    // Germany
      'en-GB': '44', // United Kingdom
      'en-US': '1',  // United States
      'fr': '33',    // France
      'it': '39',    // Italy
      'es': '34',    // Spain
      'nl': '31',    // Netherlands
      'be': '32',    // Belgium
      'de-CH': '41', // Switzerland
      'de-AT': '43', // Austria
      'en': '44',    // Default to UK for generic English
    };

    // Try to get the most specific locale first
    const locale = navigator.language || navigator.userLanguage;
    const language = locale.split('-')[0];
    const region = locale.split('-')[1];

    // Try exact match first (e.g., 'de-DE')
    if (countryCodeMap[locale]) {
      return countryCodeMap[locale];
    }
    
    // Try language-region match (e.g., 'de-AT')
    if (region && countryCodeMap[`${language}-${region}`]) {
      return countryCodeMap[`${language}-${region}`];
    }
    
    // Try language only (e.g., 'de')
    if (countryCodeMap[language]) {
      return countryCodeMap[language];
    }

    // Default to Germany if no match found
    return '49';
  }

  loadSettings() {
    const savedCountryCode = localStorage.getItem('countryCode');
    if (savedCountryCode) {
      this.countryCodeSelect.value = savedCountryCode;
    } else {
      // First time setup - detect country code
      const defaultCountryCode = this.getDefaultCountryCode();
      this.countryCodeSelect.value = defaultCountryCode;
      this.saveSettings();
    }
  }

  saveSettings() {
    localStorage.setItem('countryCode', this.countryCodeSelect.value);
  }

  getCountryCode() {
    return this.countryCodeSelect.value;
  }
} 