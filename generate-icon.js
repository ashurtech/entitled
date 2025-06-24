const { createCanvas } = require('canvas');
const fs = require('fs');

// Create a simple 128x128 cake icon
const canvas = createCanvas(128, 128);
const ctx = canvas.getContext('2d');

// Clear background (transparent)
ctx.clearRect(0, 0, 128, 128);

// Create a simple cake design
// Cake base (rectangle)
ctx.fillStyle = '#8B4513'; // Brown color
ctx.fillRect(20, 80, 88, 40);

// Cake layers
ctx.fillStyle = '#F4A460'; // Sandy brown
ctx.fillRect(25, 70, 78, 15);

ctx.fillStyle = '#DEB887'; // Burlywood
ctx.fillRect(30, 60, 68, 15);

// Candles
ctx.fillStyle = '#FFD700'; // Gold
for (let i = 0; i < 3; i++) {
    ctx.fillRect(35 + i * 20, 45, 3, 20);
}

// Flames
ctx.fillStyle = '#FF4500'; // Orange red
for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(36.5 + i * 20, 42, 3, 0, Math.PI * 2);
    ctx.fill();
}

// Cake decorations (cherries)
ctx.fillStyle = '#DC143C'; // Crimson
ctx.beginPath();
ctx.arc(45, 67, 3, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(75, 67, 3, 0, Math.PI * 2);
ctx.fill();

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('cake.png', buffer);

console.log('✅ Created cake.png icon (128x128)');

// Update package.json
const packagePath = './package.json';
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
packageJson.icon = 'cake.png';
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

console.log('✅ Updated package.json to use cake.png as icon');
console.log('🎂 Extension icon is now ready for the marketplace!');
