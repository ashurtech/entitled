import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');
		
		// Check if we're running in CI/headless environment
		const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
		
		// Download VS Code, unzip it and run the integration test
		await runTests({ 
			extensionDevelopmentPath, 
			extensionTestsPath,
			// Add launch arguments for headless environments and CI
			launchArgs: [
				'--no-sandbox',
				'--disable-updates',
				'--skip-welcome',
				'--skip-release-notes',
				'--disable-workspace-trust',
				'--disable-extensions',
				'--disable-gpu',
				'--disable-dev-shm-usage',
				'--disable-background-timer-throttling',
				'--disable-backgrounding-occluded-windows',
				'--disable-renderer-backgrounding',
				'--disable-features=TranslateUI',
				'--disable-ipc-flooding-protection',
				...(isCI ? ['--headless'] : [])
			]
		});
	} catch (err) {
		console.error('Failed to run tests:', err);
		process.exit(1);
	}
}

main();
