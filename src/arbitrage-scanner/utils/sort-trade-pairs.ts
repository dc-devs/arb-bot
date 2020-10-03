import TradePair from '../../interfaces/TradePair';

const sortTradePairs = (tradePairs: any[]) => {
	return tradePairs.sort((a: TradePair, b: TradePair) => {
		const tradePairA = a.expectedTradeGain;
		const tradePairB = b.expectedTradeGain;

		return tradePairB - tradePairA;
	});
};

export default sortTradePairs;
