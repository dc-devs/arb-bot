import tokens from '../constants/tokens';
import getBestTrade from './utils/get-best-trade';
import analyzeTrade from './utils/analyze-trade';

const { ETH, RSR } = tokens;

const scan = async () => {
	// setInterval(async () => {
	try {
		const sourceTokenQuantity = '1';

		const bestOutgoingTrade = await getBestTrade({
			sourceToken: ETH,
			sourceTokenQuantity,
			destinationToken: RSR,
		});

		const bestIncomingTrade = await getBestTrade({
			sourceToken: RSR,
			destinationToken: ETH,
			sourceTokenQuantity:
				bestOutgoingTrade.expectedDestinationTokenQuantity,
		});

		const tradeResults = analyzeTrade({
			outgoingTrade: bestOutgoingTrade,
			incomingTrade: bestIncomingTrade,
		});

		console.log(tradeResults);
	} catch (error) {
		throw error;
	}
	// }, 1000);
};

export default scan;
