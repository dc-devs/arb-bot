import formatPrice from '../../utils/formatPrice';
import getExchangeContract from './get-uniswap-v1-exchange-contract';
import GetExectutionPriceArgs from '../../interfaces/args/get-execution-price-args';

const getTokenPrice = async ({
	web3,
	sourceToken,
	destinationToken,
	sourceQuantity = '1',
}: GetExectutionPriceArgs) => {
	try {
		console.log(sourceToken);
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
