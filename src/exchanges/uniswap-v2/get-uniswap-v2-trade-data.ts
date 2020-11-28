import dotenv from 'dotenv';
import { web3 } from '../../providers/web3';
import tokens from '../../constants/tokens';
import { infura } from '../../providers/infura';
import formatPrice from '../utils/format-price';
import GetTradeDataArgs from '../../interfaces/args/get-trade-data-args';
import getExpectedDestinationTokenQuantity from '../utils/get-expected-destination-token-quantity';
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
