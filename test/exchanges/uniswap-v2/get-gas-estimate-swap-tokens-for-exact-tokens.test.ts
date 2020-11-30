import chai from 'chai';
import dotenv from 'dotenv';
import to from 'await-to-js';
import { web3 } from '../../../src/providers/web3';
import tokens from '../../../src/constants/tokens';
import getGasEstimateSwapExactTokensForTokens from '../../../src/exchanges/uniswap-v2/get-gas-estimate-swap-tokens-for-exact-tokens';
import defaultGasEstimate from '../../../src/exchanges/uniswap-v2/constants/uniswap-v2-default-gas-estimate-swap-extact-for-token';

const { expect } = chai;
const { UNI, WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('exchanges', () => {
	describe('uniswap-v2', () => {
		describe('getGasEstimateSwapExactTokensForTokens', async () => {
			describe('when account has the current token amount available', () => {
				it('should return the gas estimate for trade transaction (WETH->RSR) on UniSwapV2', async () => {
					const gasPrice = web3.utils.toWei('30', 'gwei');
					const gasLimit = 1000000;

					const [error, gasEstimate] = await to(
						getGasEstimateSwapExactTokensForTokens({
							inputTokenQuantity: '1',
							inputToken: WETH,
							outputToken: RSR,
							providerOptions: { gasPrice, gasLimit },
						})
					);

					const gasEstimateFloor = 100000;
					const gasEstimateNumber = Number(gasEstimate);

					expect(error).to.be.null;
					expect(gasEstimateNumber).to.not.equal(gasEstimateFloor);
					expect(gasEstimateNumber).to.be.above(gasEstimateFloor);
				});

				it('should return the gas estimate for trade transaction (RSR->WETH) on UniSwapV2', async () => {
					const gasPrice = web3.utils.toWei('30', 'gwei');
					const gasLimit = 1000000;

					const [error, gasEstimate] = await to(
						getGasEstimateSwapExactTokensForTokens({
							inputTokenQuantity: '1000',
							inputToken: RSR,
							outputToken: WETH,
							providerOptions: { gasPrice, gasLimit },
						})
					);

					const gasEstimateFloor = 100000;
					const gasEstimateNumber = Number(gasEstimate);

					expect(error).to.be.null;
					expect(gasEstimateNumber).to.not.equal(gasEstimateFloor);
					expect(gasEstimateNumber).to.be.above(gasEstimateFloor);
				});
			});
			describe('when account does not have the current token amount available', () => {
				it('should return the default gas estimate for trade transaction (UNI->WETH) on UniSwapV2', async () => {
					const gasPrice = web3.utils.toWei('30', 'gwei');
					const gasLimit = 1000000;

					const [error, gasEstimate] = await to(
						getGasEstimateSwapExactTokensForTokens({
							inputTokenQuantity: '1000',
							inputToken: UNI,
							outputToken: WETH,
							providerOptions: { gasPrice, gasLimit },
						})
					);

					expect(error).to.be.null;
					expect(gasEstimate).to.equal(defaultGasEstimate);
				});
			});
		});
	});
});
