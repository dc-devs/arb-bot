import Token from '../../interfaces/Token';
import sortTrades from './sort-trades';
import getUniswapV2TradeData from '../../exchanges/uniswap-v2/get-uniswap-v2-trade-data';
import getKyberNetworkTradeData from '../../exchanges/kyber-network/get-kyber-network-trade-data';

interface GetBestTradesArgs {
	inputToken: Token;
	outputToken: Token;
	inputTokenQuantity: string;
}

const getBestTrades = async ({
	inputToken,
	outputToken,
	inputTokenQuantity,
}: GetBestTradesArgs) => {
	const trades = await Promise.all([
		getUniswapV2TradeData({
			inputToken,
			outputToken,
			inputTokenQuantity,
		}),
		getKyberNetworkTradeData({
			inputToken,
			outputToken,
			inputTokenQuantity,
		}),
	]);

	const sortedTrades = sortTrades(trades);

	return sortedTrades;
};

export default getBestTrades;
