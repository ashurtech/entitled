# CI/CD Setup Guide

This document explains how to set up the complete CI/CD pipeline for the Entitled VS Code extension.

## Overview

The CI/CD pipeline includes:
- **PR Checks**: Linting, testing, security scanning, version validation
- **Build & Publish**: Automatic marketplace publishing on merge to main
- **Security**: CodeQL analysis, dependency scanning, vulnerability alerts
- **Automation**: Dependency updates, version bumping workflows

## Required Secrets

You need to set up the following secrets in your GitHub repository:

### 1. VS Code Marketplace (Required for publishing)

1. Go to [Azure DevOps](https://dev.azure.com)
2. Create a Personal Access Token with "Marketplace (Manage)" scope
3. Add the token as `VSCE_PAT` secret in GitHub repository settings

### 2. Open VSX Registry (Optional, for wider distribution)

1. Go to [Open VSX](https://open-vsx.org)
2. Create an account and generate an access token
3. Add the token as `OVSX_PAT` secret in GitHub repository settings

### 3. Snyk Security Scanning (Optional)

1. Sign up at [Snyk.io](https://snyk.io)
2. Get your API token from account settings
3. Add the token as `SNYK_TOKEN` secret in GitHub repository settings

## Branch Protection Rules

Set up branch protection for `main` branch:

1. Go to Repository Settings → Branches
2. Add rule for `main` branch:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Required status checks:
     - `lint-and-test (16.x)`
     - `lint-and-test (18.x)`
     - `lint-and-test (20.x)`
     - `version-check`
     - `security-scan`
     - `dependency-review`
   - Require branches to be up to date before merging
   - Restrict pushes that create files that match `.github/workflows/*`

## Workflow Details

### PR Checks (`pr-checks.yml`)
Runs on every pull request and push to main:
- **Multi-Node Testing**: Tests on Node.js 16, 18, and 20
- **Security Audit**: Checks for known vulnerabilities
- **Linting**: Ensures code style consistency
- **Version Validation**: Requires version bump in PRs
- **Dependency Review**: Scans for malicious dependencies

### Build & Publish (`build-and-publish.yml`)
Runs on merge to main:
- **Build & Test**: Full compilation and testing
- **Package**: Creates `.vsix` file
- **Publish**: Uploads to VS Code Marketplace and Open VSX
- **Release**: Creates GitHub release with artifacts

### Security Analysis (`codeql.yml`)
- **Weekly Scans**: Automated security analysis
- **PR Scanning**: Checks new code for vulnerabilities
- **Extended Queries**: Uses GitHub's security query suite

### Dependency Updates (`dependency-updates.yml`)
- **Weekly Updates**: Checks for dependency updates
- **Safe Updates**: Only minor/patch versions
- **Auto PR**: Creates PR with updates if available

### Version Bumping (`version-bump.yml`)
- **Manual Trigger**: Workflow dispatch for version bumps
- **Changelog**: Automatically updates CHANGELOG.md
- **Git Tags**: Creates version tags

## Development Workflow

### For Contributors

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/my-awesome-feature
   ```

2. **Make Changes**: Implement your feature

3. **Bump Version**: Update `package.json` version
   ```bash
   npm version patch  # or minor/major
   ```

4. **Create PR**: Push branch and create pull request

5. **Wait for Checks**: All CI checks must pass

6. **Merge**: Maintainer merges PR

7. **Automatic Publishing**: Extension publishes to marketplace

### For Maintainers

#### Publishing a Release

1. **Merge PR**: All changes automatically publish from main
2. **Manual Version Bump**: Use the "Auto Version Bump" workflow if needed
3. **Monitor**: Check Actions tab for publish status

#### Managing Dependencies

1. **Auto Updates**: PRs created weekly for dependency updates
2. **Security Alerts**: Review Dependabot alerts
3. **Manual Updates**: Use `npm update` and create PR

## Security Features

### Vulnerability Scanning
- **npm audit**: Built into CI pipeline
- **Snyk**: Advanced vulnerability scanning
- **CodeQL**: Static analysis for security issues
- **Dependency Review**: Blocks malicious dependencies

### Access Control
- **Branch Protection**: Prevents direct pushes to main
- **Required Reviews**: All changes need approval
- **Status Checks**: Must pass CI before merge

### Secret Management
- **Environment Isolation**: Secrets only in production
- **Minimal Permissions**: Tokens with minimal required scope
- **Rotation**: Regular token rotation recommended

## Troubleshooting

### Failed Publications
1. Check marketplace token (`VSCE_PAT`) is valid
2. Verify publisher name matches `package.json`
3. Ensure version number was bumped

### Version Check Failures
1. Update version in `package.json`
2. Use semantic versioning (major.minor.patch)
3. Ensure version is higher than base branch

### Security Failures
1. Run `npm audit fix` locally
2. Update vulnerable dependencies
3. Review Snyk/CodeQL reports for details

## Monitoring

### GitHub Actions
- Monitor workflow runs in Actions tab
- Set up notifications for failed workflows
- Review security alerts regularly

### Marketplace
- Monitor download stats
- Review user feedback and issues
- Track version adoption

## Next Steps

1. Set up required secrets
2. Configure branch protection
3. Test workflow with a sample PR
4. Monitor first publication
5. Set up regular maintenance schedule
