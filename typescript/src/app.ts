import { red } from 'colors';
import arbitrageScanner from './arbitrage-scanner';

(async () => {
	try {
		await arbitrageScanner.start();
	} catch (error) {
		console.error(`\n ${red(error)} \n`);
		process.exit(1);
	}
})();
