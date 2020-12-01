import chai from 'chai';
import dotenv from 'dotenv';
import { web3 } from '../../../../src/providers/web3';
import getUniswapV2LiquidityProviderFee from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-liquidity-provider-fee';
import uniswapV2LiquidityProviderFee from '../../../../src/exchanges/uniswap-v2/constants/uniswap-v2-liquidity-provider-fee';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('exchanges', () => {
	describe('uniswap-v2', () => {
		describe('utils', () => {
			describe('getUniswapV2LiquidityProviderFee', () => {
				describe('when the token amount is 1', () => {
					it('should return the execpected provider fee', () => {
						const inputTokenQuantity = '1';

						const liquidityProviderFee = getUniswapV2LiquidityProviderFee(
							{
								inputTokenQuantity,
								uniswapV2LiquidityProviderFee,
							}
						);

						expect(liquidityProviderFee.eth).to.equal(
							'0.003000000000000000'
						);
						expect(liquidityProviderFee.wei).to.equal(
							'3000000000000000'
						);
						expect(liquidityProviderFee.BN.toString()).to.equal(
							web3.utils.toBN('3000000000000000').toString()
						);
					});
				});
				describe('when the token amount is 1000', () => {
					it('should return the execpected provider fee', () => {
						const inputTokenQuantity = '1000';

						const liquidityProviderFee = getUniswapV2LiquidityProviderFee(
							{
								inputTokenQuantity,
								uniswapV2LiquidityProviderFee,
							}
						);

						expect(liquidityProviderFee.eth).to.equal(
							'3.000000000000000000'
						);
						expect(liquidityProviderFee.wei).to.equal(
							'3000000000000000000'
						);
						expect(liquidityProviderFee.BN.toString()).to.equal(
							web3.utils.toBN('3000000000000000000').toString()
						);
					});
				});
				describe('when the token amount is a decimanl', () => {
					it('should return the execpected provider fee', () => {
						const inputTokenQuantity = '0.0336645';

						const liquidityProviderFee = getUniswapV2LiquidityProviderFee(
							{
								inputTokenQuantity,
								uniswapV2LiquidityProviderFee,
							}
						);

						expect(liquidityProviderFee.eth).to.equal(
							'0.000100993500000000'
						);
						expect(liquidityProviderFee.wei).to.equal(
							'100993500000000'
						);
						expect(liquidityProviderFee.BN.toString()).to.equal(
							web3.utils.toBN('100993500000000').toString()
						);
					});
				});
			});
		});
	});
});
