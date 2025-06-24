# Contributing to Entitled

Thank you for your interest in contributing to Entitled! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

- Node.js 16.x, 18.x, or 20.x (18.x recommended)
- npm 8.x or higher
- VS Code (for testing the extension)
- Git

### Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/ashurtech/entitled.git
   cd entitled
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Extension**
   ```bash
   npm run compile
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

## Development Workflow

### Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Locally**
   ```bash
   npm run compile
   npm test
   npm run lint
   ```

4. **Test in VS Code**
   - Press `F5` to run the extension in a new VS Code window
   - Test your changes thoroughly

### Version Management

**Version bumping is flexible** - you can bump versions when needed for releases.

- **Patch** (0.0.X): Bug fixes, small improvements
- **Minor** (0.X.0): New features, backwards compatible
- **Major** (X.0.0): Breaking changes

Use npm scripts when you want to bump the version:
```bash
npm run version:patch  # For bug fixes
npm run version:minor  # For new features  
npm run version:major  # For breaking changes
```

**Note**: Version bumps are not required for every PR. You can manage versions manually or use the automated version-bump workflow for releases.

### Code Standards

#### TypeScript
- Use TypeScript strict mode
- Prefer explicit types over `any`
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

#### Testing
- Write tests for all new functionality
- Follow the existing test patterns
- Aim for good test coverage
- Test both success and error cases

#### Git Commits
Use conventional commit format:
```
type(scope): description

feat(title): add branch name to window title
fix(config): handle missing workspace folders
docs(readme): update installation instructions
test(service): add tests for title generation
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `chore`

## Pull Request Process

1. **Before Creating PR**
   - [ ] Code compiles without errors
   - [ ] All tests pass
   - [ ] Linting passes
   - [ ] Version bumped in package.json
   - [ ] Documentation updated if needed

2. **PR Description**
   - Use the provided PR template
   - Describe what changes and why
   - Include screenshots for UI changes
   - Reference any related issues

3. **Review Process**
   - All CI checks must pass
   - At least one maintainer approval required
   - Address review feedback promptly

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

### Test Structure
- Unit tests in `src/test/suite/`
- Integration tests for VS Code APIs
- Mock external dependencies appropriately

### Writing Tests
```typescript
import * as assert from 'assert';
import { WindowTitleService } from '../../services/WindowTitleService';

suite('WindowTitleService Tests', () => {
    test('should format title correctly', () => {
        const service = new WindowTitleService();
        const result = service.formatTitle('workspace', 'main', 'file.ts');
        assert.strictEqual(result, 'workspace main file.ts - VSCode');
    });
});
```

## Architecture

### Extension Structure
```
src/
├── extension.ts          # Main extension entry point
├── services/            # Business logic services
│   └── WindowTitleService.ts
└── test/               # Test files
    ├── runTest.ts      # Test runner
    └── suite/          # Test suites
```

### Key Components

#### WindowTitleService
- Core service for title formatting
- Handles workspace, branch, and filename detection
- Manages VS Code window title updates

#### Extension Activation
- Registers commands and event listeners
- Initializes services
- Handles configuration changes

## Security

### Dependencies
- Keep dependencies up to date
- Review security advisories
- Use `npm audit` to check for vulnerabilities

### Code Review
- No secrets in code
- Validate all inputs
- Handle errors gracefully
- Follow principle of least privilege

## Documentation

### Code Documentation
- JSDoc comments for public APIs
- Inline comments for complex logic
- README updates for user-facing changes

### User Documentation
- Update README.md for new features
- Add configuration examples
- Include troubleshooting guides

## Release Process

### Automated Publishing
- Merges to `main` trigger automatic publishing
- Version must be bumped in PR
- GitHub release created automatically
- Published to VS Code Marketplace and Open VSX

### Manual Testing Before Release
1. Install packaged extension locally
2. Test in different VS Code configurations
3. Verify settings work correctly
4. Check marketplace compatibility

## Getting Help

### Questions
- Check existing issues and discussions
- Create a discussion for questions
- Use appropriate issue templates

### Reporting Bugs
- Use the bug report template
- Include reproduction steps
- Provide environment details
- Share relevant configuration

### Feature Requests
- Use the feature request template
- Explain the use case
- Describe expected behavior
- Consider implementation complexity

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the project

Thank you for contributing to Entitled! 🎉
