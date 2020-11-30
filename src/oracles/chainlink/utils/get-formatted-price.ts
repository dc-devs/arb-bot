import buildDivisor from './build-divisor';

const getFormattedPrice = (price: string, decmials: string) => {
	const priceNum = Number(price);
	const decimalsNum = Number(decmials);
	const divisor = buildDivisor(decimalsNum);

	return priceNum / divisor;
};

export default getFormattedPrice;
