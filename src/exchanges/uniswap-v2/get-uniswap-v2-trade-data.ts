import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';
import buildExpectedRates from './utils/build-expected-rates';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import getUniswapV2Trade from '../../exchanges/uniswap-v2/utils/get-uniswap-v2-trade';
import getUniswapV2Tokens from '../../exchanges/uniswap-v2/utils/get-uniswap-v2-tokens';
import uniswapV2LiquidityProviderFee from './constants/uniswap-v2-liquidity-provider-fee';
import getExpectedDestinationTokenQuantity from '../utils/get-expected-destination-token-quantity';

dotenv.config();

const getUniswapV2TradeData = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity = '1',
}: GetTradeDataArgs) => {
	try {
		const amountIn = web3.utils.toWei(sourceTokenQuantity);

		const { uniSourceToken, uniDestinationToken } = getUniswapV2Tokens({
			sourceToken,
			destinationToken,
		});

		const uniTrade = await getUniswapV2Trade({
			amountIn,
			uniSourceToken,
			uniDestinationToken,
		});

		const expectedRates = buildExpectedRates({ uniTrade });

		const expectedDestinationTokenQuantity = getExpectedDestinationTokenQuantity(
			{
				sourceTokenQuantity,
				expectedRate: expectedRates.string.expectedRate,
			}
		);

		const liquidityProviderFee = (
			Number(sourceTokenQuantity) * uniswapV2LiquidityProviderFee
		).toString();

		return {
			exchange: 'Uniswap v2',
			platformFees: liquidityProviderFee,
			sourceTokenQuantity,
			sourceToken: sourceToken,
			destinationToken: destinationToken,
			expectedDestinationTokenQuantity,
			expectedRates,
		};
	} catch (error) {
		throw new Error(error);
	}
};

export default getUniswapV2TradeData;
