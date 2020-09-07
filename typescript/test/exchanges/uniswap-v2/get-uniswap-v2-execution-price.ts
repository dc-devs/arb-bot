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

	const {
		raw,
		exchange,
		rawString,
		formatted,
		sourceTokenQuantity,
	} = exectutionPrice;

	t.assert(exchange === 'Uniswap v2');
	t.assert(typeof raw.expectedRate === 'number');
	t.assert(typeof raw.nextMidPrice === 'number');
	t.assert(typeof sourceTokenQuantity === 'string');
	t.assert(typeof rawString.expectedRate === 'string');
	t.assert(typeof rawString.nextMidPrice === 'string');
	t.assert(typeof formatted.expectedRate === 'string');
	t.assert(typeof formatted.nextMidPrice === 'string');
});
