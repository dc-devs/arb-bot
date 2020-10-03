import Token from '../../interfaces/Token';
import sortTrades from './sort-trades';
import getUniswapV2TradeData from '../../exchanges/uniswap-v2/get-uniswap-v2-trade-data';
import getKyberNetworkTradeData from '../../exchanges/kyber-network/get-kyber-network-trade-data';

interface GetBestTradesArgs {
	sourceToken: Token;
	destinationToken: Token;
	sourceTokenQuantity?: string;
}

const getBestTrades = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity,
}: GetBestTradesArgs) => {
	const trades = await Promise.all([
		getUniswapV2TradeData({
			sourceToken,
			destinationToken,
			sourceTokenQuantity,
		}),
		getKyberNetworkTradeData({
			sourceToken,
			destinationToken,
			sourceTokenQuantity,
		}),
	]);

	const sortedTrades = sortTrades(trades);

	return sortedTrades;
};

export default getBestTrades;
