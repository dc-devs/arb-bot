import TokenInterface from '../Token';

interface GetTradeDataArgs {
	sourceToken: TokenInterface;
	destinationToken: TokenInterface;
	sourceTokenQuantity: string;
	providerOptions?: object;
}

export default GetTradeDataArgs;
