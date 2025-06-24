# Extension Icon Setup

## Current Configuration

- **Icon file**: `cake.png` (128x128 pixels, PNG format)
- **Source**: Converted from `cake-colorful.svg` with dark-background optimization  
- **Package.json**: Configured with `"icon": "cake.png"`
- **Design**: Golden cake with colorful decorations, visible on both light and dark backgrounds

## Files

- `cake-colorful.svg` - Optimized SVG icon with colors for dark background compatibility
- `cake.svg` - Original black SVG icon design
- `cake.png` - Extension marketplace icon (auto-generated from colorful SVG)
- `create-dark-friendly-icon.js` - Conversion script for dark-friendly icon
- `svg-to-png.js` - Original conversion script using Sharp library
- `convert-icon.js` - Helper script for manual conversion guidance
- `generate-icon.js` - Alternative generation script

## VS Code Extension Icon Requirements

- **Format**: PNG (SVG not supported)
- **Size**: 128x128 pixels minimum
- **Quality**: High resolution for marketplace display
- **Background**: Transparent or solid color

## Regenerating the Icon

If you need to update the icon from the SVG source:

```bash
# Ensure Sharp is installed
npm install --save-dev sharp

# Create dark-friendly colorful icon (recommended)
node create-dark-friendly-icon.js

# Or convert original black SVG (for light backgrounds only)
node svg-to-png.js
```

## Manual Conversion Options

If the automated script doesn't work:

1. **Online**: [Convertio SVG to PNG](https://convertio.co/svg-png/) (set to 128x128 pixels)
2. **VS Code**: Install SVG extension, right-click → "Export PNG"
3. **Graphics software**: GIMP, Inkscape, or Photoshop

The extension is now properly configured with the cake icon for the VS Code marketplace! 🎂
