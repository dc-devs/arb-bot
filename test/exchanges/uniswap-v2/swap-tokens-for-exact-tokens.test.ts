import chai from 'chai';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import swapTokensForExactTokens from '../../../src/exchanges/uniswap-v2/swap-tokens-for-exact-tokens';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('swapTokensForExactTokens', async () => {
	xit('should return the trade transaction', async () => {
		const tradeTransaction = await swapTokensForExactTokens({
			sourceTokenQuantity: '.1',
			sourceToken: WETH,
			destinationToken: RSR,
		});

		console.log(tradeTransaction);

		expect(true).to.equal(true);
	});
});
