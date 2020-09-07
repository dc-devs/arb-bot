import TokenInterface from '../Token';

interface GetExpectedRatePriceArgs {
	sourceToken: TokenInterface;
	destinationToken: TokenInterface;
	sourceQuantity?: string;
}

export default GetExpectedRatePriceArgs;
