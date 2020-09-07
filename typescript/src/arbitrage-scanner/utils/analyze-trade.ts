import ExpectedRates from '../../interfaces/Trade';

interface AnalyzeTradeArgs {
	outgoingExpectedRate: ExpectedRates;
	incomingExpectedRate: ExpectedRates;
}

const analyzeTrade = ({
	outgoingExpectedRate,
	incomingExpectedRate,
}: AnalyzeTradeArgs) => {
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

export default analyzeTrade;
