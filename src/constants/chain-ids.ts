interface ChainIds {
	[key: string]: string | number;
}

const chainIds = {
	'1': 'MAINNET',
	'3': 'ROPSTEN',
	'4': 'RINKEBY',
	'5': 'GÖRLI',
	'42': 'KOVAN',
	MAINNET: 1,
	ROPSTEN: 3,
	RINKEBY: 4,
	GÖRLI: 5,
	KOVAN: 42,
} as ChainIds;

export default chainIds;
