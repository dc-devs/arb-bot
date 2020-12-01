import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';
import getUniswapV2Trade from './utils/get-uniswap-v2-trade';
import buildExpectedRates from './utils/build-uniswap-v2-expected-rates';
import getUniswapV2Tokens from './utils/get-uniswap-v2-tokens';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import getLiquidityProviderFee from './utils/get-uniswap-v2-liquidity-provider-fee';
import uniswapV2LiquidityProviderFee from './constants/uniswap-v2-liquidity-provider-fee';
import getExpectedDestinationTokenQuantity from '../utils/get-expected-destination-token-quantity';
import getGasEstimateSwapExactTokensForTokens from './get-gas-estimate-swap-tokens-for-exact-tokens';

dotenv.config();

const getUniswapV2TradeData = async ({
	inputToken,
	outputToken,
	inputTokenQuantity,
}: GetTradeDataArgs) => {
	try {
		// Higher Gass Limit allows miners to take more for creating a block, hence why this number goes up on meta mask when updating
		// Block Gas Limit => https://upvest.co/blog/transaction-fee-estimations-how-to-save-on-gas
		const gasLimit = '10000000';
		const gasPrice = web3.utils.toWei('30', 'gwei');
		const amountIn = web3.utils.toWei(inputTokenQuantity);

		const { uniSourceToken, uniDestinationToken } = getUniswapV2Tokens({
			inputToken,
			outputToken,
		});

		const uniTrade = await getUniswapV2Trade({
			amountIn,
			uniSourceToken,
			uniDestinationToken,
		});

		const expectedRates = buildExpectedRates({ uniTrade });

		const outputTokenQuantity = getExpectedDestinationTokenQuantity({
			inputTokenQuantity,
			expectedRate: expectedRates.string.expectedRate,
		});

		const liquidityProviderFee = getLiquidityProviderFee({
			inputTokenQuantity,
			uniswapV2LiquidityProviderFee,
		});

		const gasEstimate = await getGasEstimateSwapExactTokensForTokens({
			inputTokenQuantity,
			inputToken,
			outputToken,
			providerOptions: { gasPrice, gasLimit },
		});

		return {
			exchange: 'Uniswap v2',
			gasEstimate,
			gasLimit,
			platformFees: {
				eth: liquidityProviderFee.eth,
			},
			inputTokenQuantity,
			inputToken: inputToken,
			outputToken: outputToken,
			outputTokenQuantity,
			expectedRates,
			gasPrice: '',
			gasFees: {
				usd: '',
				eth: '',
			},
		};
	} catch (error) {
		throw new Error(`Method::getUniswapV2TradeData: ${error}`);
	}
};

export default getUniswapV2TradeData;
