import test from 'ava';
import Web3 from 'web3';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getUniswapV2ExecutionPrice from '../../../src/exchanges/uniswap-v2/get-execution-price';

const { WETH, RSR } = tokens;

test.before(() => {
	dotenv.config();
});

test('Exchanges::Uniswap-v2::getExecutionPrice', async (t) => {
	const rpcUrl = process.env.RPC_URL as string;
	const web3 = new Web3(rpcUrl);
	await getUniswapV2ExecutionPrice({
		web3,
		sourceToken: WETH,
		destinationToken: RSR,
	});

	t.pass();
});
