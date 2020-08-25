import Web3 from 'web3';
import moment from 'moment-timezone';
import kyberConstants from './exchanges/kyber/constants';
import uniswapConstants from './exchanges/uniswap/constants';

const {
	uniswapfactoryAbi,
	uniswapExchangeAbi,
	uniswapFactoryAddress,
} = uniswapConstants;

const { kyberExpectedRateAbi, kyberExpectedRateAddress } = kyberConstants;

interface checkPairArgs {
	web3: Web3;
	inputTokenSymbol: string;
	inputTokenAddress: string;
	outputTokenSymbol: string;
	outputTokenAddress: string;
	inputAmount: string;
}

const checkPair = async ({
	web3,
	inputTokenSymbol,
	inputTokenAddress,
	outputTokenSymbol,
	outputTokenAddress,
	inputAmount,
}: checkPairArgs) => {
	// Uniswap Factory Contract: https://etherscan.io/address/0xc0a47dfe034b400b47bdad5fecda2621de6c4d95#code
	const uniswapFactoryContract = new web3.eth.Contract(
		uniswapfactoryAbi,
		uniswapFactoryAddress
	);

	// Kyber mainnet "Expected Rate": https://etherscan.io/address/0x96b610046d63638d970e6243151311d8827d69a5#readContract
	const kyberExpectedRateContract = new web3.eth.Contract(
		kyberExpectedRateAbi,
		kyberExpectedRateAddress
	);

	// Uniswap Exchange Template: https://etherscan.io/address/0x09cabec1ead1c0ba254b09efb3ee13841712be14#code
	const uniswapExchangeAddress = await uniswapFactoryContract.methods
		.getExchange(outputTokenAddress)
		.call();

	const uniswapExchangeContract = new web3.eth.Contract(
		uniswapExchangeAbi,
		uniswapExchangeAddress
	);

	const uniswapResult = await uniswapExchangeContract.methods
		.getEthToTokenInputPrice(inputAmount)
		.call();

	const kyberExpectedRateResult = await kyberExpectedRateContract.methods
		.getExpectedRate(
			inputTokenAddress,
			outputTokenAddress,
			inputAmount,
			true
		)
		.call();

	console.table([
		{
			'Input Token': inputTokenSymbol,
			'Output Token': outputTokenSymbol,
			'Input Amount': web3.utils.fromWei(inputAmount, 'ether'),
			'Uniswap Return': web3.utils.fromWei(uniswapResult, 'ether'),
			'Kyber Expected Rate': web3.utils.fromWei(
				kyberExpectedRateResult.expectedRate,
				'ether'
			),
			'Kyber Min Return': web3.utils.fromWei(
				kyberExpectedRateResult.slippageRate,
				'ether'
			),
			Timestamp: moment()
				.tz('America/Chicago')
				.format(),
		},
	]);
};

export default checkPair;
