import to from 'await-to-js';
import { web3 } from '../../providers/web3';
import aggregatorV3InterfaceABI from './contsants/aggregator-v3-interface-abi';

interface RoundData {
	roundId: string;
	answer: string;
	startedAt: string;
	updatedAt: string;
	answeredInRound: string;
}

const getChainlinkTokenPrice = async () => {
	// Price Feed Address
	const ethUsdContractAddress = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';

	// Set up contract instance
	const priceFeed = new web3.eth.Contract(
		aggregatorV3InterfaceABI,
		ethUsdContractAddress
	);

	// Make call to latestRoundData()
	const [priceFeedDataError, roundData] = await to(
		priceFeed.methods.latestRoundData().call()
	);

	if (priceFeedDataError) {
		throw priceFeedDataError;
	}

	const { answer } = roundData as RoundData;

	const formattedAnswer = Number(answer) / 100000000;

	return formattedAnswer;
};

export default getChainlinkTokenPrice;
