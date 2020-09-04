import { red } from 'colors';
import arbitrageScanner from './arbitrage-scanner';

(async () => {
	try {
		await arbitrageScanner.start();
	} catch (error) {
		console.error('');
		console.error(red(error));
		console.error('');
		process.exit(1);
	}
})();
