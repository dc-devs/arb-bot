import getGasFees from '../utils/get-gas-fees';
import getGasPriceDate from '../../apis/defi-pulse/get-gas-price-data';
import Trade from '../../interfaces/Trade';

interface AddGasPriceDataArgs {
	trade: Trade;
	customGasPrice?: string;
}

const addGasPriceData = async ({
	trade,
	customGasPrice,
}: AddGasPriceDataArgs) => {
	let gasPriceGwei;
	const tradeCopy = { ...trade };

	if (customGasPrice) {
		gasPriceGwei = customGasPrice;
	} else {
		const gasPriceData = await getGasPriceDate();
		gasPriceGwei = gasPriceData.prices.fastest;
	}

	const gasFees = await getGasFees(gasPriceGwei, tradeCopy.gasEstimate);

	tradeCopy.gasFees = gasFees;
	tradeCopy.gasPrice = gasPriceGwei;

	return tradeCopy;
};

export default addGasPriceData;
