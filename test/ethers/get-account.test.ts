import chai from 'chai';
import dotenv from 'dotenv';
import getAccount from '../../src/ethers/get-account';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('getAccount', async () => {
	it('should return ethers account for given private key', async () => {
		const metaMaskAddress = process.env.METAMASK_ADDRESS as string;
		const metaMaskPrivateKey = process.env.METAMASK_PRIVATE_KEY as string;
		const account = getAccount('MAINNET', metaMaskPrivateKey);

		expect(account.address).to.equal(metaMaskAddress);
	});
});
