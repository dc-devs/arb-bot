import { web3 } from '../../providers/web3';
import formatPrice from '../utils/format-price';
import getReadableRate from './utils/get-readable-rate';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import getKyberNetworkProxyContract from './utils/get-kyber-network-proxy-contract';
import getExpectedDestinationTokenQuantity from '../utils/get-expected-destination-token-quantity';

const getKyberNetworkTradeData = async ({
	inputToken,
	outputToken,
	inputTokenQuantity = '1',
}: GetTradeDataArgs) => {
	try {
		const kyberNetworkProxyContract = getKyberNetworkProxyContract();
		const inputTokenQuantityWei = web3.utils.toWei(inputTokenQuantity);
		const kyberExpectedRates = await kyberNetworkProxyContract.methods
			.getExpectedRate(
				inputToken.address,
				outputToken.address,
				inputTokenQuantityWei
			)
			.call();

		const { expectedRate, worstRate } = kyberExpectedRates;

		const readableExpectedRate = getReadableRate(expectedRate);
		const readableWorstRate = getReadableRate(worstRate);

		const formattedExpectedRate = formatPrice(readableExpectedRate);
		const formattedWorstRate = formatPrice(readableWorstRate);
		const outputTokenQuantity = getExpectedDestinationTokenQuantity({
			inputTokenQuantity,
			expectedRate: readableExpectedRate.toString(),
		});
		// TODO: USE WEB3 To Calc Gas Price..
		const platformFeesWei = web3.utils.toWei('0');
		const platformFeesEth = web3.utils.toWei('0', 'ether');
		const platformFeesBN = web3.utils.toBN(platformFeesWei);

		return {
			exchange: 'Kyber Network',
			inputTokenQuantity,
			inputToken,
			outputToken,
			outputTokenQuantity,
			platformFees: {
				wei: platformFeesWei,
				eth: platformFeesEth,
				BN: platformFeesBN,
			},
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
			gasEstimate: '0',
		};
	} catch (error) {
		throw new Error(`Method::getKyberNetworkTradeData: ${error}`);
	}
};

export default getKyberNetworkTradeData;
