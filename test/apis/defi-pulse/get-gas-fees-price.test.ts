import chai from 'chai';
import dotenv from 'dotenv';
import getGasFeesPrice from '../../../src/apis/defi-pulse/get-gas-fees-price';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('apis', () => {
	describe('defi-pulse', () => {
		describe('getGasFees', () => {
			xit('should return the gas fees price', async () => {
				const gasFeesPrice = await getGasFeesPrice();
				console.log(gasFeesPrice);
				expect(true).to.equal(true);
			});
		});
	});
});
