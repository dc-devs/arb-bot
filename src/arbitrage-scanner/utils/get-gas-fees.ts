import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface GasFees {
	fastest: number;
	fastestWait: number;
}

interface GetFunction {
	(url?: string): { data: GasFees };
}

interface MockAxios {
	get: GetFunction;
}

const getGasFees = async (mockAxios?: MockAxios) => {
	try {
		const dividendForGwei = 10;
		const apiKey = process.env.DEFI_PULSE_API_KEY;
		const url = `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${apiKey}`;
		const { data } = await (mockAxios || axios).get(url);
		const { fastest, fastestWait } = data as GasFees;
		const fastestGasPrice = (fastest / dividendForGwei).toString();

		const gasFees = {
			fastestGasPrice,
			fastestWait,
		};

		return gasFees;
	} catch (error) {
		throw new Error(`Method::getGasFees: ${error}`);
	}
};

export default getGasFees;
