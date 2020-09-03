import numeral from 'numeral';

const formatPrice = (price: number | string) => {
	let priceInt = price;

	if (typeof price === 'string') {
		priceInt = parseInt(price, 10);
	}

	return numeral(priceInt).format('0,0.000000');
};

export default formatPrice;
