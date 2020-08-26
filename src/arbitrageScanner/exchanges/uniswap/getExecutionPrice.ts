import tokenSymbolAddressMap from './constants/tokenSymbolAddressMap';
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
	const TOKEN = new Token(ChainId.MAINNET, tokenAddress, 18);
	const pair = await Fetcher.fetchPairData(TOKEN, WETH[TOKEN.chainId]);
	const route = new Route([pair], WETH[TOKEN.chainId]);
	const trade = new Trade(
		route,
		new TokenAmount(WETH[TOKEN.chainId], '10000000'),
		TradeType.EXACT_INPUT
	);

	return {
		executionPrice: trade.executionPrice.toSignificant(6),
		nextMidPrice: trade.nextMidPrice.toSignificant(6),
	};
};

export default getExecutionPrice;
