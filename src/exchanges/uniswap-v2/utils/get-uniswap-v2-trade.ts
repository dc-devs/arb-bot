import dotenv from 'dotenv';
import { infura } from '../../../providers/infura';
import {
	Token,
	Route,
	Trade,
	Fetcher,
	TradeType,
	TokenAmount,
} from '@uniswap/sdk';

dotenv.config();

interface GetUniswapV2TradeArgs {
	amountIn: string;
	uniSourceToken: Token;
	uniDestinationToken: Token;
}

const getUniswapV2Trade = async ({
	amountIn,
	uniSourceToken,
	uniDestinationToken,
}: GetUniswapV2TradeArgs) => {
	const tokenPair = await Fetcher.fetchPairData(
		uniDestinationToken,
		uniSourceToken,
		infura
	);

	const route = new Route([tokenPair], uniSourceToken);
	const tokenAmount = new TokenAmount(uniSourceToken, amountIn);

	const uniTrade = new Trade(route, tokenAmount, TradeType.EXACT_INPUT);

	return uniTrade;
};

export default getUniswapV2Trade;
