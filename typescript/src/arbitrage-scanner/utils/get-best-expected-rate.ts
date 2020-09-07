import Token from '../../interfaces/Token';
import getExpectedRates from './get-expected-rates';

interface GetBestExpectedRateArgs {
	sourceToken: Token;
	destinationToken: Token;
	sourceQuantity?: string;
}

const getBestExpectedRate = async ({
	sourceToken,
	destinationToken,
	sourceQuantity,
}: GetBestExpectedRateArgs) => {
	const expectedRates = await getExpectedRates({
		sourceToken,
		destinationToken,
		sourceQuantity,
	});

	return expectedRates[0];
};

export default getBestExpectedRate;
