import chai from 'chai';
import dotenv from 'dotenv';
import getGasFees from '../../../src/arbitrage-scanner/utils/get-gas-fees';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('arbitrage-scanner', () => {
	describe('utils', () => {
		describe('getGasFees', () => {
			it('should return the gas fees price', async () => {
				const gasPriceGwei = '50';
				const estimatedGas = '119000';
				const gasFees = await getGasFees(gasPriceGwei, estimatedGas);

				expect(typeof gasFees.eth).to.equal('string');
				expect(typeof gasFees.usd).to.equal('string');
			});
		});
	});
});
