import ExpectedRates from '../interfaces/expectedRates';

const sortExpectedRates = (prices: ExpectedRates[]) => {
	return prices.sort((a: ExpectedRates, b: ExpectedRates) => {
		const expectedRateA = a.raw.expectedRate;
		const expectedRateB = b.raw.expectedRate;

		return expectedRateB - expectedRateA;
	});
};

export default sortExpectedRates;
