import Web3 from 'web3';
import tokenSymbols from '../constants/token-symbols';
import getKyberExpectedRate from '../exchanges/kyber-network/get-kyber-expected-rate';
import getUniswapV2ExecutionPrice from '../exchanges/uniswap-v2/get-execution-price';
// import getUniswapV1GetTokenPrice from '../exchanges/uniswap-v1/get-uniswap-v1-get-token-price';

const { ETH, RSR } = tokenSymbols;

const scan = async (web3: Web3) => {
	try {
		// const uniswapV1ExpectedRates = await getUniswapV1GetTokenPrice(
		// 	web3,
		// 	'RSR'
		// );
		const uniswapV2ExpectedRates = await getUniswapV2ExecutionPrice('RSR');
		const kyberExpectedRates = await getKyberExpectedRate(web3, ETH, RSR);

		console.log('');
		console.log('--- 1 ETH -> RSR ---');
		// console.log('uniswap-v1', numRsrForEthV1);
		console.log(
			'uniswap-v2',
			uniswapV2ExpectedRates.formatted.executionPrice
		);
		console.log(
			'kyberswap: best',
			kyberExpectedRates.formatted.expectedRate
		);
		console.log('kyberswap: worst', kyberExpectedRates.formatted.worstRate);
		console.log('');
	} catch (error) {
		throw new Error(error);
	}
	// setInterval(async () => {
	// }, 1000);
};

export default scan;
