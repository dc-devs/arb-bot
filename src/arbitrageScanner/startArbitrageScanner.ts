import scan from './scan';

const rpcUrl = process.env.RPC_URL;

const start = () => {
	if (rpcUrl) {
		scan(rpcUrl);
	} else {
		console.log('Please provide your RPC_URL!');
	}
};

export default start;
