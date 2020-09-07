import Web3 from 'web3';
import Token from '../../interfaces/Token';
import uniswapExhangeAbi from './constants/uniswap-exchange-abi';
import getFactoryContract from './get-uniswap-v1-factory-contract';

const getExchangeContract = async (web3: Web3, destinationToken: Token) => {
	try {
		const factoryContract = getFactoryContract(web3);

		const exchangeAddress = await factoryContract.methods
			.getExchange(destinationToken.address)
			.call();

		if (exchangeAddress === '0x0000000000000000000000000000000000000000') {
			throw `Uniswap v1: The ${destinationToken.symbol} token does not yet have an exchange.`;
		}

		return new web3.eth.Contract(uniswapExhangeAbi, exchangeAddress);
	} catch (error) {
		throw new Error(error);
	}
};

export default getExchangeContract;
