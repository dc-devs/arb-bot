import formatPrice from '../../utils/formatPrice';
import getReadableRate from './utils/getReadbleRate';
import GetExectutionPriceArgs from '../../interfaces/args/get-execution-price-args';
import getKyberNetworkProxyContract from './get-kyber-network-proxy-contract';

const getKyberExpectedRate = async ({
	web3,
	sourceToken,
	destinationToken,
	sourceQuantity = '1',
}: GetExectutionPriceArgs) => {
	try {
		const kyberNetworkProxyContract = await getKyberNetworkProxyContract(
			web3
		);
		const srcTokenAddress = sourceToken.address;
		const destTokenAddress = destinationToken.address;
		const srcQty = web3.utils.toWei(sourceQuantity);
		const kyberExpectedRates = await kyberNetworkProxyContract.methods
			.getExpectedRate(srcTokenAddress, destTokenAddress, srcQty)
			.call();

		const { expectedRate, worstRate } = kyberExpectedRates;

		const readableExpectedRate = getReadableRate(expectedRate);
		const readableWorstRate = getReadableRate(worstRate);

		const formattedExpectedRate = formatPrice(readableExpectedRate);
		const formattedWorstRate = formatPrice(readableWorstRate);

		return {
			exchange: 'Kyber Network',
			raw: {
				expectedRate: readableExpectedRate,
				worstRate: readableWorstRate,
			},
			formatted: {
				expectedRate: formattedExpectedRate,
				worstRate: formattedWorstRate,
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};

export default getKyberExpectedRate;
