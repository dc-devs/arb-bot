interface GetExpectedDestinationTokenQuantityArgs {
	expectedRate: string;
	sourceTokenQuantity: string;
}
const getExpectedDestinationTokenQuantity = ({
	expectedRate,
	sourceTokenQuantity,
}: GetExpectedDestinationTokenQuantityArgs) => {
	const quantity = Number(expectedRate) * Number(sourceTokenQuantity);
	return quantity.toString();
};

export default getExpectedDestinationTokenQuantity;
