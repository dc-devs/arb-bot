import ExpectedRates from '../../interfaces/Trade';

interface AnalyzeTradeArgs {
	outgoingTrade: ExpectedRates;
	incomingTrade: ExpectedRates;
}

const analyzeTrade = ({ outgoingTrade, incomingTrade }: AnalyzeTradeArgs) => {
	const outgoingTradeData = {
		exchange: outgoingTrade.exchange,
		platformFees: outgoingTrade.platformFees,
		expectedRate: outgoingTrade.expectedRates.string.expectedRate,
		gasEstimate: outgoingTrade.gasEstimate,
		inputToken: outgoingTrade.inputToken.symbol,
		inputTokenQuantity: outgoingTrade.inputTokenQuantity,
		outputToken: outgoingTrade.outputToken.symbol,
		outputTokenQuantity: outgoingTrade.outputTokenQuantity,
	};

	const incomingTradeData = {
		exchange: incomingTrade.exchange,
		platformFees: incomingTrade.platformFees,
		expectedRate: incomingTrade.expectedRates.string.expectedRate,
		gasEstimate: incomingTrade.gasEstimate,
		inputToken: incomingTrade.inputToken.symbol,
		inputTokenQuantity: incomingTrade.inputTokenQuantity,
		outputToken: incomingTrade.outputToken.symbol,
		outputTokenQuantity: incomingTrade.outputTokenQuantity,
	};

	const expectedTradeGain =
		Number(incomingTradeData.outputTokenQuantity) -
		Number(outgoingTradeData.inputTokenQuantity);

	return {
		outgoingTrade: outgoingTradeData,
		incomingTrade: incomingTradeData,
		expectedTradeGain,
	};
};

export default analyzeTrade;
