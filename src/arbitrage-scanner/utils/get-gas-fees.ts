import { web3 } from '../../providers/web3';
import tokens from '../../constants/tokens';
import getChainlinkTokenPrice from '../../oracles/chainlink/get-chainlink-price-for-token';

const getGasFees = async (gasPriceGwei: string, estimatedGas: string) => {
	const { ETH } = tokens;
	const priceEtherUSD = await getChainlinkTokenPrice(ETH.symbol);

	const gasPriceWei = web3.utils.toWei(gasPriceGwei, 'gwei');
	const gasPriceEth = web3.utils.fromWei(gasPriceWei, 'ether');

	const gasFeeEth = Number(gasPriceEth) * Number(estimatedGas);
	const gasPriceUSD = gasFeeEth * priceEtherUSD;

	return {
		eth: gasFeeEth.toString(),
		usd: gasPriceUSD.toFixed(2),
	};
};

export default getGasFees;
