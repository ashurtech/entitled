import * as vscode from 'vscode';
import { WindowTitleService } from './services/WindowTitleService';

let windowTitleService: WindowTitleService;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "entitled" is now active!');

	// Initialize the window title service
	windowTitleService = new WindowTitleService();
	
	// Set up title update callback to actually update the window title
	windowTitleService.onTitleUpdate((title: string) => {
		updateWindowTitle(title);
	});

	// Initial title update
	windowTitleService.updateTitle();

	// Register the hello world command for testing
	let disposable = vscode.commands.registerCommand('entitled.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Entitled!');
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(windowTitleService);
}

export function deactivate() {
	if (windowTitleService) {
		windowTitleService.dispose();
	}
}

function updateWindowTitle(title: string) {
	// VS Code doesn't provide a direct API to set the window title
	// We need to use the `window.title` setting instead
	const config = vscode.workspace.getConfiguration('window');
	
	// Set a custom title that matches our requirements
	// This is a workaround since VS Code doesn't allow direct title setting
	config.update('title', title, vscode.ConfigurationTarget.Workspace);
}
