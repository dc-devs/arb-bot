import { web3 } from '../../../providers/web3';

interface GetUniswapV2LiquidityProviderFeeArgs {
	inputTokenQuantity: string;
	uniswapV2LiquidityProviderFee: string;
}
const getUniswapV2LiquidityProviderFee = ({
	inputTokenQuantity,
	uniswapV2LiquidityProviderFee,
}: GetUniswapV2LiquidityProviderFeeArgs) => {
	try {
		const safeInputTokenQuantity = Number(inputTokenQuantity).toFixed(18);
		const liquidityProviderFee =
			Number(safeInputTokenQuantity) *
			Number(uniswapV2LiquidityProviderFee);

		const liquidityProviderFeeEth = liquidityProviderFee.toFixed(18);

		const liquidityProviderFeeWei = web3.utils.toWei(
			liquidityProviderFeeEth,
			'ether'
		);

		const liquidityProviderFeeBN = web3.utils.toBN(liquidityProviderFeeWei);

		return {
			wei: liquidityProviderFeeWei,
			eth: liquidityProviderFeeEth,
			BN: liquidityProviderFeeBN,
		};
	} catch (error) {
		throw new Error(`Method::getUniswapV2LiquidityProviderFee: ${error}`);
	}
};

export default getUniswapV2LiquidityProviderFee;
