const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Convert the colorful cake SVG to PNG with dark background compatibility

async function createDarkFriendlyIcon() {
    const colorfulSvgPath = path.join(__dirname, 'cake-colorful.svg');
    const pngPath = path.join(__dirname, 'cake.png');
    
    console.log('🎂 Creating dark-background-friendly cake.png icon...');
    
    try {
        // Check if colorful SVG exists
        if (!fs.existsSync(colorfulSvgPath)) {
            console.error('❌ cake-colorful.svg not found!');
            return;
        }
        
        // Read SVG content
        const svgBuffer = fs.readFileSync(colorfulSvgPath);
        
        // Convert SVG to PNG with 128x128 dimensions
        await sharp(svgBuffer)
            .resize(128, 128)
            .png({
                quality: 100,
                compressionLevel: 6,
                adaptiveFiltering: false
            })
            .toFile(pngPath);
            
        console.log('✅ Successfully created dark-friendly cake.png (128x128)');
        console.log(`📁 Output: ${pngPath}`);
        
        // Verify the file was created
        const stats = fs.statSync(pngPath);
        console.log(`📊 File size: ${Math.round(stats.size / 1024 * 100) / 100} KB`);
        
        // Update package.json to use the icon
        const packagePath = path.join(__dirname, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        
        if (packageJson.icon !== 'cake.png') {
            packageJson.icon = 'cake.png';
            fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
            console.log('✅ Updated package.json to use cake.png as icon');
        } else {
            console.log('✅ package.json already configured with cake.png icon');
        }
        
        console.log('');
        console.log('🎉 Dark-friendly icon created! Features:');
        console.log('   • Golden/orange cake base with brown outline');
        console.log('   • Colorful decorative elements (pink, red, green, purple)');
        console.log('   • High contrast for visibility on dark backgrounds');
        console.log('   • Maintains cake theme while being marketplace-ready');
        console.log('');
        console.log('💡 Icon will work well on both light and dark themes!');
        
    } catch (error) {
        console.error('❌ Error converting SVG to PNG:', error.message);
        console.log('');
        console.log('💡 The original black cake.svg is available as fallback');
    }
}

createDarkFriendlyIcon();
