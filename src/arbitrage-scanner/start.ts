// import { web3 } from '../providers/web3';
import tokens from '../constants/tokens';
import getTradePairData from './utils/get-trade-pair-data';
import getBestTradePair from './utils/get-best-trade-pair';
import getGasFeesPrice from './utils/get-gas-fees-price';

const { RSR, ETH } = tokens;

const start = async () => {
	// setInterval(async () => {
	const tradePairDataResults = await Promise.all([
		getTradePairData({
			baseToken: ETH,
			swapToken: RSR,
			sourceTokenQuantity: '.01',
		}),
		getTradePairData({
			baseToken: RSR,
			swapToken: ETH,
			sourceTokenQuantity: '60000',
		}),
	]);

	const bestTradePair = getBestTradePair(tradePairDataResults);
	console.log(bestTradePair);

	const gasFeesPrice = await getGasFeesPrice();
	console.log('--- Gas Fees Price ---');
	console.log(gasFeesPrice);

	// TODO: After Trade pairs can calculate their est gas price, use the gas fee for a fast transaction
	// to figure out if this is going to be a profitable trade, or at least how many ETH swaps it takes to
	// to get over the transaction fee..
	// }, 1000);
};

export default start;
