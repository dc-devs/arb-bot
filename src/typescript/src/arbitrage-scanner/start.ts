// import { web3 } from '../providers/web3';
import tokens from '../constants/tokens';
import getTradePairData from './utils/get-trade-pair-data';
import getBestTradePair from './utils/get-best-trade-pair';
import getGasFees from './utils/get-gas-fees';
import getChainlinkTokenPrice from '../oracles/chainlink/get-chainlink-token-price';

const { RSR, ETH } = tokens;

const start = async () => {
	// setInterval(async () => {
	const tradePairDataResults = await Promise.all([
		getTradePairData({
			baseToken: ETH,
			swapToken: RSR,
			sourceTokenQuantity: '4',
		}),
		getTradePairData({
			baseToken: RSR,
			swapToken: ETH,
			sourceTokenQuantity: '60000',
		}),
	]);

	const bestTradePair = getBestTradePair(tradePairDataResults);
	console.log(bestTradePair);

	const gasFees = await getGasFees();

	console.log('--- Gas Price Ether ---');
	console.log(gasFees.fastestEth);

	const priceEther = await getChainlinkTokenPrice();

	console.log('--- Ether Price Dollar ---');
	console.log(priceEther);

	console.log('--- Gas Price Dollar ---');
	console.log(Number(gasFees.fastestEth) * priceEther);

	// TODO: After Trade pairs can calculate their est gas price, use the gas fee for a fast transaction
	// to figure out if this is going to be a profitable trade, or at least how many ETH swaps it takes to
	// to get over the transaction fee..
	// }, 1000);
};

export default start;
