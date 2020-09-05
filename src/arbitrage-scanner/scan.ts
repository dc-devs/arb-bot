import Web3 from 'web3';
import tokens from '../constants/tokens';
import sortExpectedRates from '../utils/sort-expected-rates';
import getUniswapV2ExecutionPrice from '../exchanges/uniswap-v2/get-execution-price';
import getKyberExpectedRate from '../exchanges/kyber-network/get-kyber-expected-rate';

const { WETH, ETH, RSR } = tokens;

const scan = async (web3: Web3) => {
	setInterval(async () => {
		try {
			// Get Outgoing Swap Prices
			// -------------------------
			const uniswapV2ExpectedRates_ETH_RSR = await getUniswapV2ExecutionPrice(
				{
					web3,
					sourceToken: WETH,
					destinationToken: RSR,
				}
			);
			const kyberExpectedRates_ETH_RSR = await getKyberExpectedRate({
				web3,
				sourceToken: ETH,
				destinationToken: RSR,
			});

			const sortedExpectedRates_ETH_RSR = sortExpectedRates([
				uniswapV2ExpectedRates_ETH_RSR,
				kyberExpectedRates_ETH_RSR,
			]);

			const highestExchangeRate_ETH_RSR = sortedExpectedRates_ETH_RSR[0];

			// console.log('');
			// console.log('======================================');
			// console.log('       Best Prices: 1 ETH -> RSR      ');
			// console.log('======================================');
			// console.log('');

			// sortedExpectedRates_ETH_RSR.forEach((sortedExpectedRate) => {
			// 	console.log(
			// 		sortedExpectedRate.exchange,
			// 		sortedExpectedRate.formatted.expectedRate
			// 	);
			// });

			// Get Incoming Swap Prices
			// ------------------------
			const kyberExpectedRates_RSR_ETH = await getKyberExpectedRate({
				web3,
				sourceToken: RSR,
				destinationToken: ETH,
				sourceQuantity:
					highestExchangeRate_ETH_RSR.rawString.expectedRate,
			});

			const uniswapV2ExpectedRates_RSR_ETH = await getUniswapV2ExecutionPrice(
				{
					web3,
					sourceToken: RSR,
					destinationToken: WETH,
					sourceQuantity:
						highestExchangeRate_ETH_RSR.rawString.expectedRate,
				}
			);

			const sortedExpectedRates_RSR_ETH = sortExpectedRates([
				uniswapV2ExpectedRates_RSR_ETH,
				kyberExpectedRates_RSR_ETH,
			]);

			const highestExchangeRate_RSR_ETH = sortedExpectedRates_RSR_ETH[0];

			// console.log('');
			// console.log('======================================');
			// console.log('       Best Prices: 1 RSR -> ETH      ');
			// console.log('======================================');
			// console.log('');

			// sortedExpectedRates_RSR_ETH.forEach((sortedExpectedRate) => {
			// 	console.log(
			// 		sortedExpectedRate.exchange,
			// 		sortedExpectedRate.formatted.expectedRate
			// 	);
			// });

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

			console.log('');
			console.log('');
			console.log(
				`${highestExchangeRate_ETH_RSR.exchange}: 1 ETH -> ${highestExchangeRate_ETH_RSR.raw.expectedRate} RSR`
			);
			console.log(
				`${highestExchangeRate_RSR_ETH.exchange}: ${
					highestExchangeRate_ETH_RSR.raw.expectedRate
				} RSR -> ETH ${highestExchangeRate_ETH_RSR.raw.expectedRate *
					highestExchangeRate_RSR_ETH.raw.expectedRate}`
			);
			console.log('');
			console.log('');
			console.log('-- Arb? --');
			console.log(
				highestExchangeRate_ETH_RSR.raw.expectedRate *
					highestExchangeRate_RSR_ETH.raw.expectedRate >
					1
			);
		} catch (error) {
			throw error;
		}
	}, 1000);
};

export default scan;
