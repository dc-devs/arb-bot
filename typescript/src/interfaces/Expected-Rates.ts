import Token from '../interfaces/Token';

export interface Raw {
	[key: string]: number;
}

export interface RawString {
	[key: string]: string;
}

export interface Formatted {
	[key: string]: string;
}

export interface ExpectedRatesObj {
	raw: Raw;
	rawString: RawString;
	formatted: Formatted;
}

export interface ExpectedRates {
	exchange: string;
	sourceToken: Token;
	destinationToken: Token;
	sourceTokenQuantity: string;
	expectedDestinationTokenQuantity: string;
	expectedRates: ExpectedRatesObj;
}

export default ExpectedRates;
