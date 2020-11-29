import chai from 'chai';
import dotenv from 'dotenv';
import to from 'await-to-js';
import { web3 } from '../../../src/providers/web3';
import tokens from '../../../src/constants/tokens';
import estimateSwapTokensForExactTokens from '../../../src/exchanges/uniswap-v2/estimate-swap-tokens-for-exact-tokens';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('estimateSwapTokensForExactTokens', async () => {
	it('should return the gas estimate for trade transaction on UniSwapV2', async () => {
		const gasPrice = web3.utils.toWei('30', 'gwei');
		const gasLimit = 1000000; // Taken From Metamask

		const [error, estimatedGasUnits] = await to(
			estimateSwapTokensForExactTokens({
				inputTokenQuantity: '.01',
				inputToken: WETH,
				outputToken: RSR,
				providerOptions: { gasPrice, gasLimit },
			})
		);

		const estimateGasUnits = Number(estimatedGasUnits?.toString());
		const minimumGasUnits = 100000;

		expect(error).to.be.null;
		expect(estimateGasUnits).to.be.above(minimumGasUnits);
	});
});
