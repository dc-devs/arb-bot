import Web3 from 'web3';
import to from 'await-to-js';
import getExchangeContract from './get-uniswap-v1-exchange-contract';
import tokenSymbolAddressMap from '../../constants/token-symbol-address-map';

const getTokenPrice = async (web3: Web3, tokenSymbol: string) => {
	const oneEther = web3.utils.toWei('1', 'ether');
	const tokenAddress = tokenSymbolAddressMap[tokenSymbol];

	const [exhangeContractError, exhangeContract] = await to(
		getExchangeContract(web3, tokenAddress)
	);

	if (exhangeContractError) {
		throw exhangeContractError;
	}

	const tokenPriceWei = await exhangeContract?.methods
		?.getEthToTokenInputPrice(oneEther)
		?.call();

	return web3.utils.fromWei(tokenPriceWei, 'ether');
};

export default getTokenPrice;
