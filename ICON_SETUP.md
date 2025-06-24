# Extension Icon Setup

## Current Configuration

- **Icon file**: `cake.png` (128x128 pixels, PNG format)
- **Source**: Converted from `cake.svg` using high-quality conversion
- **Package.json**: Configured with `"icon": "cake.png"`

## Files

- `cake.svg` - Original SVG icon design
- `cake.png` - Extension marketplace icon (auto-generated from SVG)
- `svg-to-png.js` - Conversion script using Sharp library
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

# Convert SVG to PNG
node svg-to-png.js
```

## Manual Conversion Options

If the automated script doesn't work:

1. **Online**: [Convertio SVG to PNG](https://convertio.co/svg-png/) (set to 128x128 pixels)
2. **VS Code**: Install SVG extension, right-click → "Export PNG"
3. **Graphics software**: GIMP, Inkscape, or Photoshop

The extension is now properly configured with the cake icon for the VS Code marketplace! 🎂
