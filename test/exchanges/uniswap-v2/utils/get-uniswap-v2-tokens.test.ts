import chai from 'chai';
import dotenv from 'dotenv';
import tokens from '../../../../src/constants/tokens';
import getUniswapV2Tokens from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-tokens';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('exchanges', () => {
	describe('uniswap-v2', () => {
		describe('utils', () => {
			describe('getUniswapV2Tokens', () => {
				it('should return UniswapV2 tokens', () => {
					const inputToken = WETH;
					const outputToken = RSR;

					const {
						uniSourceToken,
						uniDestinationToken,
					} = getUniswapV2Tokens({
						inputToken,
						outputToken,
					});

					expect(uniSourceToken.address).to.equal(inputToken.address);
					expect(uniDestinationToken.address).to.equal(
						outputToken.address
					);
				});
			});
		});
	});
});
