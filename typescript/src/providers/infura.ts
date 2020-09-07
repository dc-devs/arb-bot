import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const rpcUrl = process.env.RPC_URL as string;

export let infura = new ethers.providers.JsonRpcProvider(rpcUrl);
