import chai from 'chai';
import dotenv from 'dotenv';
import tokens from '../../../../src/constants/tokens';
import getUniswapV2Tokens from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-tokens';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('getUniswapV2Tokens', () => {
	it('should return UniswapV2 tokens', () => {
		const sourceToken = WETH;
		const destinationToken = RSR;

		const { uniSourceToken, uniDestinationToken } = getUniswapV2Tokens({
			sourceToken,
			destinationToken,
		});

		expect(uniSourceToken.address).to.equal(sourceToken.address);
		expect(uniDestinationToken.address).to.equal(destinationToken.address);
	});
});
