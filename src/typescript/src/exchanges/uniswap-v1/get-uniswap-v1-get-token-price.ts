import { web3 } from '../../providers/web3';
import TokenInterface from '../../interfaces/Token';
import formatPrice from '../utils/format-price';
import getExchangeContract from './get-uniswap-v1-exchange-contract';

interface GetTokenPriceArgs {
	destinationToken: TokenInterface;
	sourceQuantity?: string;
}

const getTokenPrice = async ({
	destinationToken,
	sourceQuantity = '1',
}: GetTokenPriceArgs) => {
	try {
		const exhangeContract = await getExchangeContract(destinationToken);

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
			rawString: {
				expectedRate: readableTokenPrice.toString(),
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
