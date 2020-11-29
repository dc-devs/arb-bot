import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';
import getUniswapV2Trade from './utils/get-uniswap-v2-trade';
import getUniswapV2Tokens from './utils/get-uniswap-v2-tokens';
import getUniswapV2TradeArgs from './utils/get-uniswap-v2-trade-args';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import getUniswapV2RouterContract from './utils/get-uniswap-v2-router-contract';

dotenv.config();

const getGasEstimateSwapExactTokensForTokens = async ({
	inputToken,
	outputToken,
	inputTokenQuantity,
	providerOptions,
}: GetTradeDataArgs) => {
	try {
		const amountIn = web3.utils.toWei(inputTokenQuantity);
		const uniswapV2RouterContract = getUniswapV2RouterContract();

		const { uniSourceToken, uniDestinationToken } = getUniswapV2Tokens({
			inputToken,
			outputToken,
		});

		const uniTrade = await getUniswapV2Trade({
			amountIn,
			uniSourceToken,
			uniDestinationToken,
		});

		const { amountOutMin, to, path, deadline } = getUniswapV2TradeArgs({
			uniTrade,
			uniSourceToken,
			uniDestinationToken,
		});

		const estimatedGasUnits = await uniswapV2RouterContract.estimateGas.swapExactTokensForTokens(
			amountIn,
			amountOutMin,
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

export default getGasEstimateSwapExactTokensForTokens;
