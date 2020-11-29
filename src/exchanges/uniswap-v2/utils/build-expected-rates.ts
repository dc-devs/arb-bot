import { Trade } from '@uniswap/sdk';
import formatPrice from '../../utils/format-price';

interface BuildExpectedRatesArgs {
	uniTrade: Trade;
}

const buildExpectedRates = ({ uniTrade }: BuildExpectedRatesArgs) => {
	const { executionPrice, nextMidPrice } = uniTrade;

	const executionPriceNumber = Number(executionPrice.toSignificant(6));
	const executionPriceString = executionPriceNumber.toString();
	const executionPriceFormatted = formatPrice(executionPriceNumber);

	const nextMidPriceNumber = Number(nextMidPrice.toSignificant(6));
	const nextMidPriceString = nextMidPriceNumber.toString();
	const nextMidPriceFormatted = formatPrice(nextMidPriceNumber);

	return {
		number: {
			expectedRate: executionPriceNumber,
			nextMidPrice: nextMidPriceNumber,
		},
		string: {
			expectedRate: executionPriceString,
			nextMidPrice: nextMidPriceString,
		},
		formatted: {
			expectedRate: executionPriceFormatted,
			nextMidPrice: nextMidPriceFormatted,
		},
	};
};

export default buildExpectedRates;
