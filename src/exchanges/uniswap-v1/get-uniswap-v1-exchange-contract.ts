import Web3 from 'web3';
import to from 'await-to-js';
import uniswapExhangeAbi from './constants/uniswap-exchange-abi';
import getFactoryContract from './get-uniswap-v1-factory-contract';

const getExchangeContract = async (web3: Web3, tokenAddress: string) => {
	const factoryContract = getFactoryContract(web3);

	const [exchangeAddressError, exchangeAddress] = (await to(
		factoryContract.methods.getExchange(tokenAddress).call()
	)) as string[];

	if (exchangeAddressError) {
		throw exchangeAddressError;
	}

	return new web3.eth.Contract(uniswapExhangeAbi, exchangeAddress);
};

export default getExchangeContract;
