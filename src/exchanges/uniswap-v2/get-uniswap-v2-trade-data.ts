import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';
import tokens from '../../constants/tokens';
import { infura } from '../../providers/infura';
import formatPrice from '../utils/format-price';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
// import getUniswapV2RouterContract from './get-uniswap-v2-router-contract';
import getExpectedDestinationTokenQuantity from '../utils/get-expected-destination-token-quantity';
import {
	Route,
	Token,
	Trade,
	ChainId,
	// Percent,
	Fetcher,
	TradeType,
	TokenAmount,
} from '@uniswap/sdk';

dotenv.config();

const { WETH, ETH } = tokens;

const getUniswapV2TradeData = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity = '1',
}: GetTradeDataArgs) => {
	try {
		const uniLiquidityProviderFee = 0.003;
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
		// const slippageTolerance = new Percent('50', '10000'); // 50 bips, or 0.50%
		// const amountOutMinRaw = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
		// const amountOutMin = amountOutMinRaw.toString();
		// const path = [srcToken.address, destToken.address];
		// const to = process.env.METAMASK_ADDRESS; // should be a checksummed recipient address
		// const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
		// // const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex
		// const uniswapV2RouterContract = getUniswapV2RouterContract();
		// console.log(amountIn);
		// console.log(amountOutMin);

		// const gas = await uniswapV2RouterContract.methods
		// 	.swapExactTokensForTokens(
		// 		amountIn,
		// 		amountOutMin,
		// 		path,
		// 		to,
		// 		deadline
		// 	)
		// 	.estimateGas({
		// 		send: amountIn,
		// 		from: process.env.METAMASK_ADDRESS,
		// 		gas: 50000000,
		// 	});

		// console.log('--- Contract GAS', gas);

		// swapExactTokensForTokens;

		// getFormattedOutput
		// --------------------
		const readableExecutionPrice = parseFloat(
			trade.executionPrice.toSignificant(6)
		);
		const readableNextMidPrice = parseFloat(
			trade.nextMidPrice.toSignificant(6)
		);

		const liquidityProviderFee = (
			Number(sourceTokenQuantity) * uniLiquidityProviderFee
		).toString();
		const formattedExpectedRate = formatPrice(readableExecutionPrice);
		const formattedNextMidPrice = formatPrice(readableNextMidPrice);
		const expectedDestinationTokenQuantity = getExpectedDestinationTokenQuantity(
			{
				sourceTokenQuantity,
				expectedRate: readableExecutionPrice.toString(),
			}
		);

		// https://uniswap.org/docs/v2/smart-contracts/router02/#swapexacttokensfortokens

		return {
			exchange: 'Uniswap v2',
			platformFees: liquidityProviderFee,
			sourceTokenQuantity,
			sourceToken: setSourceToken,
			destinationToken: setDestinationToken,
			expectedDestinationTokenQuantity,
			expectedRates: {
				raw: {
					expectedRate: readableExecutionPrice,
					nextMidPrice: readableNextMidPrice,
				},
				rawString: {
					expectedRate: readableExecutionPrice.toString(),
					nextMidPrice: readableNextMidPrice.toString(),
				},
				formatted: {
					expectedRate: formattedExpectedRate,
					nextMidPrice: formattedNextMidPrice,
				},
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};

export default getUniswapV2TradeData;
