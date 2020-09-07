import ExpectedRates from '../../interfaces/Expected-Rates';

interface GetArbitrageTradingInstructionsArgs {
	outgoingExpectedRate: ExpectedRates;
	incomingExpectedRate: ExpectedRates;
}

const getArbitrageTradingInstructions = ({
	outgoingExpectedRate,
	incomingExpectedRate,
}: GetArbitrageTradingInstructionsArgs) => {
	const outgoingTrade = {
		exchange: outgoingExpectedRate.exchange,
		sourceToken: outgoingExpectedRate.sourceToken.symbol,
		sourceTokenQuantity: outgoingExpectedRate.sourceTokenQuantity,
		destinationToken: outgoingExpectedRate.destinationToken.symbol,
		expectedRate: outgoingExpectedRate.expectedRates.rawString.expectedRate,
		expectedDestinationTokenQuantity:
			outgoingExpectedRate.expectedDestinationTokenQuantity,
	};

	const incomingTrade = {
		exchange: incomingExpectedRate.exchange,
		sourceToken: incomingExpectedRate.sourceToken.symbol,
		sourceTokenQuantity: incomingExpectedRate.sourceTokenQuantity,
		destinationToken: incomingExpectedRate.destinationToken.symbol,
		expectedRate: incomingExpectedRate.expectedRates.rawString.expectedRate,
		expectedDestinationTokenQuantity:
			incomingExpectedRate.expectedDestinationTokenQuantity,
	};

	return {
		outgoingTrade,
		incomingTrade,
	};
};

export default getArbitrageTradingInstructions;
