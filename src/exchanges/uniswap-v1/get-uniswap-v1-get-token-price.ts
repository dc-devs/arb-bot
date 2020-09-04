import Web3 from 'web3';
import TokenInterface from '../../interfaces/Token';
import formatPrice from '../../utils/formatPrice';
import getExchangeContract from './get-uniswap-v1-exchange-contract';

interface GetTokenPriceArgs {
	web3: Web3;
	destinationToken: TokenInterface;
	sourceQuantity?: string;
}

const getTokenPrice = async ({
	web3,
	destinationToken,
	sourceQuantity = '1',
}: GetTokenPriceArgs) => {
	try {
		const exhangeContract = await getExchangeContract(
			web3,
			destinationToken
		);

		const tokenPriceWei = await exhangeContract?.methods
			?.getEthToTokenInputPrice(web3.utils.toWei(sourceQuantity))
			?.call();

		const readableTokenPrice = parseFloat(
			web3.utils.fromWei(tokenPriceWei, 'ether')
		);

		const formattedTokenPrice = formatPrice(readableTokenPrice);

		return {
			exchange: 'Uniswap v1',
			raw: {
				expectedRate: readableTokenPrice,
			},
			formatted: {
				expectedRate: formattedTokenPrice,
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};

export default getTokenPrice;
