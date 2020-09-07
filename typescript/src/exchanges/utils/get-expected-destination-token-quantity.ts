interface GetExpectedDestinationTokenQuantityArgs {
	expectedRate: string;
	sourceTokenQuantity: string;
}
const getExpectedDestinationTokenQuantity = ({
	expectedRate,
	sourceTokenQuantity,
}: GetExpectedDestinationTokenQuantityArgs) => {
	const quantity = parseFloat(expectedRate) * parseFloat(sourceTokenQuantity);
	return quantity.toString();
};

export default getExpectedDestinationTokenQuantity;
