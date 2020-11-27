import dotenv from 'dotenv';
import { ethers, Wallet } from 'ethers';
import tokens from '../constants/tokens';
import erc20TokenAbi from './erc-20-token-abi';

dotenv.config();

const getErc20TokenContract = (account: Wallet, tokenName: string) => {
	const token = tokens[tokenName];
	const tokenContract = new ethers.Contract(
		token.address,
		erc20TokenAbi,
		account
	);

	return tokenContract;
};

export default getErc20TokenContract;
