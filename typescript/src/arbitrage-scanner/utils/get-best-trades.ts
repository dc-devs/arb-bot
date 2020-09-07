import Token from '../../interfaces/Token';
import sortTrades from '../../utils/sort-trades';
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
	const uniswapV2Trade = await getUniswapV2TradeData({
		sourceToken,
		destinationToken,
		sourceTokenQuantity,
	});

	const kyberNetworkTrade = await getKyberNetworkTradeData({
		sourceToken,
		destinationToken,
		sourceTokenQuantity,
	});

	const sortedExpectedRates = sortTrades([uniswapV2Trade, kyberNetworkTrade]);

	return sortedExpectedRates;
};

export default getBestTrades;
