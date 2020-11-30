import getGasFees from './get-gas-fees';
import tokens from '../../constants/tokens';
import getChainlinkTokenPrice from '../../oracles/chainlink/get-chainlink-price-for-token';

const getGasFeesPrice = async () => {
	const { ETH } = tokens;
	const gasFees = await getGasFees();
	const priceEther = await getChainlinkTokenPrice(ETH.symbol);

	const gasFeesPrice = Number(gasFees.fastestGasPrice) * priceEther;

	return gasFeesPrice.toString();
};

export default getGasFeesPrice;
