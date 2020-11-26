import dotenv from 'dotenv';
import { ethers } from 'ethers';
import infuraNetworks from '../constants/infuraNetworks';

dotenv.config();

const getAccount = (networkName: string, privateKey: string) => {
	const network = infuraNetworks[networkName];
	const signer = new ethers.Wallet(privateKey);

	const provider = new ethers.providers.InfuraProvider(network, {
		projectId: process.env.INFURA_PROJECT_ID,
		projectSecret: process.env.INFURA_PROJECT_SECRET,
	});

	return signer.connect(provider);
};

export default getAccount;
