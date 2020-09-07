import tokens from '../constants/tokens';
import getBestExpectedRate from './get-best-expected-rate';

const { ETH, RSR } = tokens;

const scan = async () => {
	setInterval(async () => {
		try {
			const bestOutgoingExpectedRate = await getBestExpectedRate({
				sourceToken: ETH,
				destinationToken: RSR,
				sourceQuantity: '1',
			});

			const incomingSourceQuantity =
				bestOutgoingExpectedRate.rawString.expectedRate;

			const bestIncomingExpectedRate = await getBestExpectedRate({
				sourceToken: RSR,
				destinationToken: ETH,
				sourceQuantity: incomingSourceQuantity,
			});

			const outgoingSourceQuantity =
				bestIncomingExpectedRate.rawString.expectedRate;

			console.log(incomingSourceQuantity);
			console.log(outgoingSourceQuantity);

			// console.log('');
			// console.log('--- Highest Outgoing Expected Rate ---');
			// console.log('');
			// console.log(highestExchangeRate_ETH_RSR.exchange);
			// console.log(highestExchangeRate_ETH_RSR.raw.expectedRate);
			// console.log('');
			// console.log('');
			// console.log('--- Highest Incoming Expected Rate ---');
			// console.log('');
			// console.log(highestExchangeRate_RSR_ETH.exchange);
			// console.log(highestExchangeRate_RSR_ETH.raw.expectedRate);
			// console.log('');

			// console.log('');
			// console.log('');
			// console.log(
			// 	`${highestExchangeRate_ETH_RSR.exchange}: 1 ETH -> ${highestExchangeRate_ETH_RSR.raw.expectedRate} RSR`
			// );
			// console.log(
			// 	`${highestExchangeRate_RSR_ETH.exchange}: ${
			// 		highestExchangeRate_ETH_RSR.raw.expectedRate
			// 	} RSR -> ETH ${highestExchangeRate_ETH_RSR.raw.expectedRate *
			// 		highestExchangeRate_RSR_ETH.raw.expectedRate}`
			// );
			// console.log('');
			// console.log('');
			// console.log('-- Arb? --');
			// console.log(
			// 	highestExchangeRate_ETH_RSR.raw.expectedRate *
			// 		highestExchangeRate_RSR_ETH.raw.expectedRate >
			// 		1
			// );
		} catch (error) {
			throw error;
		}
	}, 1000);
};

export default scan;
