import { Token, ChainId } from '@uniswap/sdk';
import { Token as NativeToken } from '../../../interfaces/Token';

interface GetUniswapTokensArgs {
	sourceToken: NativeToken;
	destinationToken: NativeToken;
}

const getUniswapTokens = ({
	sourceToken,
	destinationToken,
}: GetUniswapTokensArgs) => {
	const uniSourceToken = new Token(
		ChainId.MAINNET,
		sourceToken.address,
		sourceToken.decimals,
		sourceToken.symbol,
		sourceToken.name
	);

	const uniDestinationToken = new Token(
		ChainId.MAINNET,
		destinationToken.address,
		destinationToken.decimals,
		destinationToken.symbol,
		destinationToken.name
	);

	return { uniSourceToken, uniDestinationToken };
};

export default getUniswapTokens;
