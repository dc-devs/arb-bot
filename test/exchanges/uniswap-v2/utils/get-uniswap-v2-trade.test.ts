import chai from 'chai';
import dotenv from 'dotenv';
import { Price, Percent } from '@uniswap/sdk';
import { web3 } from '../../../../src/providers/web3';
import tokens from '../../../../src/constants/tokens';
import getUniswapV2Trade from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-trade';
import getUniswapV2Tokens from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-tokens';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('exchanges', () => {
	describe('uniswap-v2', () => {
		describe('utils', () => {
			describe('getUniswapV2Trade', () => {
				it('should return a UniswapV2 trade', async () => {
					const inputToken = WETH;
					const outputToken = RSR;
					const inputTokenQuantity = '1';
					const amountIn = web3.utils.toWei(inputTokenQuantity);

					const {
						uniSourceToken,
						uniDestinationToken,
					} = getUniswapV2Tokens({
						inputToken,
						outputToken,
					});

					const uniTrade = await getUniswapV2Trade({
						amountIn,
						uniSourceToken,
						uniDestinationToken,
					});

					expect(uniTrade.route.input.symbol).to.equal(
						inputToken.symbol
					);
					expect(uniTrade.route.output.symbol).to.equal(
						outputToken.symbol
					);
					expect(uniTrade.inputAmount.numerator.toString()).to.equal(
						amountIn
					);
					expect(uniTrade.executionPrice instanceof Price).to.equal(
						true
					);
					expect(uniTrade.nextMidPrice instanceof Price).to.equal(
						true
					);
					expect(uniTrade.priceImpact instanceof Percent).to.equal(
						true
					);
				});
			});
		});
	});
});
