import Token from '../interfaces/Token';
import ExpectedRates from '../interfaces/Expected-Rates';

interface DisplayData {
	[key: string]: number | string;
}

interface DisplayExpectedRatesArgs {
	sourceToken: Token;
	destinationToken: Token;
	expectedRates: ExpectedRates[];
}

const displayExpectedRates = ({
	sourceToken,
	destinationToken,
	expectedRates,
}: DisplayExpectedRatesArgs) => {
	const displayData = {
		'Source Token': sourceToken.symbol,
		'Destination Token': destinationToken.symbol,
	} as DisplayData;

	expectedRates.forEach((sortedExpectedRate: ExpectedRates) => {
		displayData[sortedExpectedRate.exchange] =
			sortedExpectedRate.formatted.expectedRate;
	});

	console.table([displayData]);
};

export default displayExpectedRates;
