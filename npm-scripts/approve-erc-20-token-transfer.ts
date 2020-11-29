import dotenv from 'dotenv';
import to from 'await-to-js';
import { ethers } from 'ethers';
import yargs = require('yargs/yargs');
import tokens from '../src/constants/tokens';
import { web3 } from '../src/providers/web3';
import chainIds from '../src/constants/chain-ids';
import getAccount from '../src/ethers/get-account';
import approveErc20TokenTransfer from '../src/erc-20-token/approve-erc-20-token-transfer';
import uniswapV2RouterAbi from '../src/exchanges/uniswap-v2/constants/uniswap-v2-router-abi';
import uniswapV2RouterAddress from '../src/exchanges/uniswap-v2/constants/uniswap-v2-router-address';

const argv = yargs(process.argv.slice(2)).options({
	tokenSymbol: { type: 'string' },
	amountEth: { type: 'string' },
}).argv;

const { tokenSymbol, amountEth } = argv;

dotenv.config();

(async () => {
	if (!tokenSymbol || !tokens[tokenSymbol]) {
		console.log('Error: Unsupported Token Symbol');
		process.exit(1);
	} else if (!amountEth) {
		console.log('Error: Token amount must be specified');
		process.exit(1);
	} else {
		const amountEthString = amountEth.toString();
		const amountBN = web3.utils.toWei(amountEthString, 'ether');
		const amount = amountBN.toString();

		const chainId = chainIds.MAINNET;
		const privateKey = process.env.METAMASK_PRIVATE_KEY as string;
		const account = getAccount(chainId, privateKey);

		const uniswapV2RouterContract = new ethers.Contract(
			uniswapV2RouterAddress,
			uniswapV2RouterAbi,
			account
		);
		const address = uniswapV2RouterContract.address;

		const providerOptions = {
			gasPrice: web3.utils.toWei('30', 'gwei'),
		};

		const [error, transaction] = await to(
			approveErc20TokenTransfer({
				amount,
				account,
				address,
				tokenSymbol,
				providerOptions,
			})
		);

		if (error) {
			console.log(error);
			process.exit(1);
		}

		console.log(transaction);
		console.log('');
		console.log('--- Etherscan Transaction ---');
		console.log(`https://etherscan.io/tx/${transaction.hash}`);
		console.log('');
	}
})();
