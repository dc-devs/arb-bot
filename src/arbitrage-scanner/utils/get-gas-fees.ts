import axios from 'axios';
import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';

dotenv.config();

interface GasFees {
	fastest: number;
	fastestWait: number;
}

const getGasFees = async () => {
	try {
		const apiKey = process.env.DEFI_PULSE_API_KEY;
		const url = `https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${apiKey}`;

		const { data } = await axios.get(url);
		const { fastest, fastestWait } = data as GasFees;

		const fastestGwei = (fastest / 10).toString();
		const fastestWei = web3.utils.toWei(fastestGwei, 'gwei');
		const fastestEth = web3.utils.fromWei(fastestWei, 'ether');

		const gasFees = {
			fastestWei,
			fastestEth,
			fastestGwei,
			fastestWait,
		};

		return gasFees;
	} catch (error) {
		throw new Error(error);
	}
};

export default getGasFees;
