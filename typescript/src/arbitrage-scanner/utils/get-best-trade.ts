import Token from '../../interfaces/Token';
import getTrades from './get-best-trades';

interface GetBestTradeArgs {
	sourceToken: Token;
	destinationToken: Token;
	sourceTokenQuantity?: string;
}

const getBestTrade = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity,
}: GetBestTradeArgs) => {
	const trades = await getTrades({
		sourceToken,
		destinationToken,
		sourceTokenQuantity,
	});

	return trades[0];
};

export default getBestTrade;
