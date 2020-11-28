import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';
import { infura } from '../../providers/infura';
import getUniswapV2TradeArgs from './utils/get-uniswap-v2-trade-args';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import getUniswapV2RouterContract from './utils/get-uniswap-v2-router-contract';
import {
	Route,
	Token,
	Trade,
	ChainId,
	Fetcher,
	TradeType,
	TokenAmount,
} from '@uniswap/sdk';

dotenv.config();

const swapExactTokensForTokens = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity = '1',
	providerOptions,
}: GetTradeDataArgs) => {
	try {
		// getUniswapTokens
		// -------------------
		const uniSourceToken = new Token(
			ChainId.MAINNET,
			sourceToken.address,
			sourceToken.decimals,
			sourceToken.symbol,
			sourceToken.name
		);

		const uniDestinationToken = new Token(
			ChainId.MAINNET,
			destinationToken.address,
			destinationToken.decimals,
			destinationToken.symbol,
			destinationToken.name
		);

		// getUniswapTrade
		// ----------------
		const tokenPair = await Fetcher.fetchPairData(
			uniDestinationToken,
			uniSourceToken,
			infura
		);

		const route = new Route([tokenPair], uniSourceToken);
		const amountIn = web3.utils.toWei(sourceTokenQuantity);

		const uniTrade = new Trade(
			route,
			new TokenAmount(uniSourceToken, amountIn),
			TradeType.EXACT_INPUT
		);

		// getUniswapTradeArgs
		// -----------------------
		const { amountOutMin, to, path, deadline } = getUniswapV2TradeArgs({
			uniTrade,
			uniSourceToken,
			uniDestinationToken,
		});
		const uniswapV2RouterContract = getUniswapV2RouterContract();

		const estimatedGasUnits = await uniswapV2RouterContract.estimateGas.swapExactTokensForTokens(
			amountIn,
			amountOutMin.toString(),
			path,
			to,
			deadline,
			providerOptions
		);

		return estimatedGasUnits;
	} catch (error) {
		throw new Error(error);
	}
};

export default swapExactTokensForTokens;
