import { web3 } from '../../providers/web3';
import uniswapFactoryAbi from './constants/uniswap-factory-abi';
import uniswapFactoryAddress from './constants/uniswap-factory-address';

const getFactoryContract = () => {
	return new web3.eth.Contract(uniswapFactoryAbi, uniswapFactoryAddress);
};

export default getFactoryContract;
