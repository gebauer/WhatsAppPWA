export class PWA {
  constructor() {
    this.deferredPrompt = null;
    this.installPrompt = document.getElementById('installPrompt');
    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.setupUpdateCheck();
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./sw.js', {
          scope: './'
        });
        console.log('ServiceWorker registration successful');
      } catch (err) {
        console.error('ServiceWorker registration failed:', err);
      }
    }
  }

  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      if (this.installPrompt) {
        this.installPrompt.style.display = 'block';
      }
    });

    if (this.installPrompt) {
      this.installPrompt.addEventListener('click', async () => {
        if (this.deferredPrompt) {
          this.deferredPrompt.prompt();
          const { outcome } = await this.deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
          }
          this.deferredPrompt = null;
          this.installPrompt.style.display = 'none';
        }
      });
    }
  }

  setupUpdateCheck() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        this.showUpdateNotification();
      });
    }
  }

  showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <div class="update-content">
        <h3 data-i18n="updateAvailable">Update Available</h3>
        <p data-i18n="updateMessage">A new version is available. Would you like to update now?</p>
        <div class="update-buttons">
          <button onclick="window.location.reload()" data-i18n="updateButton">Update Now</button>
          <button onclick="this.parentElement.parentElement.parentElement.remove()" data-i18n="closeUpdateButton">Later</button>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
  }
} 