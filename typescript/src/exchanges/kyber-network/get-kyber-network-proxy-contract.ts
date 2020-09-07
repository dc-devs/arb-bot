import { web3 } from '../../providers/web3';
import kyberNetworkProxyAbi from './constants/kyber-network-proxy-abi';
import kyberNetworkProxyAddress from './constants/kyber-network-proxy-address';

const getKyberNetworkProxyContract = () => {
	return new web3.eth.Contract(
		kyberNetworkProxyAbi,
		kyberNetworkProxyAddress
	);
};

export default getKyberNetworkProxyContract;
