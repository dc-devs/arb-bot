import BN from 'bn.js';

export interface PlatformFees {
	eth: string;
	wei: string;
	BN: BN;
}

export interface TransactionFees {
	eth: string;
	wei: string;
	usd: string;
	BN: BN;
}

export interface StringObj {
	expectedRate: string;
	nextMidPrice?: string;
	worstRate?: string;
}

interface TradeData {
	exchange: string;
	gasPrice: string;
	gasLimit: string;
	gasEstimate: string;
	transactionFees: TransactionFees;
	platformFees: PlatformFees;
	expectedRate: StringObj;
	inputToken: string;
	inputTokenQuantity: string;
	outputToken: string;
	outputTokenQuantity: string;
}

export default TradeData;
