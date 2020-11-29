import { web3 } from '../../providers/web3';
import formatPrice from '../utils/format-price';
import getReadableRate from './utils/getReadbleRate';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import getKyberNetworkProxyContract from './get-kyber-network-proxy-contract';
import getExpectedDestinationTokenQuantity from '../utils/get-expected-destination-token-quantity';

const getKyberNetworkTradeData = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity = '1',
}: GetTradeDataArgs) => {
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
		const expectedDestinationTokenQuantity = getExpectedDestinationTokenQuantity(
			{
				sourceTokenQuantity,
				expectedRate: readableExpectedRate.toString(),
			}
		);
		// TODO: USE WEB3 To Calc Gas Price..
		return {
			exchange: 'Kyber Network',
			sourceTokenQuantity,
			sourceToken,
			destinationToken,
			expectedDestinationTokenQuantity,
			expectedRates: {
				number: {
					expectedRate: readableExpectedRate,
					worstRate: readableWorstRate,
				},
				string: {
					expectedRate: readableExpectedRate.toString(),
					worstRate: readableWorstRate.toString(),
				},
				formatted: {
					expectedRate: formattedExpectedRate,
					worstRate: formattedWorstRate,
				},
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};

export default getKyberNetworkTradeData;
