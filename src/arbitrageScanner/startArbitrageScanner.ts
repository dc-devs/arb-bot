import scan from './scan';

const start = () => {
	if (process.env.RPC_URL) {
		scan(process.env.RPC_URL);
	} else {
		console.log('Please provide your RPC_URL!');
	}
};

export default start;
