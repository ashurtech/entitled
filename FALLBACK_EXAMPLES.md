# Fallback Pattern Examples

This file demonstrates the powerful fallback pattern feature in the Entitled extension.

## Basic Fallback Syntax

Use the `||` operator to create fallback chains:

```json
{
  "entitled.titlePattern": "{workspace || repo || filename}"
}
```

## Real-World Examples

### Example 1: Project Identification with Fallback
```json
{
  "entitled.titlePattern": "{workspace || repo || filename} [{branch}] (last: {timestamp})"
}
```

**Scenarios:**
- **Git project with workspace name**: `my-project [main] app.ts (last: 15m ago)`
- **Git project without workspace name**: `awesome-repo [feature/new] index.js (last: 2h ago)`
- **Non-git project**: `script.py [] (last: now)`

### Example 2: Multiple Fallback Chains
```json
{
  "entitled.titlePattern": "{workspace || repo} - {branch || filename}"
}
```

**Result:** Always shows project name and either branch or filename

### Example 3: Simple Fallback
```json
{
  "entitled.titlePattern": "{timestamp} | {workspace || repo}"
}
```

**Result:** Shows timestamp and best available project identifier

## Fallback Benefits

1. **Graceful Degradation**: No empty spaces when variables are unavailable
2. **Flexible Project Identification**: Works across different project types
3. **Context Awareness**: Shows most relevant information available
4. **Backwards Compatible**: Existing patterns continue to work

## Variable Priority Recommendations

**For Project Identification:**
- `{workspace || repo || filename}` - Most flexible
- `{repo || workspace}` - Git-focused with workspace fallback

**For Context Information:**
- `{branch || filename}` - Shows current context
- `{timestamp || branch}` - Time-based or branch context
