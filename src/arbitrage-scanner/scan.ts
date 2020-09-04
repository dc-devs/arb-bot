import Web3 from 'web3';
import sortExpectedRates from '../utils/sort-expected-rates';
import tokenSymbols from '../constants/token-symbols';
import getKyberExpectedRate from '../exchanges/kyber-network/get-kyber-expected-rate';
import getUniswapV2ExecutionPrice from '../exchanges/uniswap-v2/get-execution-price';
import getUniswapV1GetTokenPrice from '../exchanges/uniswap-v1/get-uniswap-v1-get-token-price';

const { ETH, RSR } = tokenSymbols;

const scan = async (web3: Web3) => {
	try {
		const uniswapV1ExpectedRates_ETH_RSR = await getUniswapV1GetTokenPrice(
			web3,
			RSR
		);
		const uniswapV2ExpectedRates_ETH_RSR = await getUniswapV2ExecutionPrice(
			RSR
		);
		const kyberExpectedRates_ETH_RSR = await getKyberExpectedRate(
			web3,
			ETH,
			RSR
		);

		const sortedExpectedRates_ETH_RSR = sortExpectedRates([
			uniswapV1ExpectedRates_ETH_RSR,
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

		const kyberExpectedRates_RSR_ETH = await getKyberExpectedRate(
			web3,
			RSR,
			ETH
		);

		const sortedExpectedRates_RSR_ETH = sortExpectedRates([
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
		throw new Error(error);
	}
	// setInterval(async () => {
	// }, 1000);
};

export default scan;
