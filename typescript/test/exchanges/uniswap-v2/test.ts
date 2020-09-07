import test from 'ava';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getUniswapV2ExecutionPrice from '../../../src/exchanges/uniswap-v2/get-execution-price';

const { WETH, RSR } = tokens;

test.before(() => {
	dotenv.config();
});

test('Exchanges::Uniswap-v2::getExecutionPrice', async (t) => {
	await getUniswapV2ExecutionPrice({
		sourceToken: WETH,
		destinationToken: RSR,
	});

	t.pass();
});
