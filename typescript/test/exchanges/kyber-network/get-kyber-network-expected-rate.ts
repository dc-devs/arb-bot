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

	const { exchange, raw, rawString, formatted } = expectedRate;

	t.assert(exchange === 'Kyber Network');
	t.assert(typeof raw.expectedRate === 'number');
	t.assert(typeof raw.worstRate === 'number');
	t.assert(typeof rawString.expectedRate === 'string');
	t.assert(typeof rawString.worstRate === 'string');
	t.assert(typeof formatted.expectedRate === 'string');
	t.assert(typeof formatted.worstRate === 'string');
});
