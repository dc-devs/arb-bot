import chai from 'chai';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getKyberNetworkTradeData from '../../../src/exchanges/kyber-network/get-kyber-network-trade-data';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('exchanges', () => {
	describe('kyber-network', () => {
		describe('getKyberNetworkTradeData', () => {
			it('should return correct trade data', async () => {
				const tradeData = await getKyberNetworkTradeData({
					inputToken: WETH,
					outputToken: RSR,
					inputTokenQuantity: '1',
				});

				const {
					exchange,
					expectedRates,
					inputTokenQuantity,
					outputTokenQuantity,
				} = tradeData;

				expect(exchange).to.equal('Kyber Network');
				expect(typeof expectedRates.number.worstRate).to.equal(
					'number'
				);
				expect(typeof expectedRates.number.expectedRate).to.equal(
					'number'
				);
				expect(typeof inputTokenQuantity).to.equal('string');
				expect(typeof expectedRates.string.expectedRate).to.equal(
					'string'
				);
				expect(typeof expectedRates.string.worstRate).to.equal(
					'string'
				);
				expect(typeof expectedRates.formatted.expectedRate).to.equal(
					'string'
				);
				expect(typeof expectedRates.formatted.worstRate).to.equal(
					'string'
				);
				expect(typeof outputTokenQuantity).to.equal('string');
			});
		});
	});
});
