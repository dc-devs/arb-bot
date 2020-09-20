import Token from '../../interfaces/Token';
import analyzeTrade from './analyze-trade';
import getBestTrade from './get-best-trade';

interface GetTradePairDataArgs {
	baseToken: Token;
	swapToken: Token;
	sourceTokenQuantity: string;
}

const getTradePairData = async ({
	baseToken,
	swapToken,
	sourceTokenQuantity,
}: GetTradePairDataArgs) => {
	const bestOutgoingTrade = await getBestTrade({
		sourceToken: baseToken,
		destinationToken: swapToken,
		sourceTokenQuantity,
	});

	const bestIncomingTrade = await getBestTrade({
		sourceToken: swapToken,
		destinationToken: baseToken,
		sourceTokenQuantity: bestOutgoingTrade.expectedDestinationTokenQuantity,
	});

	return analyzeTrade({
		outgoingTrade: bestOutgoingTrade,
		incomingTrade: bestIncomingTrade,
	});
};

export default getTradePairData;
