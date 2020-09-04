import Web3 from 'web3';
import formatPrice from '../../utils/formatPrice';
import getReadableRate from './utils/getReadbleRate';
import tokenSymbolAddressMap from '../../constants/token-symbol-address-map';
import getKyberNetworkProxyContract from './get-kyber-network-proxy-contract';

const getKyberExpectedRate = async (
	web3: Web3,
	srcTokenSymbol: string,
	destTokenSymbol: string,
	sourceQuantity?: number | string
) => {
	const kyberNetworkProxyContract = await getKyberNetworkProxyContract(web3);
	const srcTokenAddress = tokenSymbolAddressMap[srcTokenSymbol];
	const destTokenAddress = tokenSymbolAddressMap[destTokenSymbol];
	const srcQuantityStr = sourceQuantity?.toString() || '1';
	const srcQty = web3.utils.toWei(srcQuantityStr);
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
};

export default getKyberExpectedRate;
