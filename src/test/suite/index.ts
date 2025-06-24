import * as path from 'path';
import Mocha from 'mocha';
import { sync as globSync } from 'glob';

export function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');

	return new Promise((c, e) => {
		try {
			// Use glob.sync instead of the streaming API
			const testFiles = globSync("**/**.test.js", { cwd: testsRoot });
			
			testFiles.forEach((file: string) => {
				mocha.addFile(path.resolve(testsRoot, file));
			});

			// Run the mocha test
			mocha.run((failures: number) => {
				if (failures > 0) {
					e(new Error(`${failures} tests failed.`));
				} else {
					c();
				}
			});
		} catch (err) {
			console.error(err);
			e(new Error(String(err)));
		}
	});
}
