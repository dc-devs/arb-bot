import Web3 from 'web3';
import sortExpectedRates from '../utils/sort-expected-rates';
import tokenSymbols from '../constants/token-symbols';
import getKyberExpectedRate from '../exchanges/kyber-network/get-kyber-expected-rate';
import getUniswapV2ExecutionPrice from '../exchanges/uniswap-v2/get-execution-price';
import getUniswapV1GetTokenPrice from '../exchanges/uniswap-v1/get-uniswap-v1-get-token-price';

const { ETH, RSR } = tokenSymbols;

const scan = async (web3: Web3) => {
	// setInterval(async () => {
	try {
		const uniswapV1ExpectedRates = await getUniswapV1GetTokenPrice(
			web3,
			RSR
		);
		const uniswapV2ExpectedRates = await getUniswapV2ExecutionPrice(RSR);
		const kyberExpectedRates = await getKyberExpectedRate(web3, ETH, RSR);

		const sortedExpectedRates = sortExpectedRates([
			uniswapV1ExpectedRates,
			uniswapV2ExpectedRates,
			kyberExpectedRates,
		]);

		console.log('');
		console.log('======================================');
		console.log('       Best Prices: 1 ETH -> RSR      ');
		console.log('======================================');
		console.log('');

		sortedExpectedRates.forEach((sortedExpectedRate) => {
			console.log(
				sortedExpectedRate.exchange,
				sortedExpectedRate.formatted.expectedRate
			);
		});
	} catch (error) {
		throw new Error(error);
	}
	// }, 1000);
};

export default scan;
