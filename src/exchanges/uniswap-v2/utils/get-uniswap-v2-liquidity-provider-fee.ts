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
		let liquidityProviderFeeWei;
		const liquidityProviderFee =
			Number(inputTokenQuantity) * Number(uniswapV2LiquidityProviderFee);

		const liquidityProviderFeeEth = liquidityProviderFee.toString();

		try {
			liquidityProviderFeeWei = web3.utils.toWei(
				liquidityProviderFeeEth,
				'ether'
			);
		} catch (e) {
			liquidityProviderFeeWei = '0';
		}

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
