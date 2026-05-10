const fs = require('fs');
let js = fs.readFileSync('js/main.js', 'utf8');

// Remove pkgData object and all pkg functions from main.js
// They are now defined inline in HTML
js = js.replace(/\/\* ─+\s*12\. PACKAGE DETAIL PAGES[\s\S]*$/, '');

fs.writeFileSync('js/main.js', js.trimEnd() + '\n');
console.log('Removed duplicate pkg functions from main.js');
console.log('New length:', js.length);
