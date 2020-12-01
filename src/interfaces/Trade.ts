import Token from './Token';
import BN from 'bn.js';

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

export interface ExpectedRates {
	number: NumObj;
	string: StringObj;
	formatted: FormattedObj;
}

export interface PlatformFees {
	eth: string;
	wei: string;
	BN: BN;
}

export interface GasFees {
	eth: string;
	usd: string;
}

export interface Trade {
	exchange: string;
	inputToken: Token;
	outputToken: Token;
	gasEstimate: string;
	inputTokenQuantity: string;
	platformFees: PlatformFees;
	outputTokenQuantity: string;
	expectedRates: ExpectedRates;
	transactionFees: GasFees;
	gasLimit: string;
	gasPrice: string;
}

export default Trade;
