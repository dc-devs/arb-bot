import Web3 from 'web3';
import uniswapFactoryAbi from './constants/uniswap-factory-abi';
import uniswapFactoryAddress from './constants/uniswap-factory-address';

const getFactoryContract = (web3: Web3) => {
	return new web3.eth.Contract(uniswapFactoryAbi, uniswapFactoryAddress);
};

export default getFactoryContract;
