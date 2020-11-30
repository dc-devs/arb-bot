import chai from 'chai';
import dotenv from 'dotenv';
import buildDivisor from '../../../../src/oracles/chainlink/utils/build-divisor';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('oracles', () => {
	describe('chainlink', () => {
		describe('utils', () => {
			describe('buildDivisor', () => {
				describe('when a given a decimal count of 8', () => {
					it('should return the correct divisor', () => {
						const decimals = 8;
						const divisor = buildDivisor(decimals);

						expect(divisor).to.equal(100000000);
					});
				});
				describe('when a given a decimal count of 2', () => {
					it('should return the correct divisor', () => {
						const decimals = 2;
						const divisor = buildDivisor(decimals);

						expect(divisor).to.equal(100);
					});
				});
			});
		});
	});
});
