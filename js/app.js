import { Settings } from './settings.js';
import { I18n } from './i18n.js';
import { PWA } from './pwa.js';

export class App {
  constructor() {
    this.settings = new Settings();
    this.i18n = new I18n();
    this.pwa = new PWA();
    
    this.phoneInput = document.getElementById('phoneNumber');
    this.generateButton = document.getElementById('generateButton');
    this.copyButton = document.getElementById('copyButton');
    this.status = document.getElementById('status');
    
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.generateButton.addEventListener('click', () => this.openWhatsApp());
    this.copyButton.addEventListener('click', () => this.selectContact());
  }

  openWhatsApp() {
    const phoneNumber = this.phoneInput.value.trim();
    const countryCode = this.settings.getCountryCode();
    
    if (!phoneNumber) {
      this.showStatus(this.i18n.getTranslation('phoneError'), 'error');
      return;
    }
    
    // Remove any non-digit characters from the phone number
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${countryCode}${cleanNumber}`;
    
    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank');
  }

  selectContact() {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      // Use the Contacts API if available
      navigator.contacts.select(['tel'], { multiple: false })
        .then(contacts => {
          if (contacts && contacts.length > 0) {
            const phoneNumber = contacts[0].tel[0];
            this.phoneInput.value = phoneNumber;
          }
        })
        .catch(err => {
          console.error('Error selecting contact:', err);
          // Fallback to basic input if Contacts API fails
          this.fallbackContactSelection();
        });
    } else {
      // Fallback for browsers that don't support Contacts API
      this.fallbackContactSelection();
    }
  }

  fallbackContactSelection() {
    const input = document.createElement('input');
    input.type = 'tel';
    input.setAttribute('autocomplete', 'tel');
    document.body.appendChild(input);
    input.focus();
    setTimeout(() => {
      document.body.removeChild(input);
    }, 100);
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