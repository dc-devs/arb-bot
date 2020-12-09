import Trade from '../../interfaces/Trade';
import getTradeData from './get-trade-data';
import getExpectedTradeGain from './get-expected-trade-gain';

interface AnalyzeTradeArgs {
	outgoingTrade: Trade;
	incomingTrade: Trade;
}

const analyzeTrade = ({ outgoingTrade, incomingTrade }: AnalyzeTradeArgs) => {
	const outgoingTradeData = getTradeData(outgoingTrade);
	const incomingTradeData = getTradeData(incomingTrade);
	const expectedTradeGain = getExpectedTradeGain({
		outgoingTradeData,
		incomingTradeData,
	});

	return {
		outgoingTrade: outgoingTradeData,
		incomingTrade: incomingTradeData,
		expectedTradeGain,
	};
};

export default analyzeTrade;
