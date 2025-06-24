# Entitled - Custom Window Titles for VS Code

[![Version](https://img.shields.io/visual-studio-marketplace/v/your-publisher-name.entitled)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.entitled)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/your-publisher-name.entitled)](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.entitled)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A VS Code extension that customizes window titles to show the information you actually need: **workspace name**, **git branch**, and **current filename**.

## ✨ Features

- 🏷️ **Smart Window Titles**: Display workspace, branch, and filename in a clean format
- 🌳 **Git Integration**: Automatically detects current branch using VS Code's built-in Git API  
- ⚙️ **Fully Customizable**: Create your own title patterns with template variables
- 🔄 **Real-time Updates**: Titles update automatically when you switch files or branches
- 🎯 **Lightweight**: Minimal performance impact with comprehensive test coverage

## 🚀 Quick Start

1. Install the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.entitled)
2. Open any workspace with a Git repository
3. Your window title will automatically show: `workspace-name [branch-name] filename.ext - VSCode`

## 📋 Default Format

```
my-project [feature/new-feature] index.ts - VSCode
```

**Components:**
- `my-project` - Workspace or folder name
- `[feature/new-feature]` - Current git branch (if available)
- `index.ts` - Active filename (if any)
- `VSCode` - Always included

## ⚙️ Configuration

### Enable/Disable Custom Titles
```json
{
  "entitled.enableCustomTitle": true
}
```

### Custom Title Patterns
```json
{
  "entitled.titlePattern": "{workspace} | {branch} | {filename}"
}
```

**Available Variables:**
- `{workspace}` - Workspace or folder name
- `{branch}` - Current git branch
- `{filename}` - Active file name

**Example Patterns:**
```json
// Default format
"{workspace} [{branch}] {filename} - VSCode"

// Pipe separated
"{workspace} | {branch} | {filename}"

// Minimal format
"{workspace} - {filename}"

// Branch focused
"[{branch}] {workspace}/{filename}"
```

## 🛠️ Development

Built with Test-Driven Development and comprehensive testing.

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/entitled.git
cd entitled

# Install dependencies
npm install

# Start development
npm run watch
```

### Testing
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Lint code
npm run lint
```

### Building
```bash
# Compile TypeScript
npm run compile

# Clean build
npm run clean && npm run compile

# Package extension
npm run package
```

## 🧪 Test Coverage

- ✅ 16 comprehensive tests covering all functionality
- ✅ Title component extraction and composition
- ✅ Git branch detection with fallbacks
- ✅ Configuration handling and edge cases
- ✅ Real-time update mechanisms

## 🏗️ Architecture

- **WindowTitleService**: Core service handling title composition and updates
- **Git Integration**: Uses VS Code's Git API with `.git/HEAD` fallback
- **Event-Driven**: Listens to workspace and editor changes
- **Configuration-Aware**: Respects most user preferences and custom patterns

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Run tests: `npm test`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=your-publisher-name.entitled)
- [GitHub Repository](https://github.com/your-username/entitled)
- [Issue Tracker](https://github.com/your-username/entitled/issues)
- [Changelog](CHANGELOG.md)

## 🙋‍♂️ Support

If you encounter any issues or have feature requests, please [open an issue](https://github.com/your-username/entitled/issues) on GitHub.

---

**Made with ❤️ using Test-Driven Development**
