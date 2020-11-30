import { web3 } from '../../providers/web3';
import getFormattedPrice from './utils/get-formatted-price';
import aggregatorV3InterfaceABI from './contsants/aggregator-v3-interface-abi';
import chainLinkPriceFeedContractsTokenUsd from './contsants/chain-link-price-feed-contracts-token-usd';

interface RoundData {
	roundId: string;
	answer: string;
	startedAt: string;
	updatedAt: string;
	answeredInRound: string;
}

const getChainlinkPriceForToken = async (tokenSymbol: string) => {
	try {
		const chainLinkPriceFeedContract =
			chainLinkPriceFeedContractsTokenUsd[tokenSymbol];

		if (!chainLinkPriceFeedContract) {
			throw new Error(
				`Method::getChainlinkPriceForToken: Token ${tokenSymbol} not currently supported`
			);
		}

		const priceFeed = new web3.eth.Contract(
			aggregatorV3InterfaceABI,
			chainLinkPriceFeedContract
		);

		const roundData = await priceFeed.methods.latestRoundData().call();
		const decimals = await priceFeed.methods.decimals().call();
		const { answer: price } = roundData as RoundData;
		const formattedPrice = getFormattedPrice(price, decimals);

		return formattedPrice;
	} catch (error) {
		throw new Error(`Method::getChainlinkPriceForToken: ${error}`);
	}
};
// https://docs.chain.link/docs/get-the-latest-price

export default getChainlinkPriceForToken;
