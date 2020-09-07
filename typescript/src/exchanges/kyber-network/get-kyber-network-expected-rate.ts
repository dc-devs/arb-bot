import { web3 } from '../../providers/web3';
import formatPrice from '../../utils/formatPrice';
import getReadableRate from './utils/getReadbleRate';
import GetExpectedRatePriceArgs from '../../interfaces/args/get-expected-price-args';
import getKyberNetworkProxyContract from './get-kyber-network-proxy-contract';

const getKyberNetworkExpectedRate = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity = '1',
}: GetExpectedRatePriceArgs) => {
	try {
		const kyberNetworkProxyContract = getKyberNetworkProxyContract();
		const srcTokenAddress = sourceToken.address;
		const destTokenAddress = destinationToken.address;
		const srcQty = web3.utils.toWei(sourceTokenQuantity);
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
			sourceTokenQuantity,
			sourceToken,
			destinationToken,
			raw: {
				expectedRate: readableExpectedRate,
				worstRate: readableWorstRate,
			},
			rawString: {
				expectedRate: readableExpectedRate.toString(),
				worstRate: readableWorstRate.toString(),
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

export default getKyberNetworkExpectedRate;
