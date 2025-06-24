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
		
		// Base launch arguments for all environments
		const baseLaunchArgs = [
			'--no-sandbox',
			'--disable-updates',
			'--skip-welcome',
			'--skip-release-notes',
			'--disable-workspace-trust',
			'--disable-extensions',
			'--disable-gpu',
			'--disable-dev-shm-usage'
		];
		
		// Additional CI-specific arguments
		const ciLaunchArgs = [
			'--disable-background-timer-throttling',
			'--disable-backgrounding-occluded-windows',
			'--disable-renderer-backgrounding',
			'--disable-features=TranslateUI,VizDisplayCompositor',
			'--disable-ipc-flooding-protection',
			'--disable-web-security',
			'--disable-software-rasterizer',
			'--remote-debugging-port=9222',
			'--disable-dbus'
		];
		
		// Combine arguments based on environment
		const launchArgs = isCI ? [...baseLaunchArgs, ...ciLaunchArgs] : baseLaunchArgs;
		
		console.log(`Running tests in ${isCI ? 'CI' : 'local'} environment`);
		console.log(`Launch args: ${launchArgs.join(' ')}`);
		
		// Download VS Code, unzip it and run the integration test
		await runTests({ 
			extensionDevelopmentPath, 
			extensionTestsPath,
			launchArgs
		});
	} catch (err) {
		console.error('Failed to run tests:', err);
		process.exit(1);
	}
}

main();
