import ExpectedRates from '../../interfaces/Expected-Rates';

interface GetArbitrageTradingInstructionsArgs {
	outgoingExpectedRate: ExpectedRates;
	incomingExpectedRate: ExpectedRates;
}
interface GetExpectedDestinationTokensArgs {
	expectedRate: string;
	sourceTokenQuantity: string;
}
const getExpectedDestinationTokens = ({
	expectedRate,
	sourceTokenQuantity,
}: GetExpectedDestinationTokensArgs) => {
	return parseFloat(expectedRate) * parseFloat(sourceTokenQuantity);
};

const getArbitrageTradingInstructions = ({
	outgoingExpectedRate,
	incomingExpectedRate,
}: GetArbitrageTradingInstructionsArgs) => {
	const outgoingTrade = {
		exchange: outgoingExpectedRate.exchange,
		sourceToken: outgoingExpectedRate.sourceToken.symbol,
		sourceTokenQuantity: outgoingExpectedRate.sourceTokenQuantity,
		destinationToken: outgoingExpectedRate.destinationToken.symbol,
		expectedRate: outgoingExpectedRate.rawString.expectedRate,
		expectedDestinationTokenQuantity: getExpectedDestinationTokens({
			expectedRate: outgoingExpectedRate.rawString.expectedRate,
			sourceTokenQuantity: outgoingExpectedRate.sourceTokenQuantity,
		}),
	};

	const incomingTrade = {
		exchange: incomingExpectedRate.exchange,
		sourceToken: incomingExpectedRate.sourceToken.symbol,
		sourceTokenQuantity: incomingExpectedRate.sourceTokenQuantity,
		destinationToken: incomingExpectedRate.destinationToken.symbol,
		expectedRate: incomingExpectedRate.rawString.expectedRate,
		expectedDestinationTokenQuantity: getExpectedDestinationTokens({
			expectedRate: incomingExpectedRate.rawString.expectedRate,
			sourceTokenQuantity: incomingExpectedRate.sourceTokenQuantity,
		}),
	};

	return {
		outgoingTrade,
		incomingTrade,
	};
};

export default getArbitrageTradingInstructions;
