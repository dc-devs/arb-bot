import tokens from '../constants/tokens';
import getBestExpectedRate from './utils/get-best-expected-rate';
import analyzeTrade from './utils/analyze-trade';

const { ETH, RSR } = tokens;

const scan = async () => {
	// setInterval(async () => {
	try {
		const sourceTokenQuantity = '2';

		const bestOutgoingExpectedRate = await getBestExpectedRate({
			sourceToken: ETH,
			sourceTokenQuantity,
			destinationToken: RSR,
		});

		const sourceTokenQuantityInExpectedRate =
			bestOutgoingExpectedRate.rawString.expectedRate;

		const bestIncomingExpectedRate = await getBestExpectedRate({
			sourceToken: RSR,
			destinationToken: ETH,
			sourceTokenQuantity: sourceTokenQuantityInExpectedRate,
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
