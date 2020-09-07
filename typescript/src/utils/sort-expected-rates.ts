import ExpectedRates from '../interfaces/Expected-Rates';

const sortExpectedRates = (prices: ExpectedRates[]) => {
	return prices.sort((a: ExpectedRates, b: ExpectedRates) => {
		const expectedRateA = a.expectedRates.raw.expectedRate;
		const expectedRateB = b.expectedRates.raw.expectedRate;

		return expectedRateB - expectedRateA;
	});
};

export default sortExpectedRates;
