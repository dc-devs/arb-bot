import chai from 'chai';
import dotenv from 'dotenv';
import getFormattedPrice from '../../../../src/oracles/chainlink/utils/get-formatted-price';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('oracles', async () => {
	describe('chainlink', async () => {
		describe('utils', async () => {
			describe('getFormattedPrice', async () => {
				describe('when a given a price and a decimal count', () => {
					describe('and the decimal count is 8', () => {
						it('should return the correct formatted price', () => {
							const price = '58686144555';
							const decimals = '8';
							const formattedPrice = getFormattedPrice(
								price,
								decimals
							);

							expect(formattedPrice).to.equal(586.86144555);
						});
					});
					describe('and the decimal count is 2', () => {
						it('should return the correct formatted price', () => {
							const price = '58686';
							const decimals = '2';
							const formattedPrice = getFormattedPrice(
								price,
								decimals
							);

							expect(formattedPrice).to.equal(586.86);
						});
					});
				});
			});
		});
	});
});
