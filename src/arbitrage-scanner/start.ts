import tokens from '../constants/tokens';
import getTradePairData from './utils/get-trade-pair-data';
import getBestTradePair from './utils/get-best-trade-pair';

const { RSR, WETH } = tokens;

// LEFT OFF
// Rename GasFess to transaction Fees ot be more idiomatic
// Your gas fees is always slightly lower that uniswaps, doublecheck price oracle and gas Estimate
// Caclulate platformFess {wei and BN}
// and gasFees {wei and BN} so you can calc final outputs
// Expected Trade Gain = outputTokenQuantity.th - gasFees.eth - platformFees.eth
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
