import tokens from '../constants/tokens';
import getBestExpectedRate from './utils/get-best-expected-rate';
import analyzeTrade from './utils/analyze-trade';

const { ETH, RSR } = tokens;

const scan = async () => {
	// setInterval(async () => {
	try {
		const sourceTokenQuantity = '1';

		const bestOutgoingExpectedRate = await getBestExpectedRate({
			sourceToken: ETH,
			sourceTokenQuantity,
			destinationToken: RSR,
		});

		const bestIncomingExpectedRate = await getBestExpectedRate({
			sourceToken: RSR,
			destinationToken: ETH,
			sourceTokenQuantity:
				bestOutgoingExpectedRate.expectedDestinationTokenQuantity,
		});

		const tradeResults = analyzeTrade({
			outgoingExpectedRate: bestOutgoingExpectedRate,
			incomingExpectedRate: bestIncomingExpectedRate,
		});

		console.log(tradeResults);
	} catch (error) {
		throw error;
	}
	// }, 1000);
};

export default scan;
