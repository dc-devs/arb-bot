import Trade from './Trade';

interface TradePair {
	outgoingTrade: Trade;
	incomingTrade: Trade;
	expectedTradeGain: number;
}

export default TradePair;
