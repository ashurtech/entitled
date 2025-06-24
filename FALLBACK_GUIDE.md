# Fallback Pattern Guide - Entitled Extension

## Overview

The fallback pattern feature allows you to create robust window title configurations that gracefully handle missing information. Using the `||` operator, you can specify multiple variables in order of preference.

## Basic Syntax

```
{variable1 || variable2 || variable3}
```

The extension will use the first non-empty variable from left to right.

## Available Variables

- `{workspace}` - VS Code workspace/folder name
- `{repo}` - Git repository name (from git config)
- `{branch}` - Current git branch
- `{filename}` - Active file name
- `{timestamp}` - Last modification time (updates on window focus loss)

## Common Fallback Patterns

### Project Identification
```json
{
  "entitled.titlePattern": "{workspace || repo || filename}"
}
```
**Use Case:** Always show some project identifier, preferring workspace name, falling back to git repo name, then to just the filename.

### Project with Context
```json
{
  "entitled.titlePattern": "{workspace || repo} [{branch || filename}] (last: {timestamp})"
}
```
**Use Case:** Show project name with either branch context or filename, plus timestamp.

### Minimal but Smart
```json
{
  "entitled.titlePattern": "{timestamp} | {workspace || repo || filename}"
}
```
**Use Case:** Time-focused view with best available project identifier.

### Development-Focused
```json
{
  "entitled.titlePattern": "{repo || workspace} - {branch} - {filename}"
}
```
**Use Case:** Git-first approach, always showing branch and filename when available.

## Real-World Examples

### Scenario 1: Git Project with Custom Workspace Name
**Pattern:** `{workspace || repo} [{branch}] {filename}`
**Result:** `MyProject [feature/auth] login.ts`

### Scenario 2: Git Project with Default Folder Name
**Pattern:** `{workspace || repo} [{branch}] {filename}`
**Result:** `awesome-app [main] index.js` (uses repo name when workspace name isn't helpful)

### Scenario 3: Non-Git Project
**Pattern:** `{workspace || repo || filename} (last: {timestamp})`
**Result:** `script.py (last: 5m ago)` (gracefully handles no git info)

### Scenario 4: Complex Fallback Chain
**Pattern:** `{workspace || repo || filename} | {branch || timestamp}`
**Result:** `MyProject | 2h ago` (shows project name and falls back to timestamp when no branch)

## Best Practices

1. **Start with Most Specific**: Put the most specific variable first: `{workspace || repo}`

2. **Always Have a Fallback**: Ensure there's always something to show: `{workspace || repo || filename}`

3. **Consider Your Workflow**: 
   - Git-heavy? Use `{repo || workspace}`
   - File-focused? Use `{filename || workspace}`
   - Time-tracking? Include `{timestamp}`

4. **Test Edge Cases**: Make sure your pattern works with:
   - No git repository
   - No workspace name
   - No active file
   - Empty branches

## Migration from Simple Patterns

### Old Pattern
```json
{
  "entitled.titlePattern": "{workspace} [{branch}] {filename}"
}
```

### New Pattern with Fallbacks
```json
{
  "entitled.titlePattern": "{workspace || repo} [{branch || filename}] (last: {timestamp})"
}
```

**Benefits:**
- Shows repo name when workspace name is generic
- Shows filename when no branch is available
- Adds timestamp for context
- Never shows empty brackets

## Troubleshooting

**Empty Sections in Title?**
Add fallbacks: `{branch || filename}` instead of just `{branch}`

**Title Too Long?**
Use selective fallbacks: `{repo || filename}` for shorter titles

**Missing Project Context?**
Use: `{workspace || repo || filename}` for maximum coverage

**Want Git-First Approach?**
Use: `{repo || workspace}` to prefer repository name over workspace name
