import Token from '../../interfaces/Token';
import getExpectedRates from './get-expected-rates';

interface GetBestExpectedRateArgs {
	sourceToken: Token;
	destinationToken: Token;
	sourceTokenQuantity?: string;
}

const getBestExpectedRate = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity,
}: GetBestExpectedRateArgs) => {
	const expectedRates = await getExpectedRates({
		sourceToken,
		destinationToken,
		sourceTokenQuantity,
	});

	return expectedRates[0];
};

export default getBestExpectedRate;
