import chai from 'chai';
import dotenv from 'dotenv';
import getGasFees from '../../../src/arbitrage-scanner/utils/get-gas-fees';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('getGasFees', async () => {
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

		const { fastestGasPrice, fastestWait } = await getGasFees(mockAxios);

		expect(fastestWait).to.equal(0.6);
		expect(fastestGasPrice).to.equal('50');
	});
});
