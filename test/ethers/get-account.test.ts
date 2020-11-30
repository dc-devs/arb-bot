import chai from 'chai';
import dotenv from 'dotenv';
import getAccount from '../../src/ethers/get-account';
import chainIds from '../../src/constants/chain-ids';

const { expect } = chai;

before(() => {
	dotenv.config();
});

describe('ethers', () => {
	describe('getAccount', () => {
		it('should return ethers account for given private key', () => {
			const chainId = chainIds.MAINNET;
			const metaMaskAddress = process.env.METAMASK_ADDRESS as string;
			const metaMaskPrivateKey = process.env
				.METAMASK_PRIVATE_KEY as string;
			const account = getAccount(chainId, metaMaskPrivateKey);

			expect(account.address).to.equal(metaMaskAddress);
		});
	});
});
