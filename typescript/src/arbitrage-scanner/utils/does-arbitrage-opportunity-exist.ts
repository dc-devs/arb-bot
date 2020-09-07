interface DoesArbitrageOpportunityExistArgs {
	bestOutgoingExpectedRate: number;
	bestIncomingExpectedRate: number;
}

const doesArbitrageOpportunityExist = ({
	bestOutgoingExpectedRate,
	bestIncomingExpectedRate,
}: DoesArbitrageOpportunityExistArgs) => {
	return bestOutgoingExpectedRate * bestIncomingExpectedRate > 1;
};

export default doesArbitrageOpportunityExist;
