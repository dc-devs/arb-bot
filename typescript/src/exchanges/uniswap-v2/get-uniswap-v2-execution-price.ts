import { web3 } from '../../providers/web3';
import tokens from '../../constants/tokens';
import { infura } from '../../providers/infura';
import formatPrice from '../../utils/formatPrice';
import GetExpectedRatePriceArgs from '../../interfaces/args/get-expected-price-args';
import {
	Route,
	Token,
	Trade,
	ChainId,
	Fetcher,
	TradeType,
	TokenAmount,
} from '@uniswap/sdk';

const { WETH, ETH } = tokens;

const getUniswapV2ExecutionPrice = async ({
	sourceToken,
	destinationToken,
	sourceTokenQuantity = '1',
}: GetExpectedRatePriceArgs) => {
	try {
		const setSourceToken =
			sourceToken.symbol === ETH.symbol ? WETH : sourceToken;
		const setDestinationToken =
			destinationToken.symbol === ETH.symbol ? WETH : destinationToken;

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

		const tokenPair = await Fetcher.fetchPairData(
			destToken,
			srcToken,
			infura
		);
		const route = new Route([tokenPair], srcToken);

		const trade = new Trade(
			route,
			new TokenAmount(srcToken, web3.utils.toWei(sourceTokenQuantity)),
			TradeType.EXACT_INPUT
		);

		const readableExecutionPrice = parseFloat(
			trade.executionPrice.toSignificant(6)
		);
		const readableNextMidPrice = parseFloat(
			trade.nextMidPrice.toSignificant(6)
		);

		const formattedExpectedRate = formatPrice(readableExecutionPrice);
		const formattedNextMidPrice = formatPrice(readableNextMidPrice);

		return {
			exchange: 'Uniswap v2',
			sourceTokenQuantity,
			sourceToken: setSourceToken,
			destinationToken: setDestinationToken,
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
		};
	} catch (error) {
		throw new Error(error);
	}
};

export default getUniswapV2ExecutionPrice;
