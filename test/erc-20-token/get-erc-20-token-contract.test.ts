import chai from 'chai';
import dotenv from 'dotenv';
import getAccount from '../../src/ethers/get-account';
import getErc20TokenContract from '../../src/erc-20-token/get-erc-20-token-contract';
import infuraNetworks from '../../src/constants/infuraNetworks';
import tokens from '../../src/constants/tokens';
import chainIds from '../../src/constants/chain-ids';

const { expect } = chai;
const { RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('getErc20TokenContract', async () => {
	xit('should return ethers account for given private key', async () => {
		const chainId = chainIds.MAINNET;
		const privateKey = process.env.METAMASK_PRIVATE_KEY as string;
		const account = getAccount(chainId, privateKey);
		const contract = getErc20TokenContract(account, RSR.symbol);
		const { functions, signer, provider } = contract;
		const signerAddress = await signer.getAddress();
		const network = await provider.getNetwork();

		// Expected Connection
		expect(network.name).to.equal(infuraNetworks.MAINNET);
		expect(typeof network.ensAddress).to.equal('string');

		// Expected Signer
		expect(signerAddress).to.equal(process.env.METAMASK_ADDRESS);

		// Expected Functions
		expect(typeof functions['name()']).to.equal('function');
		expect(typeof functions['approve(address,uint256)']).to.equal(
			'function'
		);
		expect(typeof functions['totalSupply()']).to.equal('function');
		expect(
			typeof functions['transferFrom(address,address,uint256)']
		).to.equal('function');
		expect(typeof functions['decimals()']).to.equal('function');
		expect(typeof functions['balanceOf(address)']).to.equal('function');
		expect(typeof functions['symbol()']).to.equal('function');
		expect(typeof functions['transfer(address,uint256)']).to.equal(
			'function'
		);
		expect(typeof functions['allowance(address,address)']).to.equal(
			'function'
		);
	});
});
