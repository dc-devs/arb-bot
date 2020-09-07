import TokenInterface from '../Token';

interface GetExpectedRatePriceArgs {
	sourceToken: TokenInterface;
	destinationToken: TokenInterface;
	sourceTokenQuantity?: string;
}

export default GetExpectedRatePriceArgs;
