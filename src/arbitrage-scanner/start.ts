import tokens from '../constants/tokens';
import getTradePairData from './utils/get-trade-pair-data';
import getBestTradePair from './utils/get-best-trade-pair';

const { RSR, WETH } = tokens;

// LEFT OFF
// Possibly create a "safe number" util to use in, platoform liquid fees method, and test
// will be something like Number(tokenQuantity).toFixed(18);
//
// Your gas fees is always slightly lower that uniswaps
// (actually this is metamask's estimated gas price),
// Doublecheck price oracle and gas Estimate
// Also note here that gas limit affects overall estimate in meta mask,
// as "I think" miners will use this extra gas, maybe we use gas limit as the
// fee that needs to have a limit to ensure the trade is profitable..
//
// Expected Trade Gain = outputTokenQuantity.eth - gasFees.eth - platformFees.eth
//
// Add chainlink price oracle data to final output

const start = async () => {
	// setInterval(async () => {
	const tradePairDataResults = await Promise.all([
		getTradePairData({
			inputToken: WETH,
			outputToken: RSR,
			inputTokenQuantity: '1',
			customGasPrice: '50',
		}),
		getTradePairData({
			inputToken: RSR,
			outputToken: WETH,
			inputTokenQuantity: '50000',
			customGasPrice: '50',
		}),
	]);

	const bestTradePair = getBestTradePair(tradePairDataResults);
	console.log(bestTradePair);
	// }, 1000);
};

export default start;
