import tokens from '../constants/tokens';
import getBestExpectedRate from './utils/get-best-expected-rate';
import doesArbitrageOpportunityExist from './utils/does-arbitrage-opportunity-exist';

const { ETH, RSR } = tokens;

const scan = async () => {
	setInterval(async () => {
		try {
			const bestOutgoingExpectedRate = await getBestExpectedRate({
				sourceToken: ETH,
				destinationToken: RSR,
				sourceQuantity: '1',
			});

			const sourceTokenQuantityInExpectedRate =
				bestOutgoingExpectedRate.rawString.expectedRate;

			const bestIncomingExpectedRate = await getBestExpectedRate({
				sourceToken: RSR,
				destinationToken: ETH,
				sourceQuantity: sourceTokenQuantityInExpectedRate,
			});

			const isArbitrageOpportunity = doesArbitrageOpportunityExist({
				bestOutgoingExpectedRate:
					bestOutgoingExpectedRate.raw.expectedRate,
				bestIncomingExpectedRate:
					bestIncomingExpectedRate.raw.expectedRate,
			});

			console.log(isArbitrageOpportunity);

			// console.log('');
			// console.log('');
			// console.log(
			// 	`${bestOutgoingExpectedRateExchange}: 1 ${ETH.symbol} -> ${bestOutgoingExpectedRateString} ${RSR.symbol}`
			// );
			// console.log(
			// 	`${bestIncomingExpectedRateExchange}: ${bestIncomingExpectedRateString} ${
			// 		RSR.symbol
			// 	} -> ${ETH.symbol} ${bestOutgoingExpectedRate.raw.expectedRate *
			// 		bestIncomingExpectedRate.raw.expectedRate}`
			// );
			// console.log('');
			// console.log('');
			// console.log('-- Arb? --');
			// console.log(

			// );
		} catch (error) {
			throw error;
		}
	}, 1000);
};

export default scan;
