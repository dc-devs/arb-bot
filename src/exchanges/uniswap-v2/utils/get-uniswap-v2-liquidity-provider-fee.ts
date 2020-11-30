interface GetUniswapV2LiquidityProviderFeeArgs {
	inputTokenQuantity: string;
	uniswapV2LiquidityProviderFee: string;
}
const getUniswapV2LiquidityProviderFee = ({
	inputTokenQuantity,
	uniswapV2LiquidityProviderFee,
}: GetUniswapV2LiquidityProviderFeeArgs) => {
	try {
		const liquidityProviderFee =
			Number(inputTokenQuantity) * Number(uniswapV2LiquidityProviderFee);
		const liquidityProviderFeeEth = liquidityProviderFee.toString();

		return {
			eth: liquidityProviderFeeEth,
		};
	} catch (error) {
		throw new Error(`Method::getUniswapV2LiquidityProviderFee: ${error}`);
	}
};

export default getUniswapV2LiquidityProviderFee;
