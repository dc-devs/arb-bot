import test from 'ava';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getUniswapV2TradeData from '../../../src/exchanges/uniswap-v2/get-uniswap-v2-trade-data';

const { WETH, RSR } = tokens;

test.before(() => {
	dotenv.config();
});

test('getUniswapV2TradeData', async (t) => {
	const tradeData = await getUniswapV2TradeData({
		sourceToken: WETH,
		destinationToken: RSR,
	});

	const {
		exchange,
		expectedRates,
		sourceTokenQuantity,
		expectedDestinationTokenQuantity,
	} = tradeData;

	t.assert(exchange === 'Uniswap v2');
	t.assert(typeof expectedRates.raw.expectedRate === 'number');
	t.assert(typeof expectedRates.raw.nextMidPrice === 'number');
	t.assert(typeof sourceTokenQuantity === 'string');
	t.assert(typeof expectedRates.rawString.expectedRate === 'string');
	t.assert(typeof expectedRates.rawString.nextMidPrice === 'string');
	t.assert(typeof expectedRates.formatted.expectedRate === 'string');
	t.assert(typeof expectedRates.formatted.nextMidPrice === 'string');
	t.assert(typeof expectedRates.formatted.nextMidPrice === 'string');
	t.assert(typeof expectedDestinationTokenQuantity === 'string');
});
