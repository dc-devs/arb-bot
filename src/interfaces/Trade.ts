import BN from 'bn.js';
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

export interface NumObj {
	expectedRate: number;
	nextMidPrice?: number;
	worstRate?: number;
}

export interface StringObj {
	expectedRate: string;
	nextMidPrice?: string;
	worstRate?: string;
}

export interface FormattedObj {
	expectedRate: string;
	nextMidPrice?: string;
	worstRate?: string;
}

export interface ExpectedRatesObj {
	number: NumObj;
	string: StringObj;
	formatted: FormattedObj;
}

export interface PlatformFees {
	wei: string;
	eth: string;
	BN: BN;
}

export interface Trade {
	exchange: string;
	inputToken: Token;
	outputToken: Token;
	gasEstimate: string;
	inputTokenQuantity: string;
	platformFees: PlatformFees;
	outputTokenQuantity: string;
	expectedRates: ExpectedRatesObj;
}

export default Trade;
