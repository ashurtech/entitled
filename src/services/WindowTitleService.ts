import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export interface TitleComponents {
    workspace: string;
    branch: string;
    filename: string;
}

export class WindowTitleService {
    private disposables: vscode.Disposable[] = [];
    private titleUpdateCallbacks: ((title: string) => void)[] = [];

    constructor() {
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Listen for active editor changes
        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(() => {
                this.handleActiveEditorChange();
            })
        );

        // Listen for workspace changes
        this.disposables.push(
            vscode.workspace.onDidChangeWorkspaceFolders(() => {
                this.updateTitle();
            })
        );
    }    public extractWorkspaceName(workspace: vscode.WorkspaceFolder | undefined): string {
        if (!workspace) {
            return '';
        }

        if (workspace.name && workspace.name.trim() !== '') {
            return workspace.name;
        }

        // Extract folder name from URI
        return path.basename(workspace.uri.fsPath);
    }    public async extractBranchName(workspacePath: string): Promise<string> {
        try {
            // Try to get branch name from VS Code's built-in git API
            const gitExtension = vscode.extensions.getExtension('vscode.git');
            if (gitExtension && gitExtension.isActive) {
                const git = gitExtension.exports.getAPI(1);
                const repository = git.repositories.find((repo: any) => 
                    workspacePath.startsWith(repo.rootUri.fsPath)
                );
                
                if (repository && repository.state.HEAD) {
                    return repository.state.HEAD.name || '';
                }
            }
            
            // Fallback: Try to read .git/HEAD file directly
            const gitHeadPath = path.join(workspacePath, '.git', 'HEAD');
            if (fs.existsSync(gitHeadPath)) {
                const headContent = fs.readFileSync(gitHeadPath, 'utf8').trim();
                if (headContent.startsWith('ref: refs/heads/')) {
                    return headContent.replace('ref: refs/heads/', '');
                }
            }
            
            return '';
        } catch (error) {
            console.warn('Failed to extract git branch name:', error);
            return '';
        }
    }

    public extractFileName(editor: vscode.TextEditor | undefined): string {
        if (!editor) {
            return '';
        }

        return path.basename(editor.document.fileName);
    }    public composeTitle(components: TitleComponents): string {
        // Check if custom title is enabled
        const config = vscode.workspace.getConfiguration('entitled');
        const isCustomTitleEnabled = config.get<boolean>('enableCustomTitle', true);
        
        if (!isCustomTitleEnabled) {
            // Return default VS Code title behavior
            return '';
        }
        
        // Get custom pattern from configuration
        const customPattern = config.get<string>('titlePattern');
        if (customPattern && customPattern !== '{workspace} {branch} {filename} - VSCode') {
            return this.composeCustomTitle(customPattern, components);
        }
        
        return this.composeDefaultTitle(components);
    }

    public composeDefaultTitle(components: TitleComponents): string {
        // Default pattern: workspace [branch] filename - VSCode
        const parts: string[] = [];

        // Add workspace name if available
        if (components.workspace) {
            parts.push(components.workspace);
        }

        // Add branch name in brackets if available
        if (components.branch) {
            parts.push(`[${components.branch}]`);
        }

        // Add filename if available
        if (components.filename) {
            parts.push(components.filename);
        }

        // Add VSCode at the end
        const title = parts.length > 0 ? `${parts.join(' ')} - VSCode` : 'VSCode';
        
        return title;
    }

    public composeCustomTitle(pattern: string, components: TitleComponents): string {
        let result = pattern;
        
        result = result.replace('{workspace}', components.workspace);
        result = result.replace('{branch}', components.branch);
        result = result.replace('{filename}', components.filename);
        
        return result;
    }    public async updateTitle(): Promise<void> {
        const components = await this.gatherTitleComponents();
        const title = this.composeTitle(components);
        
        // Notify callbacks
        this.titleUpdateCallbacks.forEach(callback => callback(title));
        
        // Update the window title using VS Code's window.title setting
        try {
            const config = vscode.workspace.getConfiguration('window');
            // Use Global configuration target if workspace is not available
            const configTarget = vscode.workspace.workspaceFolders 
                ? vscode.ConfigurationTarget.Workspace 
                : vscode.ConfigurationTarget.Global;
            await config.update('title', title, configTarget);
        } catch (error) {
            console.warn('Failed to update window title:', error);
        }
    }

    public async handleActiveEditorChange(): Promise<void> {
        await this.updateTitle();
    }

    public onTitleUpdate(callback: (title: string) => void): void {
        this.titleUpdateCallbacks.push(callback);
    }

    private async gatherTitleComponents(): Promise<TitleComponents> {
        const workspace = vscode.workspace.workspaceFolders?.[0];
        const workspaceName = this.extractWorkspaceName(workspace);
        
        const branchName = workspace 
            ? await this.extractBranchName(workspace.uri.fsPath)
            : '';
            
        const filename = this.extractFileName(vscode.window.activeTextEditor);

        return {
            workspace: workspaceName,
            branch: branchName,
            filename: filename
        };
    }

    public dispose(): void {
        this.disposables.forEach(disposable => disposable.dispose());
        this.disposables = [];
        this.titleUpdateCallbacks = [];
    }
}
