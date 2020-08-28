import Web3 from 'web3';
import to from 'await-to-js';
import getExecutionPrice from '../exchanges/uniswapv2/getExecutionPrice';

const scan = (web3: Web3) => {
	console.log(web3);
	setInterval(async () => {
		const [executionPriceError, executionPrice] = await to(
			getExecutionPrice('DAI')
		);

		if (executionPriceError) {
			throw executionPriceError;
		}

		console.log('');
		console.log('--- UniswapV1 1 ETH -> DAI ---');
		console.log('executionPrice: ', executionPrice?.executionPrice);
		console.log('nextMidPrice: ', executionPrice?.nextMidPrice);
	}, 1000);
};

export default scan;
