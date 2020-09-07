import { web3 } from '../../providers/web3';
import { infura } from '../../providers/infura';
import formatPrice from '../../utils/formatPrice';
import GetExectutionPriceArgs from '../../interfaces/args/get-execution-price-args';
import {
	Route,
	Token,
	Trade,
	ChainId,
	Fetcher,
	TradeType,
	TokenAmount,
} from '@uniswap/sdk';

const getExecutionPrice = async ({
	sourceToken,
	destinationToken,
	sourceQuantity = '1',
}: GetExectutionPriceArgs) => {
	try {
		const srcToken = new Token(
			ChainId.MAINNET,
			sourceToken.address,
			sourceToken.decimals,
			sourceToken.symbol,
			sourceToken.name
		);
		const destToken = new Token(
			ChainId.MAINNET,
			destinationToken.address,
			destinationToken.decimals,
			destinationToken.symbol,
			destinationToken.name
		);

		const tokenPair = await Fetcher.fetchPairData(
			destToken,
			srcToken,
			infura
		);
		const route = new Route([tokenPair], srcToken);

		const trade = new Trade(
			route,
			new TokenAmount(srcToken, web3.utils.toWei(sourceQuantity)),
			TradeType.EXACT_INPUT
		);

		const readableExecutionPrice = parseFloat(
			trade.executionPrice.toSignificant(6)
		);
		const readableNextMidPrice = parseFloat(
			trade.nextMidPrice.toSignificant(6)
		);

		const formattedExpectedRate = formatPrice(readableExecutionPrice);
		const formattedNextMidPrice = formatPrice(readableNextMidPrice);

		return {
			exchange: 'Uniswap v2',
			raw: {
				expectedRate: readableExecutionPrice,
				nextMidPrice: readableNextMidPrice,
			},
			rawString: {
				expectedRate: readableExecutionPrice.toString(),
				nextMidPrice: readableNextMidPrice.toString(),
			},
			formatted: {
				expectedRate: formattedExpectedRate,
				nextMidPrice: formattedNextMidPrice,
			},
		};
	} catch (error) {
		throw new Error(error);
	}
};

export default getExecutionPrice;
