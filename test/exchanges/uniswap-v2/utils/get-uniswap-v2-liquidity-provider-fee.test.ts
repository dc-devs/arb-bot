import chai from 'chai';
import dotenv from 'dotenv';
import getUniswapV2LiquidityProviderFee from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-liquidity-provider-fee';
import uniswapV2LiquidityProviderFee from '../../../../src/exchanges/uniswap-v2/constants/uniswap-v2-liquidity-provider-fee';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('getUniswapV2LiquidityProviderFee', () => {
	describe('when the token amount high enough to calculate a provider fee', () => {
		it('should return the execpected provider fee', () => {
			const inputTokenQuantity = '1';

			const liquidityProviderFee = getUniswapV2LiquidityProviderFee({
				inputTokenQuantity,
				uniswapV2LiquidityProviderFee,
			});

			expect(liquidityProviderFee.wei).to.equal('3000000000000000');
			expect(liquidityProviderFee.eth).to.equal('0.003');
			expect(liquidityProviderFee.BN.toString()).to.equal(
				'3000000000000000'
			);
		});
	});
	describe('when the token amount is not high enough to calculate a provider fee', () => {
		it('should return the execpected provider fee, and a 0 wei', () => {
			const inputTokenQuantity = '0.0336645';

			const liquidityProviderFee = getUniswapV2LiquidityProviderFee({
				inputTokenQuantity,
				uniswapV2LiquidityProviderFee,
			});

			expect(liquidityProviderFee.wei).to.equal('0');
			expect(liquidityProviderFee.eth).to.equal('0.00010099350000000001');
			expect(liquidityProviderFee.BN.toString()).to.equal('0');
		});
	});
});
