import Web3 from 'web3';
import kyberNetworkProxyAbi from './constants/kyber-network-proxy-abi';
import kyberNetworkProxyAddress from './constants/kyber-network-proxy-address';

const getKyberNetworkProxyContract = (web3: Web3) => {
	return new web3.eth.Contract(
		kyberNetworkProxyAbi,
		kyberNetworkProxyAddress
	);
};

export default getKyberNetworkProxyContract;
