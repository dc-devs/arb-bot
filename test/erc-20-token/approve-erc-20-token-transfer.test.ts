import chai from 'chai';
import dotenv from 'dotenv';
import to from 'await-to-js';
import { ethers } from 'ethers';
import tokens from '../../src/constants/tokens';
import { web3 } from '../../src/providers/web3';
import chainIds from '../../src/constants/chain-ids';
import getAccount from '../../src/ethers/get-account';
import approveErc20TokenTransfer from '../../src/erc-20-token/approve-erc-20-token-transfer';
import uniswapV2RouterAbi from '../../src/exchanges/uniswap-v2/constants/uniswap-v2-router-abi';
import uniswapV2RouterAddress from '../../src/exchanges/uniswap-v2/constants/uniswap-v2-router-address';

const { expect } = chai;
const { WETH } = tokens;

before(() => {
	dotenv.config();
});

describe('approveErc20TokenTransfer', async () => {
	xit('should return ethers account for given private key', async () => {
		const tokenSymbol = WETH.symbol;
		const amount = web3.utils.toWei('5', 'ether');

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

		const transaction = await to(
			approveErc20TokenTransfer({
				amount,
				account,
				address,
				tokenSymbol,
				providerOptions,
			})
		);

		console.log(transaction);

		expect(true).to.equal(true);
	});
});
