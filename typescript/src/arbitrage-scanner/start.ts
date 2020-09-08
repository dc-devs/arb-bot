import tokens from '../constants/tokens';
import getTradePairData from './utils/get-trade-pair-data';
import getBestTradePair from './utils/get-best-trade-pair';

const { RSR, ETH } = tokens;

const scan = async () => {
	// setInterval(async () => {
	const sourceTokenQuantity = '1';
	const tradePairDataResults = await Promise.all([
		getTradePairData({
			baseToken: ETH,
			swapToken: RSR,
			sourceTokenQuantity,
		}),
		getTradePairData({
			baseToken: RSR,
			swapToken: ETH,
			sourceTokenQuantity,
		}),
	]);

	const bestTradePair = getBestTradePair(tradePairDataResults);
	console.log(bestTradePair);
	// }, 1000);
};

export default scan;
