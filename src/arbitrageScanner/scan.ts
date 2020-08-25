import Web3 from 'web3';
import moment from 'moment-timezone';
import kyberConstants from '../exchanges/kyber/constants';
import uniswapConstants from '../exchanges/uniswap/constants';

const {
	uniswapfactoryAbi,
	uniswapExchangeAbi,
	uniswapFactoryAddress,
} = uniswapConstants;

const { kyberExpectedRateAbi, kyberExpectedRateAddress } = kyberConstants;

const scan = (rpcUrl: string) => {
	const web3 = new Web3(rpcUrl) as Web3;

	// Uniswap Factory Contract: https://etherscan.io/address/0xc0a47dfe034b400b47bdad5fecda2621de6c4d95#code
	const uniswapFactoryContract = new web3.eth.Contract(
		uniswapfactoryAbi,
		uniswapFactoryAddress
	);

	// Kyber mainnet "Expected Rate": https://etherscan.io/address/0x96b610046d63638d970e6243151311d8827d69a5#readContract
	const kyberRateContract = new web3.eth.Contract(
		kyberExpectedRateAbi,
		kyberExpectedRateAddress
	);

	interface checkPairArgs {
		inputTokenSymbol: string;
		inputTokenAddress: string;
		outputTokenSymbol: string;
		outputTokenAddress: string;
		inputAmount: string;
	}

	const checkPair = async ({
		inputTokenSymbol,
		inputTokenAddress,
		outputTokenSymbol,
		outputTokenAddress,
		inputAmount,
	}: checkPairArgs) => {
		// Uniswap Exchange Template: https://etherscan.io/address/0x09cabec1ead1c0ba254b09efb3ee13841712be14#code
		const exchangeAddress = await uniswapFactoryContract.methods
			.getExchange(outputTokenAddress)
			.call();

		const exchangeContract = new web3.eth.Contract(
			uniswapExchangeAbi,
			exchangeAddress
		);

		const uniswapResult = await exchangeContract.methods
			.getEthToTokenInputPrice(inputAmount)
			.call();

		let kyberResult = await kyberRateContract.methods
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
					kyberResult.expectedRate,
					'ether'
				),
				'Kyber Min Return': web3.utils.fromWei(
					kyberResult.slippageRate,
					'ether'
				),
				Timestamp: moment()
					.tz('America/Chicago')
					.format(),
			},
		]);
	};

	let priceMonitor: NodeJS.Timeout;
	let monitoringPrice = false;

	const monitorPrice = async () => {
		if (monitoringPrice) {
			return;
		}

		console.log('Checking prices...');
		monitoringPrice = true;

		try {
			// ADD YOUR CUSTOM TOKEN PAIRS HERE!!!

			const amountInWei = web3.utils.toWei('1', 'ether');

			await checkPair({
				inputTokenSymbol: 'ETH',
				inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
				outputTokenSymbol: 'MKR',
				outputTokenAddress:
					'0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
				inputAmount: amountInWei,
			});

			await checkPair({
				inputTokenSymbol: 'ETH',
				inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
				outputTokenSymbol: 'DAI',
				outputTokenAddress:
					'0x6b175474e89094c44da98b954eedeac495271d0f',
				inputAmount: amountInWei,
			});

			await checkPair({
				inputTokenSymbol: 'ETH',
				inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
				outputTokenSymbol: 'KNC',
				outputTokenAddress:
					'0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
				inputAmount: amountInWei,
			});

			await checkPair({
				inputTokenSymbol: 'ETH',
				inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
				outputTokenSymbol: 'LINK',
				outputTokenAddress:
					'0x514910771af9ca656af840dff83e8264ecf986ca',
				inputAmount: amountInWei,
			});
		} catch (error) {
			console.error(error);
			monitoringPrice = false;
			clearInterval(priceMonitor);
			return;
		}

		monitoringPrice = false;
	};

	// Check markets every n seconds
	const POLLING_INTERVAL =
		parseInt(process.env.POLLING_INTERVAL as string, 10) || 3000; // 3 Seconds
	priceMonitor = setInterval(async () => {
		await monitorPrice();
	}, POLLING_INTERVAL);
};

export default scan;
