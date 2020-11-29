import chai from 'chai';
import dotenv from 'dotenv';
import uniswapV2RouterAddress from '../../../../src/exchanges/uniswap-v2/constants/uniswap-v2-router-address';
import getUniswapV2RouterContract from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-router-contract';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('getUniswapV2RouterContract', () => {
	it('should return Uniswap V2 Router Contract', () => {
		const uniswapV2RouterContract = getUniswapV2RouterContract();
		const { address, swapExactTokensForTokens } = uniswapV2RouterContract;

		expect(address).to.equal(uniswapV2RouterAddress);
		expect(typeof swapExactTokensForTokens).to.equal('function');
	});
});
