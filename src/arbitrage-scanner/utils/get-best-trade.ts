import Token from '../../interfaces/Token';
import getBestTrades from './get-best-trades';

interface GetBestTradeArgs {
	inputToken: Token;
	outputToken: Token;
	inputTokenQuantity: string;
}

const getBestTrade = async ({
	inputToken,
	outputToken,
	inputTokenQuantity,
}: GetBestTradeArgs) => {
	const trades = await getBestTrades({
		inputToken,
		outputToken,
		inputTokenQuantity,
	});

	return trades[0];
};

export default getBestTrade;
