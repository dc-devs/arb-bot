import chai from 'chai';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getKyberNetworkTradeData from '../../../src/exchanges/kyber-network/get-kyber-network-trade-data';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('getKyberNetworkTradeData', () => {
	it('should return correct trade data', async () => {
		const tradeData = await getKyberNetworkTradeData({
			sourceToken: WETH,
			destinationToken: RSR,
		});

		const {
			exchange,
			expectedRates,
			sourceTokenQuantity,
			expectedDestinationTokenQuantity,
		} = tradeData;

		expect(exchange).to.equal('Kyber Network');
		expect(typeof expectedRates.raw.worstRate).to.equal('number');
		expect(typeof expectedRates.raw.expectedRate).to.equal('number');
		expect(typeof sourceTokenQuantity).to.equal('string');
		expect(typeof expectedRates.rawString.expectedRate).to.equal('string');
		expect(typeof expectedRates.rawString.worstRate).to.equal('string');
		expect(typeof expectedRates.formatted.expectedRate).to.equal('string');
		expect(typeof expectedRates.formatted.worstRate).to.equal('string');
		expect(typeof expectedDestinationTokenQuantity).to.equal('string');
	});
});
