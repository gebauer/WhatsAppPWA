import { Settings } from './settings.js';
import { I18n } from './i18n.js';
import { PWA } from './pwa.js';

export class App {
  constructor() {
    this.settings = new Settings();
    this.i18n = new I18n();
    this.pwa = new PWA();
    
    this.phoneInput = document.getElementById('phone');
    this.messageInput = document.getElementById('message');
    this.generateButton = document.getElementById('generateButton');
    this.copyButton = document.getElementById('copyButton');
    this.status = document.getElementById('status');
    
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.generateButton.addEventListener('click', () => this.generateLink());
    this.copyButton.addEventListener('click', () => this.copyLink());
  }

  generateLink() {
    const phone = this.phoneInput.value.replace(/\D/g, '');
    const message = encodeURIComponent(this.messageInput.value);
    const countryCode = this.settings.getCountryCode();
    
    if (!phone) {
      this.showStatus('Please enter a phone number', 'error');
      return;
    }

    const link = `https://wa.me/${countryCode}${phone}${message ? `?text=${message}` : ''}`;
    this.copyButton.dataset.link = link;
    this.showStatus('Link generated! Click "Copy Link" to copy it.', 'success');
  }

  copyLink() {
    const link = this.copyButton.dataset.link;
    if (!link) {
      this.showStatus('Please generate a link first', 'error');
      return;
    }

    navigator.clipboard.writeText(link)
      .then(() => this.showStatus('Link copied to clipboard!', 'success'))
      .catch(() => this.showStatus('Failed to copy link', 'error'));
  }

  showStatus(message, type = 'info') {
    this.status.textContent = message;
    this.status.className = type;
    this.status.style.display = 'block';
    
    setTimeout(() => {
      this.status.style.display = 'none';
    }, 3000);
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
}); 