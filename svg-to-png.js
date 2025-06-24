const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Convert cake.svg to cake.png with proper dimensions for VS Code extension

async function convertSvgToPng() {
    const svgPath = path.join(__dirname, 'cake.svg');
    const pngPath = path.join(__dirname, 'cake.png');
    
    console.log('🎂 Converting cake.svg to cake.png for VS Code extension...');
    
    try {
        // Check if SVG exists
        if (!fs.existsSync(svgPath)) {
            console.error('❌ cake.svg not found!');
            return;
        }
        
        // Read SVG content
        const svgBuffer = fs.readFileSync(svgPath);
        
        // Convert SVG to PNG with 128x128 dimensions
        await sharp(svgBuffer)
            .resize(128, 128)
            .png({
                quality: 100,
                compressionLevel: 6,
                adaptiveFiltering: false
            })
            .toFile(pngPath);
            
        console.log('✅ Successfully converted cake.svg to cake.png (128x128)');
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
        console.log('🎉 Icon setup complete! Your extension will now use the cake icon in the VS Code marketplace.');
        
    } catch (error) {
        console.error('❌ Error converting SVG to PNG:', error.message);
        console.log('');
        console.log('💡 Alternative: You can manually convert the SVG using:');
        console.log('   • Online tools: https://convertio.co/svg-png/');
        console.log('   • Set size to 128x128 pixels');
        console.log('   • Save as cake.png in the project root');
    }
}

convertSvgToPng();
