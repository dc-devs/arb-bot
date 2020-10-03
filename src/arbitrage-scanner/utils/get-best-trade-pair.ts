// import TradePair from '../../interfaces/TradePair';
import sortTradePairs from './sort-trade-pairs';

const getBestTradePair = (tradePairs: any[]) => {
	return sortTradePairs(tradePairs)[0];
};

export default getBestTradePair;
