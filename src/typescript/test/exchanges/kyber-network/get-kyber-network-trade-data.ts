import test from 'ava';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getKyberNetworkTradeData from '../../../src/exchanges/kyber-network/get-kyber-network-trade-data';

const { WETH, RSR } = tokens;

test.before(() => {
	dotenv.config();
});

test('getKyberNetworkTradeData', async (t) => {
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

	t.assert(exchange === 'Kyber Network');
	t.assert(typeof expectedRates.raw.worstRate === 'number');
	t.assert(typeof expectedRates.raw.expectedRate === 'number');
	t.assert(typeof sourceTokenQuantity === 'string');
	t.assert(typeof expectedRates.rawString.expectedRate === 'string');
	t.assert(typeof expectedRates.rawString.worstRate === 'string');
	t.assert(typeof expectedRates.formatted.expectedRate === 'string');
	t.assert(typeof expectedRates.formatted.worstRate === 'string');
	t.assert(typeof expectedDestinationTokenQuantity === 'string');
});
