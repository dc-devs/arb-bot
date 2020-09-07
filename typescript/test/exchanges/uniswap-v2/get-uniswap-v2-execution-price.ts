import test from 'ava';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getUniswapV2ExecutionPrice from '../../../src/exchanges/uniswap-v2/get-uniswap-v2-execution-price';

const { WETH, RSR } = tokens;

test.before(() => {
	dotenv.config();
});

test('getUniswapV2ExecutionPrice', async (t) => {
	const exectutionPrice = await getUniswapV2ExecutionPrice({
		sourceToken: WETH,
		destinationToken: RSR,
	});

	const { exchange, expectedRates, sourceTokenQuantity } = exectutionPrice;

	t.assert(exchange === 'Uniswap v2');
	t.assert(typeof expectedRates.raw.expectedRate === 'number');
	t.assert(typeof expectedRates.raw.nextMidPrice === 'number');
	t.assert(typeof sourceTokenQuantity === 'string');
	t.assert(typeof expectedRates.rawString.expectedRate === 'string');
	t.assert(typeof expectedRates.rawString.nextMidPrice === 'string');
	t.assert(typeof expectedRates.formatted.expectedRate === 'string');
	t.assert(typeof expectedRates.formatted.nextMidPrice === 'string');
});
