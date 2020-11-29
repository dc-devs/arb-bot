import Token from '../../interfaces/Token';
import analyzeTrade from './analyze-trade';
import getBestTrade from './get-best-trade';

interface GetTradePairDataArgs {
	inputToken: Token;
	outputToken: Token;
	inputTokenQuantity: string;
}

const getTradePairData = async ({
	inputToken,
	outputToken,
	inputTokenQuantity,
}: GetTradePairDataArgs) => {
	const bestOutgoingTrade = await getBestTrade({
		inputToken,
		outputToken,
		inputTokenQuantity,
	});

	const bestIncomingTrade = await getBestTrade({
		inputToken: outputToken,
		outputToken: inputToken,
		inputTokenQuantity: bestOutgoingTrade.outputTokenQuantity,
	});

	return analyzeTrade({
		outgoingTrade: bestOutgoingTrade,
		incomingTrade: bestIncomingTrade,
	});
};

export default getTradePairData;
