import chai from 'chai';
import dotenv from 'dotenv';
import getGasPriceData from '../../../src/apis/defi-pulse/get-gas-price-data';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('apis', () => {
	describe('defi-pulse', () => {
		describe('getGasPriceData', async () => {
			it('should return the gas fees', async () => {
				const mockAxios = {
					get: () => {
						return {
							data: {
								fastest: 500,
								fastestWait: 0.6,
							},
						};
					},
				};

				const { prices, times } = await getGasPriceData(mockAxios);

				expect(prices.fastest).to.equal('50');
				expect(times.fastest).to.equal(0.6);
			});
		});
	});
});
