import scan from './scan';
import dotenv from 'dotenv';
import Web3 from 'web3';

dotenv.config();

const start = () => {
	const rpcUrl = process.env.RPC_URL;

	if (rpcUrl) {
		const web3 = new Web3(rpcUrl);
		scan(web3);
	} else {
		console.log('Please provide your RPC_URL!');
	}
};

export default start;
