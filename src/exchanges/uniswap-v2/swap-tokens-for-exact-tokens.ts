import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';
import { ethers } from 'ethers';
import tokens from '../../constants/tokens';
import { infura } from '../../providers/infura';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import uniswapV2RouterAbi from './constants/uniswap-v2-router-abi';
import uniswapV2RouterAddress from './constants/uniswap-v2-router-address';

import {
	Route,
	Token,
	Trade,
	ChainId,
	Percent,
	Fetcher,
	TradeType,
	TokenAmount,
} from '@uniswap/sdk';

dotenv.config();

const { WETH, ETH } = tokens;

const swapExactTokensForTokens = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity = '1',
}: GetTradeDataArgs) => {
	try {
		const setSourceToken =
			sourceToken.symbol === ETH.symbol ? WETH : sourceToken;
		const setDestinationToken =
			destinationToken.symbol === ETH.symbol ? WETH : destinationToken;

		// getUniswapTokens
		// -------------------
		const srcToken = new Token(
			ChainId.MAINNET,
			setSourceToken.address,
			setSourceToken.decimals,
			setSourceToken.symbol,
			setSourceToken.name
		);

		const destToken = new Token(
			ChainId.MAINNET,
			setDestinationToken.address,
			setDestinationToken.decimals,
			setDestinationToken.symbol,
			setDestinationToken.name
		);

		// getUniswapTrade
		// ----------------
		const tokenPair = await Fetcher.fetchPairData(
			destToken,
			srcToken,
			infura
		);

		const route = new Route([tokenPair], srcToken);
		const amountIn = web3.utils.toWei(sourceTokenQuantity);

		const trade = new Trade(
			route,
			new TokenAmount(srcToken, amountIn),
			TradeType.EXACT_INPUT
		);

		// getUniswapTradeArgs
		// -----------------------
		const slippageTolerance = new Percent('50', '10000'); // 50 bips, or 0.50%
		const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
		const path = [srcToken.address, destToken.address];
		const to = process.env.METAMASK_ADDRESS; // should be a checksummed recipient address
		const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
		// ETHER TO SEND?
		// const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex

		// Use the mainnet
		const network = 'homestead';
		const provider = new ethers.providers.InfuraProvider(network, {
			projectId: process.env.INFURA_PROJECT_ID,
			projectSecret: process.env.INFURA_PROJECT_SECRET,
		});

		const privateKey = process.env.METAMASK_PRIVATE_KEY as string;
		const signer = new ethers.Wallet(privateKey);

		const account = signer.connect(provider);
		const uniswapV2RouterContract = new ethers.Contract(
			uniswapV2RouterAddress,
			uniswapV2RouterAbi,
			account
		);

		console.log(
			'--- args',
			amountIn,
			amountOutMin,
			amountOutMin.toString(),
			path,
			to,
			deadline
		);

		// const token = tokenPair[0];
		// console.log(tokenPair);
		// token.approve(uniswapContractAddress, amountIn);

		const transaction = await uniswapV2RouterContract.swapExactTokensForTokens(
			amountIn,
			amountOutMin.toString(),
			path,
			to,
			deadline,
			{ gasPrice: 0.00000005, gasLimit: 85000 }
		);

		console.log('--- transaction', transaction);

		// https://uniswap.org/docs/v2/smart-contracts/router02/#swapexacttokensfortokens

		return {};
	} catch (error) {
		throw new Error(error);
	}
};

export default swapExactTokensForTokens;
