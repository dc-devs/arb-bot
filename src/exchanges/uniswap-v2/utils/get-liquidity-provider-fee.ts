import { web3 } from '../../../providers/web3';

interface GetUniswapV2LiquidityProviderFeeArgs {
	inputTokenQuantity: string;
	uniswapV2LiquidityProviderFee: string;
}
const getUniswapV2LiquidityProviderFee = ({
	inputTokenQuantity,
	uniswapV2LiquidityProviderFee,
}: GetUniswapV2LiquidityProviderFeeArgs) => {
	const liquidityProviderFee =
		Number(inputTokenQuantity) * Number(uniswapV2LiquidityProviderFee);

	const liquidityProviderFeeEth = liquidityProviderFee.toString();
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
};

export default getUniswapV2LiquidityProviderFee;
