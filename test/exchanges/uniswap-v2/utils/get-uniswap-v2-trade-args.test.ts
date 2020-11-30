import chai from 'chai';
import dotenv from 'dotenv';
import { web3 } from '../../../../src/providers/web3';
import tokens from '../../../../src/constants/tokens';
import getUniswapV2Trade from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-trade';
import getUniswapV2Tokens from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-tokens';
import getUniswapV2TradeArgs from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-trade-args';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('exchanges', () => {
	describe('uniswap-v2', () => {
		describe('utils', () => {
			describe('getUniswapV2TradeArgs', () => {
				it('should return a UniswapV2 trade args', async () => {
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

					const {
						amountOutMin,
						to,
						path,
						deadline,
					} = getUniswapV2TradeArgs({
						uniTrade,
						uniSourceToken,
						uniDestinationToken,
					});

					expect(typeof amountOutMin).to.equal('string');
					expect(to).to.equal(process.env.METAMASK_ADDRESS);
					expect(path).to.deep.equal([
						uniSourceToken.address,
						uniDestinationToken.address,
					]);
					expect(typeof deadline).to.equal('number');

					expect(true).to.equal(true);
				});
			});
		});
	});
});
