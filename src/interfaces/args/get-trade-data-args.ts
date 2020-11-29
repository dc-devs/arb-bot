import TokenInterface from '../Token';

interface GetTradeDataArgs {
	inputToken: TokenInterface;
	outputToken: TokenInterface;
	inputTokenQuantity: string;
	providerOptions?: object;
}

export default GetTradeDataArgs;
