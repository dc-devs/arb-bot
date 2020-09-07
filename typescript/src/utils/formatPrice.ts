import numeral from 'numeral';

const formatPrice = (price: number | string) => {
	let priceInt = price;

	if (typeof price === 'string') {
		priceInt = parseFloat(price);
	}

	return numeral(priceInt).format('0,0.000000000000000000');
};

export default formatPrice;
