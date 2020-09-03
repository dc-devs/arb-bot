import numeral from 'numeral';

const formatPrice = (price: number) => {
	return numeral(price).format('0,0.000000000000000000');
};

export default formatPrice;
