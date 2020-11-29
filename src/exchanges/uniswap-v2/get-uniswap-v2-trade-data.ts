import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';
import buildExpectedRates from './utils/build-expected-rates';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import getUniswapV2Trade from '../../exchanges/uniswap-v2/utils/get-uniswap-v2-trade';
import getUniswapV2Tokens from '../../exchanges/uniswap-v2/utils/get-uniswap-v2-tokens';
import uniswapV2LiquidityProviderFee from './constants/uniswap-v2-liquidity-provider-fee';
import getExpectedDestinationTokenQuantity from '../utils/get-expected-destination-token-quantity';
// import getGasEstimateSwapExactTokensForTokens from './get-gas-estimate-swap-tokens-for-exact-tokens';

dotenv.config();

const getUniswapV2TradeData = async ({
	inputToken,
	outputToken,
	inputTokenQuantity = '1',
}: GetTradeDataArgs) => {
	try {
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

		const liquidityProviderFee = (
			Number(inputTokenQuantity) * uniswapV2LiquidityProviderFee
		).toString();

		return {
			exchange: 'Uniswap v2',
			platformFees: liquidityProviderFee,
			inputTokenQuantity,
			inputToken: inputToken,
			outputToken: outputToken,
			outputTokenQuantity,
			expectedRates,
		};
	} catch (error) {
		throw new Error(error);
	}
};

export default getUniswapV2TradeData;
