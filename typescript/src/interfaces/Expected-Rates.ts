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

export interface ExpectedRates {
	sourceToken: Token;
	destinationToken: Token;
	exchange: string;
	raw: Raw;
	rawString: RawString;
	formatted: Formatted;
}

export default ExpectedRates;
