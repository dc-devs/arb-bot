import { web3 } from '../../providers/web3';
import TradeData from '../../interfaces/trade-data';

interface GetExpectedTradGainArgs {
	incomingTradeData: TradeData;
	outgoingTradeData: TradeData;
}

const getExpectedTradGain = ({
	incomingTradeData,
	outgoingTradeData,
}: GetExpectedTradGainArgs) => {
	// Outgoing Fees
	const outgoingTotalFeesBN = outgoingTradeData.transactionFees.BN.add(
		outgoingTradeData.platformFees.BN
	);
	const outgoingTotalFeesWei = outgoingTotalFeesBN.toString();
	const outgoingTotalFeesEth = web3.utils.fromWei(
		outgoingTotalFeesWei,
		'ether'
	);

	// Incoming Fees
	const incomingTotalFeesBN = incomingTradeData.transactionFees.BN.add(
		incomingTradeData.platformFees.BN
	);
	const incomingTotalFeesWei = incomingTotalFeesBN.toString();
	const incomingTotalFeesEth = web3.utils.fromWei(
		incomingTotalFeesWei,
		'ether'
	);

	// TotalFees
	const totalFeesBN = outgoingTotalFeesBN.add(incomingTotalFeesBN);
	const totalFeesWei = totalFeesBN.toString();
	const totalFeesEth = web3.utils.fromWei(totalFeesWei, 'ether');

	// Expected Gain
	const tokenTradeGain =
		Number(incomingTradeData.outputTokenQuantity) -
		Number(outgoingTradeData.inputTokenQuantity);

	const totalTradeGain = Number(tokenTradeGain) - Number(totalFeesEth);

	return {
		fees: {
			outgoingTrade: {
				exchange: outgoingTradeData.exchange,
				transactionFees: outgoingTradeData.transactionFees,
				platformFees: outgoingTradeData.platformFees,
				totalFees: {
					wei: outgoingTotalFeesWei,
					eth: outgoingTotalFeesEth,
					BN: outgoingTotalFeesBN,
				},
			},
			incomingTrade: {
				exchange: incomingTradeData.exchange,
				transactionFees: incomingTradeData.transactionFees,
				platformFees: incomingTradeData.platformFees,
				totalFees: {
					wei: incomingTotalFeesWei,
					eth: incomingTotalFeesEth,
					BN: incomingTotalFeesBN,
				},
			},
		},
		tokenTradeGain,
		totalFees: {
			wei: totalFeesWei,
			eth: totalFeesEth,
			BN: totalFeesBN,
		},
		totalTradeGain,
	};
};

export default getExpectedTradGain;
