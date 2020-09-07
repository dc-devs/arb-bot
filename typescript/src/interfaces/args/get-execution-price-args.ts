import TokenInterface from '../Token';

interface GetExectutionPriceArgs {
	sourceToken: TokenInterface;
	destinationToken: TokenInterface;
	sourceQuantity?: string;
}

export default GetExectutionPriceArgs;
