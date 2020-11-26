import dotenv from 'dotenv';
import { ethers } from 'ethers';
import getAccount from '../ethers/get-account';
import tokens from '../constants/tokens';
import erc20TokenAbi from './erc-20-token-abi';

dotenv.config();

const getErc20TokenContract = (network: string, tokenName: string) => {
	const token = tokens[tokenName];
	const privateKey = process.env.METAMASK_PRIVATE_KEY as string;
	const account = getAccount(network, privateKey);
	const tokenContract = new ethers.Contract(
		token.address,
		erc20TokenAbi,
		account
	);

	return tokenContract;
};

export default getErc20TokenContract;
