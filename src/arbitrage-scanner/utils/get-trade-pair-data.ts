import Token from '../../interfaces/Token';
import analyzeTrade from './analyze-trade';
import getBestTrade from './get-best-trade';
import addGasPriceData from './add-gas-price-data';

interface GetTradePairDataArgs {
	inputToken: Token;
	outputToken: Token;
	customGasPrice?: string;
	inputTokenQuantity: string;
}

const getTradePairData = async ({
	inputToken,
	outputToken,
	customGasPrice,
	inputTokenQuantity,
}: GetTradePairDataArgs) => {
	let bestOutgoingTrade = await getBestTrade({
		inputToken,
		outputToken,
		inputTokenQuantity,
	});

	let bestIncomingTrade = await getBestTrade({
		inputToken: outputToken,
		outputToken: inputToken,
		inputTokenQuantity: bestOutgoingTrade.outputTokenQuantity,
	});

	bestOutgoingTrade = await addGasPriceData({
		customGasPrice,
		trade: bestOutgoingTrade,
	});

	bestIncomingTrade = await addGasPriceData({
		customGasPrice,
		trade: bestIncomingTrade,
	});

	return analyzeTrade({
		outgoingTrade: bestOutgoingTrade,
		incomingTrade: bestIncomingTrade,
	});
};

export default getTradePairData;
