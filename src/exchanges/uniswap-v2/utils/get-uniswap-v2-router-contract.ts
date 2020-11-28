import dotenv from 'dotenv';
import { ethers } from 'ethers';
import chainIds from '../../../constants/chain-ids';
import getAccount from '../../../ethers/get-account';
import uniswapV2RouterAbi from '../constants/uniswap-v2-router-abi';
import uniswapV2RouterAddress from '../constants/uniswap-v2-router-address';

dotenv.config();

const getUniswapV2RouterContract = () => {
	const chainId = chainIds.MAINNET;
	const metaMaskPrivateKey = process.env.METAMASK_PRIVATE_KEY as string;
	const account = getAccount(chainId, metaMaskPrivateKey);

	const uniswapV2RouterContract = new ethers.Contract(
		uniswapV2RouterAddress,
		uniswapV2RouterAbi,
		account
	);

	return uniswapV2RouterContract;
};

export default getUniswapV2RouterContract;
