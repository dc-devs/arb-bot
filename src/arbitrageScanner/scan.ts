import Web3 from 'web3';
import checkPair from './checkPair';

const scan = (rpcUrl: string) => {
	const web3 = new Web3(rpcUrl);
	let priceMonitor: NodeJS.Timeout;
	let monitoringPrice = false;

	const monitorPrice = async () => {
		if (monitoringPrice) {
			return;
		}

		console.log('Checking prices...');
		monitoringPrice = true;

		try {
			// ADD YOUR CUSTOM TOKEN PAIRS HERE!!!

			const amountInWei = web3.utils.toWei('1', 'ether');

			await checkPair({
				web3,
				inputTokenSymbol: 'ETH',
				inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
				outputTokenSymbol: 'MKR',
				outputTokenAddress:
					'0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
				inputAmount: amountInWei,
			});

			await checkPair({
				web3,
				inputTokenSymbol: 'ETH',
				inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
				outputTokenSymbol: 'DAI',
				outputTokenAddress:
					'0x6b175474e89094c44da98b954eedeac495271d0f',
				inputAmount: amountInWei,
			});

			await checkPair({
				web3,
				inputTokenSymbol: 'ETH',
				inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
				outputTokenSymbol: 'KNC',
				outputTokenAddress:
					'0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
				inputAmount: amountInWei,
			});

			await checkPair({
				web3,
				inputTokenSymbol: 'ETH',
				inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
				outputTokenSymbol: 'LINK',
				outputTokenAddress:
					'0x514910771af9ca656af840dff83e8264ecf986ca',
				inputAmount: amountInWei,
			});
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
