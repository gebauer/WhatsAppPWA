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
    this.settingsButton.addEventListener('click', () => this.openSettings());
    this.settingsOverlay.addEventListener('click', () => this.closeSettings());
    this.closeButton.addEventListener('click', () => this.closeSettings());
    this.countryCodeSelect.addEventListener('change', () => this.saveSettings());
  }

  openSettings() {
    this.settingsPanel.style.display = 'block';
    this.settingsOverlay.style.display = 'block';
  }

  closeSettings() {
    this.settingsPanel.style.display = 'none';
    this.settingsOverlay.style.display = 'none';
  }

  loadSettings() {
    const savedCountryCode = localStorage.getItem('countryCode');
    if (savedCountryCode) {
      this.countryCodeSelect.value = savedCountryCode;
    } else {
      // Try to detect country code from browser
      const browserLang = navigator.language || navigator.userLanguage;
      const countryCode = browserLang.split('-')[1]?.toUpperCase();
      if (countryCode) {
        this.countryCodeSelect.value = countryCode;
        this.saveSettings();
      }
    }
  }

  saveSettings() {
    localStorage.setItem('countryCode', this.countryCodeSelect.value);
  }

  getCountryCode() {
    return this.countryCodeSelect.value;
  }
} 