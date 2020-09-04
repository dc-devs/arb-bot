export interface Raw {
	[key: string]: number;
}

export interface Formatted {
	[key: string]: string;
}

export interface ExpectedRates {
	raw: Raw;
	exchange: string;
	formatted: Formatted;
}

export default ExpectedRates;
