import Trade from '../interfaces/Trade';

const sortTrades = (trades: Trade[]) => {
	return trades.sort((a: Trade, b: Trade) => {
		const tradeA = a.expectedRates.raw.expectedRate;
		const tradeB = b.expectedRates.raw.expectedRate;

		return tradeB - tradeA;
	});
};

export default sortTrades;
