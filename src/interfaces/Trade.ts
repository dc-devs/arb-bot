import Token from './Token';

export interface Number {
	[key: string]: number;
}

export interface String {
	[key: string]: string;
}

export interface Formatted {
	[key: string]: string;
}

export interface ExpectedRatesObj {
	number: Number;
	string: String;
	formatted: Formatted;
}

export interface Trade {
	exchange: string;
	inputToken: Token;
	outputToken: Token;
	gasEstimate: string;
	inputTokenQuantity: string;
	platformFees: string;
	outputTokenQuantity: string;
	expectedRates: ExpectedRatesObj;
}

export default Trade;
