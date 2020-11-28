import { Percent, Token, Trade } from '@uniswap/sdk';

interface GetUniswapV2TradeArgsArgs {
	uniTrade: Trade;
	uniSourceToken: Token;
	uniDestinationToken: Token;
}

const getUniswapV2TradeArgs = ({
	uniTrade,
	uniSourceToken,
	uniDestinationToken,
}: GetUniswapV2TradeArgsArgs) => {
	const slippageTolerance = new Percent('50', '10000'); // 50 bips, or 0.50%
	const amountOutMin = uniTrade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
	const path = [uniSourceToken.address, uniDestinationToken.address];
	const to = process.env.METAMASK_ADDRESS; // should be a checksummed recipient address
	const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
	// ETHER TO SEND?
	// const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex
	return {
		amountOutMin,
		path,
		to,
		deadline,
	};
};

// https://uniswap.org/docs/v2/smart-contracts/router02/#swapexacttokensfortokens

export default getUniswapV2TradeArgs;
