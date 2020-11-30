import tokens from '../constants/tokens';
import getTradePairData from './utils/get-trade-pair-data';
import getBestTradePair from './utils/get-best-trade-pair';

const { RSR, WETH } = tokens;

const start = async () => {
	// setInterval(async () => {
	const tradePairDataResults = await Promise.all([
		getTradePairData({
			inputToken: WETH,
			outputToken: RSR,
			inputTokenQuantity: '.5',
			customGasPrice: '50',
		}),
		getTradePairData({
			inputToken: RSR,
			outputToken: WETH,
			inputTokenQuantity: '10000',
			customGasPrice: '50',
		}),
	]);

	const bestTradePair = getBestTradePair(tradePairDataResults);
	console.log(bestTradePair);
	// }, 1000);
};

export default start;
