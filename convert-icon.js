const fs = require('fs');
const path = require('path');

// Simple script to help set up the extension icon

console.log('🎂 Setting up Extension Icon');
console.log('============================');
console.log('');

// Check if cake.png already exists
const pngPath = path.join(__dirname, 'cake.png');
const svgPath = path.join(__dirname, 'cake.svg');
const packagePath = path.join(__dirname, 'package.json');

if (fs.existsSync(pngPath)) {
    console.log('✅ cake.png already exists!');
    
    // Update package.json to include the icon
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    if (!packageJson.icon) {
        packageJson.icon = 'cake.png';
        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Updated package.json to use cake.png as icon');
    } else {
        console.log('✅ Icon already configured in package.json');
    }
    
} else {
    console.log('❌ cake.png not found. Please convert cake.svg to PNG format.');
    console.log('');
    console.log('Quick conversion options:');
    console.log('');
    console.log('1. 🌐 Online (Easiest):');
    console.log('   • Go to: https://convertio.co/svg-png/');
    console.log('   • Upload: cake.svg');
    console.log('   • Set size: 128x128 pixels');
    console.log('   • Download as: cake.png');
    console.log('');
    console.log('2. 🖥️ VS Code with SVG extension:');
    console.log('   • Install "SVG" extension in VS Code');
    console.log('   • Right-click cake.svg → "Export PNG"');
    console.log('   • Set dimensions: 128x128');
    console.log('');
    console.log('3. 🎨 Graphics software:');
    console.log('   • Open cake.svg in GIMP, Inkscape, or Photoshop');
    console.log('   • Export as PNG, 128x128 pixels');
    console.log('   • Save as cake.png in project root');
    console.log('');
    console.log('4. 📱 Quick mobile solution:');
    console.log('   • Take screenshot of cake.svg in browser');
    console.log('   • Crop to square and resize to 128x128');
    console.log('   • Save as cake.png');
    console.log('');
    console.log('After creating cake.png, run this script again to auto-configure package.json');
}

console.log('');
console.log('ℹ️  VS Code Extension Icon Requirements:');
console.log('   • Format: PNG (SVG not supported)');
console.log('   • Size: 128x128 pixels minimum');
console.log('   • Background: Transparent or solid color');
console.log('   • Style: Simple and recognizable at small sizes');
