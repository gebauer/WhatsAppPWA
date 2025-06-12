# WhatsApp Link Generator PWA

A Progressive Web App (PWA) that allows you to generate WhatsApp chat links without granting WhatsApp access to your contacts. This project was created with privacy and security in mind.

## Why This Project?

WhatsApp requires access to your contacts to function on smartphones, which raises privacy concerns. This PWA provides a secure alternative by:

- Generating WhatsApp chat links without requiring contact access permissions
- Allowing you to manually enter phone numbers
- Providing an optional contact picker that only accesses contacts when you explicitly choose to use it
- Working as a standalone web app that can be installed on your device

## Features

- 📱 Generate WhatsApp chat links for any phone number
- 🔒 No permanent contact access required
- 📞 Optional contact picker (only when you choose to use it)
- 💾 Works offline
- 📲 Can be installed as a standalone app
- 🌐 Progressive Web App (PWA) support
- 🔄 Automatic phone number formatting
- 🌙 Dark mode support
- 🌍 Multi-language support (English and German)
- 📱 Responsive design for all devices

## How to Use

1. Enter a phone number manually, or
2. Use the contact picker to select a contact (optional)
3. Click "Open in WhatsApp" to start the chat

## Installation

### As a PWA
1. Visit the website
2. When prompted, click "Install" to add it to your home screen
3. The app will work offline after installation

### Manual Installation
1. Clone this repository
2. Host the files on any web server
3. Access via browser

## Technical Details

- Built with vanilla JavaScript
- Implements Service Worker for offline functionality
- Uses the Contact Picker API (with fallback for unsupported browsers)
- Implements PWA best practices for installation and offline support

## Security Features

- No data is stored on any server
- All processing happens locally in your browser
- Contact access is only requested when explicitly using the contact picker
- No tracking or analytics

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Deployment

This project is deployed on GitHub Pages. You can access it at: [https://gebauer.github.io/WhatsAppPWA/](https://gebauer.github.io/WhatsAppPWA/) 