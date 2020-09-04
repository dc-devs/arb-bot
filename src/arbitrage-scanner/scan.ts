import Web3 from 'web3';
import tokens from '../constants/tokens';
import sortExpectedRates from '../utils/sort-expected-rates';
import getUniswapV2ExecutionPrice from '../exchanges/uniswap-v2/get-execution-price';
import getKyberExpectedRate from '../exchanges/kyber-network/get-kyber-expected-rate';

const { WETH, ETH, RSR } = tokens;

const scan = async (web3: Web3) => {
	try {
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

		console.log('');
		console.log('======================================');
		console.log('       Best Prices: 1 ETH -> RSR      ');
		console.log('======================================');
		console.log('');

		sortedExpectedRates_ETH_RSR.forEach((sortedExpectedRate) => {
			console.log(
				sortedExpectedRate.exchange,
				sortedExpectedRate.formatted.expectedRate
			);
		});

		const kyberExpectedRates_RSR_ETH = await getKyberExpectedRate({
			web3,
			sourceToken: RSR,
			destinationToken: ETH,
		});

		const uniswapV2ExpectedRates_RSR_ETH = await getUniswapV2ExecutionPrice(
			{
				web3,
				sourceToken: RSR,
				destinationToken: WETH,
			}
		);

		const sortedExpectedRates_RSR_ETH = sortExpectedRates([
			uniswapV2ExpectedRates_RSR_ETH,
			kyberExpectedRates_RSR_ETH,
		]);

		console.log('');
		console.log('======================================');
		console.log('       Best Prices: 1 RSR -> ETH      ');
		console.log('======================================');
		console.log('');

		sortedExpectedRates_RSR_ETH.forEach((sortedExpectedRate) => {
			console.log(
				sortedExpectedRate.exchange,
				sortedExpectedRate.formatted.expectedRate
			);
		});
	} catch (error) {
		throw error;
	}
	// setInterval(async () => {
	// }, 1000);
};

export default scan;
