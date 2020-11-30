import chai from 'chai';
import dotenv from 'dotenv';
import getGasFeesPrice from '../../../src/arbitrage-scanner/utils/get-gas-fees-price';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('getGasFees', async () => {
	xit('should return the gas fees', async () => {
		const gasFeesPrice = await getGasFeesPrice();
		console.log(gasFeesPrice);
		expect(true).to.equal(true);
	});
});
