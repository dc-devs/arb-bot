import to from 'await-to-js';
import getExecutionPrice from './exchanges/uniswap/getExecutionPrice';

const checkPair = async () => {
	const [executionPriceError, executionPrice] = await to(
		getExecutionPrice('DAI')
	);

	if (executionPriceError) {
		throw executionPriceError;
	}

	console.log(executionPrice);
};

export default checkPair;
