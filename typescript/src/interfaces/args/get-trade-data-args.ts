import TokenInterface from '../Token';

interface GetTradeDataArgs {
	sourceToken: TokenInterface;
	destinationToken: TokenInterface;
	sourceTokenQuantity?: string;
}

export default GetTradeDataArgs;
