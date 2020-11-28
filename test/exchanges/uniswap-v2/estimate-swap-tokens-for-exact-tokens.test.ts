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
	it.only('should return the gas estimate for trade transaction on UniSwapV2', async () => {
		const gasPrice = web3.utils.toWei('30', 'gwei');
		const gasLimit = 1000000; // Taken From Metamask

		const [error, estimatedGasUnits] = await to(
			estimateSwapTokensForExactTokens({
				sourceTokenQuantity: '.01',
				sourceToken: WETH,
				destinationToken: RSR,
				providerOptions: { gasPrice, gasLimit },
			})
		);

		expect(error).to.be.null;
		expect(estimatedGasUnits?.toString()).to.equal('118956');
	});
});
