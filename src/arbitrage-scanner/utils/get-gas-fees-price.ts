import getGasFees from './get-gas-fees';
import getChainlinkTokenPrice from '../../oracles/chainlink/get-chainlink-token-price';

const getGasFeesPrice = async () => {
	const gasFees = await getGasFees();
	const priceEther = await getChainlinkTokenPrice();

	const gasFeesPrice = Number(gasFees.fastestGasPrice) * priceEther;

	return gasFeesPrice.toString();
};

export default getGasFeesPrice;
