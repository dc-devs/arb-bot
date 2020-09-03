import Web3 from 'web3';
import formatPrice from '../../utils/formatPrice';
import getReadableRate from './utils/getReadbleRate';
import tokenSymbolAddressMap from '../../constants/token-symbol-address-map';
import getKyberNetworkProxyContract from './get-kyber-network-proxy-contract';

const getKyberExpectedRate = async (
	web3: Web3,
	srcTokenSymbol: string,
	destTokenSymbol: string
) => {
	const kyberNetworkProxyContract = await getKyberNetworkProxyContract(web3);
	const srcTokenAddress = tokenSymbolAddressMap[srcTokenSymbol];
	const destTokenAddress = tokenSymbolAddressMap[destTokenSymbol];

	const kyberExpectedRates = await kyberNetworkProxyContract.methods
		.getExpectedRate(srcTokenAddress, destTokenAddress, 1)
		.call();

	const { expectedRate, worstRate } = kyberExpectedRates;

	const readableExpectedRate = getReadableRate(expectedRate);
	const readableWorstRate = getReadableRate(worstRate);

	const formattedExpectedRate = formatPrice(readableExpectedRate);
	const formattedWorstRate = formatPrice(readableWorstRate);

	return {
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
