import scan from './scan';
import dotenv from 'dotenv';
import Web3 from 'web3';

dotenv.config();

const start = async () => {
	try {
		const rpcUrl = process.env.RPC_URL;

		if (rpcUrl) {
			const web3 = new Web3(rpcUrl);
			await scan(web3);
		} else {
			console.log('Please provide your RPC_URL!');
		}
	} catch (error) {
		throw error;
	}
};

export default start;
