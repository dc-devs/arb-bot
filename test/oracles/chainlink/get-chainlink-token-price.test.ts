import chai from 'chai';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getChainlinkPriceForToken from '../../../src/oracles/chainlink/get-chainlink-price-for-token';

const { expect } = chai;
const { ETH } = tokens;

before(() => {
	dotenv.config();
});

describe('oracles', async () => {
	describe('chainlink', async () => {
		describe('getChainlinkPriceForToken', async () => {
			it('should return the token price', async () => {
				const tokenPrice = await getChainlinkPriceForToken(ETH.symbol);

				expect(typeof tokenPrice).to.equal('number');
			});
		});
	});
});
