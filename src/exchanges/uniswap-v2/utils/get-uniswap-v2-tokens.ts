import { Token, ChainId } from '@uniswap/sdk';
import { Token as NativeToken } from '../../../interfaces/Token';

interface GetUnioutputTokensArgs {
	inputToken: NativeToken;
	outputToken: NativeToken;
}

const getUnioutputTokens = ({
	inputToken,
	outputToken,
}: GetUnioutputTokensArgs) => {
	const uniSourceToken = new Token(
		ChainId.MAINNET,
		inputToken.address,
		inputToken.decimals,
		inputToken.symbol,
		inputToken.name
	);

	const uniDestinationToken = new Token(
		ChainId.MAINNET,
		outputToken.address,
		outputToken.decimals,
		outputToken.symbol,
		outputToken.name
	);

	return { uniSourceToken, uniDestinationToken };
};

export default getUnioutputTokens;
