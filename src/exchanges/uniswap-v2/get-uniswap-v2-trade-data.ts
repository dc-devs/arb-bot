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
		const gasLimit = 1000000;
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
			platformFees: {
				wei: liquidityProviderFee.wei,
				eth: liquidityProviderFee.eth,
				BN: liquidityProviderFee.BN,
			},
			inputTokenQuantity,
			inputToken: inputToken,
			outputToken: outputToken,
			outputTokenQuantity,
			expectedRates,
		};
	} catch (error) {
		throw new Error(`Method::getUniswapV2TradeData: ${error}`);
	}
};

export default getUniswapV2TradeData;
