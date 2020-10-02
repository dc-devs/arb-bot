import { web3 } from '../../providers/web3';
import uniswapV2RouterAbi from './constants/uniswap-v2-router-abi';
import uniswapV2RouterAddress from './constants/uniswap-v2-router-address';

const getUniswapV2RouterContract = () => {
	return new web3.eth.Contract(uniswapV2RouterAbi, uniswapV2RouterAddress);
};

export default getUniswapV2RouterContract;
