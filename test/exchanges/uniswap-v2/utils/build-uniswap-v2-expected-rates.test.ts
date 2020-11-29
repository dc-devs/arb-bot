import chai from 'chai';
import dotenv from 'dotenv';
import { Trade } from '@uniswap/sdk';
import buildUniswapV2ExpectedRates from '../../../../src/exchanges/uniswap-v2/utils/build-uniswap-v2-expected-rates';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('buildUniswapV2ExpectedRates', () => {
	it('should return the execpected rates object', async () => {
		const mockUniTrade = ({
			executionPrice: {
				toSignificant: () => {
					return '0.000033668';
				},
			},
			nextMidPrice: {
				toSignificant: () => {
					return '0.0000337542';
				},
			},
		} as unknown) as Trade;

		const expectedRates = buildUniswapV2ExpectedRates({
			uniTrade: mockUniTrade,
		});

		expect(expectedRates).to.deep.equal({
			number: { expectedRate: 0.000033668, nextMidPrice: 0.0000337542 },
			string: {
				expectedRate: '0.000033668',
				nextMidPrice: '0.0000337542',
			},
			formatted: {
				expectedRate: '0.000033668000000000',
				nextMidPrice: '0.000033754200000000',
			},
		});
	});
});
