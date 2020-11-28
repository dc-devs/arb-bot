import dotenv from 'dotenv';
import { Wallet } from 'ethers';
import getErc20TokenContract from './get-erc-20-token-contract';

interface ApproveErc20TokenTransactionArgs {
	amount: string;
	account: Wallet;
	address: string;
	tokenSymbol: string;
	providerOptions?: object;
}

dotenv.config();

const approveErc20TokenTransfer = async ({
	account,
	address,
	tokenSymbol,
	amount,
	providerOptions,
}: ApproveErc20TokenTransactionArgs) => {
	try {
		const tokenContract = getErc20TokenContract(account, tokenSymbol);
		const tokenApprovalTransaction = await tokenContract.approve(
			address,
			amount,
			providerOptions
		);

		return tokenApprovalTransaction;
	} catch (error) {
		throw new Error(error);
	}
};

export default approveErc20TokenTransfer;
