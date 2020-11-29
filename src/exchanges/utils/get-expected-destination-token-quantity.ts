interface GetExpectedDestinationTokenQuantityArgs {
	expectedRate: string;
	inputTokenQuantity: string;
}
const getExpectedDestinationTokenQuantity = ({
	expectedRate,
	inputTokenQuantity,
}: GetExpectedDestinationTokenQuantityArgs) => {
	const quantity = Number(expectedRate) * Number(inputTokenQuantity);
	return quantity.toString();
};

export default getExpectedDestinationTokenQuantity;
