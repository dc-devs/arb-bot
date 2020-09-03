import formatPrice from '../../utils/formatPrice';
import tokenSymbolAddressMap from '../../constants/token-symbol-address-map';
import {
	WETH,
	Route,
	Token,
	Trade,
	ChainId,
	Fetcher,
	TradeType,
	TokenAmount,
} from '@uniswap/sdk';

const getExecutionPrice = async (tokenSymbol: string) => {
	const tokenAddress = tokenSymbolAddressMap[tokenSymbol];
	const destToken = new Token(ChainId.MAINNET, tokenAddress, 18);
	const pair = await Fetcher.fetchPairData(
		destToken,
		WETH[destToken.chainId]
	);
	const route = new Route([pair], WETH[destToken.chainId]);
	const trade = new Trade(
		route,
		new TokenAmount(WETH[destToken.chainId], '10000000'),
		TradeType.EXACT_INPUT
	);

	const readableExecutionPrice = trade.executionPrice.toSignificant(6);
	const readableNextMidPrice = trade.nextMidPrice.toSignificant(6);

	const formattedExpectedRate = formatPrice(readableExecutionPrice);
	const formattedWorstRate = formatPrice(readableNextMidPrice);

	return {
		raw: {
			executionPrice: readableExecutionPrice,
			nextMidPrice: readableNextMidPrice,
		},
		formatted: {
			executionPrice: formattedExpectedRate,
			nextMidPrice: formattedWorstRate,
		},
	};
};

export default getExecutionPrice;
