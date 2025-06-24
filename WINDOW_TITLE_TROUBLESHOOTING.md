# Window Title Troubleshooting Guide

This guide helps you troubleshoot issues with the window title not updating as expected.

## Common Issues and Solutions

### 1. Window Title Not Updating Visually

**Problem**: The extension appears to be working (no errors in output), but the window title doesn't change visually.

**Possible Causes**:

- VS Code's window title behavior varies based on platform and window manager
- The title pattern might be evaluating to empty strings
- Multiple extensions might be conflicting with window title updates
- VS Code workspace settings might be overriding the title

**Solutions**:

1. **Check the Output Panel**:
   - Open `View` > `Output`
   - Select "Entitled" from the dropdown
   - Look for debug messages showing what title is being set

2. **Use Manual Commands**:
   - Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Run `Entitled: Refresh Window Title` to manually trigger an update
   - Run `Entitled: Reset Window Title to Default` to restore VS Code's default

3. **Check Your Title Pattern**:
   - Open Settings (`Ctrl+,` / `Cmd+,`)
   - Search for "entitled"
   - Verify your `entitled.titlePattern` setting
   - Try a simple pattern like `{workspace} - Test` to verify functionality

4. **Verify Workspace Context**:
   - Ensure you have a folder/workspace open in VS Code
   - The extension works best with open workspaces/folders
   - Try opening a git repository to test all variables

### 2. Variables Showing Empty Values

**Problem**: Title pattern uses variables like `{workspace}`, `{branch}`, `{repo}` but they appear empty.

**Solutions**:

1. **For `{workspace}`**:
   - Ensure you have opened a folder/workspace in VS Code
   - Check if the folder has a meaningful name

2. **For `{branch}` and `{repo}`**:
   - Ensure the workspace is a git repository
   - Check that `.git` folder exists in your workspace
   - Try running `git status` in the terminal to verify git is working

3. **For `{filename}`**:
   - Open a file in the editor
   - The variable only shows when a file is active

4. **For `{timestamp}`**:
   - This shows the last activity time
   - Try switching between different VS Code windows to update it

### 3. Extension Not Working in Specific Environments

**Problem**: Extension works on some machines but not others.

**Possible Causes**:

- Different VS Code versions
- Different operating systems
- Conflicting extensions
- Corporate/restricted environments

**Solutions**:

1. **Check VS Code Version**:
   - Ensure VS Code version 1.74.0 or later
   - Update VS Code if necessary

2. **Check for Extension Conflicts**:
   - Disable other extensions that might affect window titles
   - Test with a clean VS Code profile

3. **Platform-Specific Issues**:
   - **Windows**: Window title updates should work reliably
   - **macOS**: Some window managers might override title changes
   - **Linux**: Depends on window manager (GNOME, KDE, etc.)

### 4. Fallback Patterns Not Working

**Problem**: Fallback patterns like `{workspace || repo || filename}` don't work as expected.

**Solutions**:

1. **Check Pattern Syntax**:

   ```text
   Correct: {workspace || repo || filename}
   Incorrect: {workspace | repo | filename}
   Incorrect: {workspace || repo || filename
   ```

2. **Verify Variable Values**:
   - Use simple patterns to test each variable individually
   - Example: `{workspace}` then `{repo}` then `{filename}`

3. **Test Complex Patterns Gradually**:

   ```text
   Start with: {workspace}
   Then try: {workspace || repo}
   Finally: {workspace || repo || filename}
   ```

## Debug Mode

To enable detailed debugging:

1. Open Developer Tools (`Help` > `Toggle Developer Tools`)
2. Go to the Console tab
3. Look for messages starting with "Entitled:"
4. These show exactly what the extension is trying to do

## Manual Testing Commands

The extension provides these commands for testing:

- **`Entitled: Refresh Window Title`** - Manually trigger a title update
- **`Entitled: Reset Window Title to Default`** - Restore VS Code's default title

Access these via Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).

## Reporting Issues

If you're still experiencing issues, please report them with:

1. **Your VS Code version**: `Help` > `About`
2. **Your operating system**: Windows/macOS/Linux
3. **Your title pattern**: What you have in settings
4. **Debug output**: Copy from Output panel
5. **Expected vs. actual behavior**: What you expected vs. what happened

## Common Working Patterns

Here are some patterns that work well:

```json
{
  "entitled.titlePattern": "{workspace || repo} [{branch}] - VSCode"
}
```

```json
{
  "entitled.titlePattern": "{filename} - {workspace || repo} - VSCode"
}
```

```json
{
  "entitled.titlePattern": "📁 {workspace || repo} 🌿 {branch} ⏰ {timestamp}"
}
```

## VS Code Settings Integration

The extension modifies VS Code's `window.title` setting. You can also manually check this:

1. Open Settings (`Ctrl+,` / `Cmd+,`)
2. Search for "window.title"
3. See what value is currently set
4. The default VS Code pattern is: `${dirty}${activeEditorShort}${separator}${rootName}${separator}${appName}`

## Performance Notes

- Title updates are triggered by:
  - Opening/closing files
  - Switching between editors
  - Workspace changes
  - Configuration changes
  - Window focus changes (for timestamp updates)

- The extension is designed to be lightweight and shouldn't impact VS Code performance.
