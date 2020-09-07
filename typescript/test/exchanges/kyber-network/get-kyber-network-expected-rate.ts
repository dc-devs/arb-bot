import test from 'ava';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getKyberNetworkExpectedRate from '../../../src/exchanges/kyber-network/get-kyber-network-expected-rate';

const { WETH, RSR } = tokens;

test.before(() => {
	dotenv.config();
});

test('getKyberNetworkExpectedRate', async (t) => {
	const expectedRate = await getKyberNetworkExpectedRate({
		sourceToken: WETH,
		destinationToken: RSR,
	});

	const { exchange, expectedRates, sourceTokenQuantity } = expectedRate;

	t.assert(exchange === 'Kyber Network');
	t.assert(typeof expectedRates.raw.worstRate === 'number');
	t.assert(typeof expectedRates.raw.expectedRate === 'number');
	t.assert(typeof sourceTokenQuantity === 'string');
	t.assert(typeof expectedRates.rawString.expectedRate === 'string');
	t.assert(typeof expectedRates.rawString.worstRate === 'string');
	t.assert(typeof expectedRates.formatted.expectedRate === 'string');
	t.assert(typeof expectedRates.formatted.worstRate === 'string');
});
