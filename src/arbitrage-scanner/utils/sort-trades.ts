import Trade from '../../interfaces/Trade';

const sortTrades = (trades: Trade[]) => {
	return trades.sort((a: Trade, b: Trade) => {
		const tradeA = a.expectedRates.number.expectedRate;
		const tradeB = b.expectedRates.number.expectedRate;

		return tradeB - tradeA;
	});
};

export default sortTrades;
