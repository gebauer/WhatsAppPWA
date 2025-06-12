const fs = require('fs');
const { execSync } = require('child_process');

// Read version from package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = pkg.version;

// Get short git commit hash
let build = 'unknown';
try {
  build = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  // ignore
}

// Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace placeholders
html = html.replace(
  /<span id="version">.*?<\/span>/,
  `<span id="version">${version}</span>`
);
html = html.replace(
  /<span id="build">.*?<\/span>/,
  `<span id="build">${build}</span>`
);

// Write back to index.html
fs.writeFileSync('index.html', html);

console.log(`Injected version ${version} and build ${build} into index.html`); 