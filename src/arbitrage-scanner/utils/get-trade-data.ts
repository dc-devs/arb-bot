import Trade from '../../interfaces/Trade';

const getTradeData = (trade: Trade) => {
	return {
		exchange: trade.exchange,
		gasPrice: trade.gasPrice,
		gasLimit: trade.gasLimit,
		gasEstimate: trade.gasEstimate,
		transactionFees: trade.transactionFees,
		platformFees: trade.platformFees,
		expectedRate: trade.expectedRates.string,
		inputToken: trade.inputToken.symbol,
		inputTokenQuantity: trade.inputTokenQuantity,
		outputToken: trade.outputToken.symbol,
		outputTokenQuantity: trade.outputTokenQuantity,
	};
};

export default getTradeData;
