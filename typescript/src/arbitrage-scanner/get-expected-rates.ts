import Token from '../interfaces/Token';
import sortExpectedRates from '../utils/sort-expected-rates';
import getUniswapV2ExecutionPrice from '../exchanges/uniswap-v2/get-uniswap-v2-execution-price';
import getKyberNetworkExpectedRate from '../exchanges/kyber-network/get-kyber-network-expected-rate';

interface GetExpectedRatesArgs {
	sourceToken: Token;
	destinationToken: Token;
	sourceQuantity?: string;
}

const getExeptedRates = async ({
	sourceToken,
	destinationToken,
	sourceQuantity,
}: GetExpectedRatesArgs) => {
	const uniswapV2ExpectedRates = await getUniswapV2ExecutionPrice({
		sourceToken,
		destinationToken,
		sourceQuantity,
	});

	const kyberExpectedRates = await getKyberNetworkExpectedRate({
		sourceToken,
		destinationToken,
		sourceQuantity,
	});

	const sortedExpectedRates = sortExpectedRates([
		uniswapV2ExpectedRates,
		kyberExpectedRates,
	]);

	return sortedExpectedRates;
};

export default getExeptedRates;
