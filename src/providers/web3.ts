import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

const rpcUrl = process.env.RPC_URL as string;

export let web3 = new Web3(rpcUrl);
