import ExpectedRates from '../../interfaces/Trade';

interface AnalyzeTradeArgs {
	outgoingTrade: ExpectedRates;
	incomingTrade: ExpectedRates;
}

const analyzeTrade = ({ outgoingTrade, incomingTrade }: AnalyzeTradeArgs) => {
	const outgoingTradeData = {
		exchange: outgoingTrade.exchange,
		sourceToken: outgoingTrade.sourceToken.symbol,
		sourceTokenQuantity: outgoingTrade.sourceTokenQuantity,
		destinationToken: outgoingTrade.destinationToken.symbol,
		expectedRate: outgoingTrade.expectedRates.rawString.expectedRate,
		expectedDestinationTokenQuantity:
			outgoingTrade.expectedDestinationTokenQuantity,
	};

	const incomingTradeData = {
		exchange: incomingTrade.exchange,
		sourceToken: incomingTrade.sourceToken.symbol,
		sourceTokenQuantity: incomingTrade.sourceTokenQuantity,
		destinationToken: incomingTrade.destinationToken.symbol,
		expectedRate: incomingTrade.expectedRates.rawString.expectedRate,
		expectedDestinationTokenQuantity:
			incomingTrade.expectedDestinationTokenQuantity,
	};

	const expectedTradeGain =
		parseFloat(incomingTradeData.expectedDestinationTokenQuantity) -
		parseFloat(outgoingTradeData.sourceTokenQuantity);

	return {
		outgoingTrade: outgoingTradeData,
		incomingTrade: incomingTradeData,
		expectedTradeGain,
	};
};

export default analyzeTrade;
