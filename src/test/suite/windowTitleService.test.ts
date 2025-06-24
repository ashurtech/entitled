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
    });    suite('Title Composition', () => {
        test('should compose title with all components available', () => {
            const components = {
                workspace: 'my-project',
                branch: 'feature/new-feature',
                filename: 'index.ts'
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'my-project [feature/new-feature] index.ts - VSCode');
        });

        test('should compose title with workspace and filename only', () => {
            const components = {
                workspace: 'my-project',
                branch: '',
                filename: 'index.ts'
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'my-project index.ts - VSCode');
        });

        test('should compose title with filename only', () => {
            const components = {
                workspace: '',
                branch: '',
                filename: 'index.ts'
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'index.ts - VSCode');
        });

        test('should compose title with just VSCode when no components', () => {
            const components = {
                workspace: '',
                branch: '',
                filename: ''
            };

            const result = windowTitleService.composeDefaultTitle(components);
            assert.strictEqual(result, 'VSCode');
        });

        test('should handle branch name with special characters', () => {
            const components = {
                workspace: 'my-project',
                branch: 'feature/bug-fix-#123',
                filename: 'app.js'
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
    });

    suite('Configuration', () => {
        test('should respect custom title pattern when configured', () => {
            const customPattern = '{filename} | {workspace} | {branch}';
            const components = {
                workspace: 'my-project',
                branch: 'main',
                filename: 'test.ts'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'test.ts | my-project | main');
        });

        test('should handle missing components in custom pattern', () => {
            const customPattern = '{filename} | {workspace} | {branch}';
            const components = {
                workspace: 'my-project',
                branch: '',
                filename: 'test.ts'
            };

            const result = windowTitleService.composeCustomTitle(customPattern, components);
            assert.strictEqual(result, 'test.ts | my-project | ');
        });
    });
});
