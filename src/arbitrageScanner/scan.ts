import Web3 from 'web3';
import checkPair from './checkPair';

const scan = (web3: Web3) => {
	let priceMonitor: NodeJS.Timeout;
	let monitoringPrice = false;
	console.log(web3);
	const monitorPrice = async () => {
		if (monitoringPrice) {
			return;
		}
		monitoringPrice = true;

		try {
			await checkPair();
		} catch (error) {
			console.error(error);
			monitoringPrice = false;
			clearInterval(priceMonitor);
			return;
		}

		monitoringPrice = false;
	};

	// Check markets every n seconds
	const POLLING_INTERVAL =
		parseInt(process.env.POLLING_INTERVAL as string, 10) || 500; // .5 Seconds
	priceMonitor = setInterval(async () => {
		await monitorPrice();
	}, POLLING_INTERVAL);
};

export default scan;
