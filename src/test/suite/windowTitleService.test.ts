import * as assert from 'assert';
import * as vscode from 'vscode';
import { WindowTitleService } from '../../services/WindowTitleService';

suite('WindowTitleService Tests', () => {
    let windowTitleService: WindowTitleService;

    setup(() => {
        windowTitleService = new WindowTitleService();
    });

    teardown(() => {
        // Clean up any modifications
        windowTitleService.dispose();
    });

    suite('Title Component Extraction', () => {        test('should extract workspace name when workspace is available', () => {
            const mockWorkspace = {
                name: 'my-project',
                uri: vscode.Uri.file('/path/to/my-project'),
                index: 0
            };
            
            const result = windowTitleService.extractWorkspaceName(mockWorkspace);
            assert.strictEqual(result, 'my-project');
        });        test('should extract folder name when workspace name is unavailable', () => {
            const mockWorkspace = {
                name: '',
                uri: vscode.Uri.file('/path/to/project-folder'),
                index: 0
            } as vscode.WorkspaceFolder;
            
            const result = windowTitleService.extractWorkspaceName(mockWorkspace);
            assert.strictEqual(result, 'project-folder');
        });

        test('should return empty string when no workspace is available', () => {
            const result = windowTitleService.extractWorkspaceName(undefined);
            assert.strictEqual(result, '');
        });

        test('should extract branch name from git repository', async () => {
            // This will be mocked in implementation
            const result = await windowTitleService.extractBranchName('/path/to/repo');
            assert.strictEqual(typeof result, 'string');
        });

        test('should extract repository name from git repository', async () => {
            // This will be mocked in implementation
            const result = await windowTitleService.extractRepoName('/path/to/repo');
            assert.strictEqual(typeof result, 'string');
        });

        test('should extract filename from active editor', () => {
            const mockEditor = {
                document: {
                    fileName: '/path/to/file.ts',
                    uri: vscode.Uri.file('/path/to/file.ts')
                }
            };
            
            const result = windowTitleService.extractFileName(mockEditor as any);
            assert.strictEqual(result, 'file.ts');
        });

        test('should return empty string when no active editor', () => {
            const result = windowTitleService.extractFileName(undefined);
            assert.strictEqual(result, '');
        });
    });    suite('Title Composition', () => {        test('should compose title with all components available', () => {
            const components = {
                workspace: 'my-project',
                repo: 'my-repo',
                branch: 'feature/new-feature',
                filename: 'index.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'my-project [feature/new-feature] index.ts - VSCode');
        });        test('should compose title with workspace and filename only', () => {
            const components = {
                workspace: 'my-project',
                repo: 'my-repo',
                branch: '',
                filename: 'index.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'my-project index.ts - VSCode');
        });        test('should compose title with filename only', () => {
            const components = {
                workspace: '',
                repo: '',
                branch: '',
                filename: 'index.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'index.ts - VSCode');
        });        test('should compose title with just VSCode when no components', () => {
            const components = {
                workspace: '',
                repo: '',
                branch: '',
                filename: '',
                timestamp: 'now'
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'VSCode');
        });        test('should handle branch name with special characters', () => {
            const components = {
                workspace: 'my-project',
                repo: 'my-repo',
                branch: 'feature/bug-fix-#123',
                filename: 'app.js',
                timestamp: 'now'
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'my-project [feature/bug-fix-#123] app.js - VSCode');
        });
    });

    suite('Window Title Updates', () => {
        test('should update window title when workspace changes', async () => {
            let titleUpdateCalled = false;
            let updatedTitle = '';

            // Mock the title update function
            windowTitleService.onTitleUpdate((title: string) => {
                titleUpdateCalled = true;
                updatedTitle = title;
            });

            await windowTitleService.updateTitle();
            
            assert.strictEqual(titleUpdateCalled, true);
            assert.strictEqual(typeof updatedTitle, 'string');
        });

        test('should update window title when active editor changes', async () => {
            let updateCount = 0;

            windowTitleService.onTitleUpdate(() => {
                updateCount++;
            });

            // Simulate editor change
            await windowTitleService.handleActiveEditorChange();
            
            assert.strictEqual(updateCount, 1);
        });
    });    suite('Configuration', () => {        test('should respect custom title pattern when configured', () => {
            const customPattern = '{filename} | {workspace} | {branch}';
            const components = {
                workspace: 'my-project',
                repo: 'my-repo',
                branch: 'main',
                filename: 'test.ts',
                timestamp: '5m ago'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'test.ts | my-project | main');
        });        test('should handle missing components in custom pattern', () => {
            const customPattern = '{filename} | {workspace} | {branch}';
            const components = {
                workspace: 'my-project',
                repo: 'my-repo',
                branch: '',
                filename: 'test.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'test.ts | my-project | ');
        });        test('should include timestamp in custom pattern', () => {
            const customPattern = '{filename} ({timestamp}) - {workspace}';
            const components = {
                workspace: 'my-project',
                repo: 'my-repo',
                branch: 'main',
                filename: 'test.ts',
                timestamp: '10m ago'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'test.ts (10m ago) - my-project');
        });        test('should include repo name in custom pattern', () => {
            const customPattern = '{repo} [{branch}] {filename}';
            const components = {
                workspace: 'my-project',
                repo: 'awesome-project',
                branch: 'feature/new-feature',
                filename: 'app.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'awesome-project [feature/new-feature] app.ts');
        });

        test('should handle fallback patterns with || syntax', () => {
            const customPattern = '{workspace || repo || filename}';
            const components = {
                workspace: '',
                repo: 'my-repo',
                branch: 'main',
                filename: 'app.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'my-repo');
        });

        test('should fall back to third option when first two are empty', () => {
            const customPattern = '{workspace || repo || filename}';
            const components = {
                workspace: '',
                repo: '',
                branch: 'main',
                filename: 'app.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'app.ts');
        });

        test('should use first non-empty value in fallback chain', () => {
            const customPattern = '{workspace || repo || filename}';
            const components = {
                workspace: 'my-workspace',
                repo: 'my-repo',
                branch: 'main',
                filename: 'app.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'my-workspace');
        });

        test('should return empty string when all fallback options are empty', () => {
            const customPattern = '{workspace || repo || branch}';
            const components = {
                workspace: '',
                repo: '',
                branch: '',
                filename: 'app.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, '');
        });

        test('should handle multiple fallback patterns in one title', () => {
            const customPattern = '{workspace || repo} - {branch || filename}';
            const components = {
                workspace: '',
                repo: 'my-repo',
                branch: '',
                filename: 'app.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'my-repo - app.ts');
        });

        test('should handle fallback with spaces around || operator', () => {
            const customPattern = '{workspace  ||  repo  ||  filename}';
            const components = {
                workspace: '',
                repo: '',
                branch: 'main',
                filename: 'app.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'app.ts');
        });

        test('should work with single variables (no fallback)', () => {
            const customPattern = '{filename} - {workspace}';
            const components = {
                workspace: 'my-project',
                repo: 'my-repo',
                branch: 'main',
                filename: 'app.ts',
                timestamp: 'now'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'app.ts - my-project');
        });

        test('should handle complex pattern with fallbacks and regular variables', () => {
            const customPattern = '{workspace || repo} [{branch}] {filename} (last: {timestamp})';
            const components = {
                workspace: '',
                repo: 'awesome-project',
                branch: 'feature/new-stuff',
                filename: 'index.ts',
                timestamp: '15m ago'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'awesome-project [feature/new-stuff] index.ts (last: 15m ago)');
        });

    });

    suite('Timestamp Functionality', () => {
        test('should format recent timestamp as "now"', () => {
            const now = new Date();
            windowTitleService.setLastModified(now);
            
            const result = windowTitleService.getFormattedTimestamp();
            assert.strictEqual(result, 'now');
        });

        test('should format minutes ago correctly', () => {
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            windowTitleService.setLastModified(fiveMinutesAgo);
            
            const result = windowTitleService.getFormattedTimestamp();
            assert.strictEqual(result, '5m ago');
        });

        test('should format hours ago correctly', () => {
            const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
            windowTitleService.setLastModified(twoHoursAgo);
            
            const result = windowTitleService.getFormattedTimestamp();
            assert.strictEqual(result, '2h ago');
        });

        test('should format days ago correctly', () => {
            const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
            windowTitleService.setLastModified(threeDaysAgo);
            
            const result = windowTitleService.getFormattedTimestamp();
            assert.strictEqual(result, '3d ago');
        });
    });
});
