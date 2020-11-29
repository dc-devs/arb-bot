const kyberNetworkProxyAbi = [
	{
		inputs: [{ internalType: 'address', name: '_admin', type: 'address' }],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'newAdmin',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'previousAdmin',
				type: 'address',
			},
		],
		name: 'AdminClaimed',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'newAlerter',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'isAdd',
				type: 'bool',
			},
		],
		name: 'AlerterAdded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'sendTo',
				type: 'address',
			},
		],
		name: 'EtherWithdraw',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'trader',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'contract IERC20',
				name: 'src',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'contract IERC20',
				name: 'dest',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'destAddress',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'actualSrcAmount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'actualDestAmount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'platformWallet',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'platformFeeBps',
				type: 'uint256',
			},
		],
		name: 'ExecuteTrade',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'contract IKyberHint',
				name: 'kyberHintHandler',
				type: 'address',
			},
		],
		name: 'KyberHintHandlerSet',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'contract IKyberNetwork',
				name: 'newKyberNetwork',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'contract IKyberNetwork',
				name: 'previousKyberNetwork',
				type: 'address',
			},
		],
		name: 'KyberNetworkSet',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'newOperator',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'bool',
				name: 'isAdd',
				type: 'bool',
			},
		],
		name: 'OperatorAdded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'contract IERC20',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'sendTo',
				type: 'address',
			},
		],
		name: 'TokenWithdraw',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'pendingAdmin',
				type: 'address',
			},
		],
		name: 'TransferAdminPending',
		type: 'event',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'newAlerter', type: 'address' },
		],
		name: 'addAlerter',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'newOperator', type: 'address' },
		],
		name: 'addOperator',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'admin',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'claimAdmin',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'enabled',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getAlerters',
		outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract ERC20', name: 'src', type: 'address' },
			{ internalType: 'contract ERC20', name: 'dest', type: 'address' },
			{ internalType: 'uint256', name: 'srcQty', type: 'uint256' },
		],
		name: 'getExpectedRate',
		outputs: [
			{ internalType: 'uint256', name: 'expectedRate', type: 'uint256' },
			{ internalType: 'uint256', name: 'worstRate', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: 'src', type: 'address' },
			{ internalType: 'contract IERC20', name: 'dest', type: 'address' },
			{ internalType: 'uint256', name: 'srcQty', type: 'uint256' },
			{
				internalType: 'uint256',
				name: 'platformFeeBps',
				type: 'uint256',
			},
			{ internalType: 'bytes', name: 'hint', type: 'bytes' },
		],
		name: 'getExpectedRateAfterFee',
		outputs: [
			{ internalType: 'uint256', name: 'expectedRate', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getOperators',
		outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'kyberHintHandler',
		outputs: [
			{ internalType: 'contract IKyberHint', name: '', type: 'address' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'kyberNetwork',
		outputs: [
			{
				internalType: 'contract IKyberNetwork',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'maxGasPrice',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'pendingAdmin',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'alerter', type: 'address' }],
		name: 'removeAlerter',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'operator', type: 'address' },
		],
		name: 'removeOperator',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IKyberHint',
				name: '_kyberHintHandler',
				type: 'address',
			},
		],
		name: 'setHintHandler',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'contract IKyberNetwork',
				name: '_kyberNetwork',
				type: 'address',
			},
		],
		name: 'setKyberNetwork',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: 'token', type: 'address' },
			{
				internalType: 'uint256',
				name: 'minConversionRate',
				type: 'uint256',
			},
		],
		name: 'swapEtherToToken',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: 'token', type: 'address' },
			{ internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
			{
				internalType: 'uint256',
				name: 'minConversionRate',
				type: 'uint256',
			},
		],
		name: 'outputTokenToEther',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: 'src', type: 'address' },
			{ internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
			{ internalType: 'contract IERC20', name: 'dest', type: 'address' },
			{
				internalType: 'uint256',
				name: 'minConversionRate',
				type: 'uint256',
			},
		],
		name: 'outputTokenToToken',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: 'src', type: 'address' },
			{ internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
			{ internalType: 'contract IERC20', name: 'dest', type: 'address' },
			{
				internalType: 'address payable',
				name: 'destAddress',
				type: 'address',
			},
			{ internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
			{
				internalType: 'uint256',
				name: 'minConversionRate',
				type: 'uint256',
			},
			{
				internalType: 'address payable',
				name: 'platformWallet',
				type: 'address',
			},
		],
		name: 'trade',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract ERC20', name: 'src', type: 'address' },
			{ internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
			{ internalType: 'contract ERC20', name: 'dest', type: 'address' },
			{
				internalType: 'address payable',
				name: 'destAddress',
				type: 'address',
			},
			{ internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
			{
				internalType: 'uint256',
				name: 'minConversionRate',
				type: 'uint256',
			},
			{
				internalType: 'address payable',
				name: 'walletId',
				type: 'address',
			},
			{ internalType: 'bytes', name: 'hint', type: 'bytes' },
		],
		name: 'tradeWithHint',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: 'src', type: 'address' },
			{ internalType: 'uint256', name: 'srcAmount', type: 'uint256' },
			{ internalType: 'contract IERC20', name: 'dest', type: 'address' },
			{
				internalType: 'address payable',
				name: 'destAddress',
				type: 'address',
			},
			{ internalType: 'uint256', name: 'maxDestAmount', type: 'uint256' },
			{
				internalType: 'uint256',
				name: 'minConversionRate',
				type: 'uint256',
			},
			{
				internalType: 'address payable',
				name: 'platformWallet',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'platformFeeBps',
				type: 'uint256',
			},
			{ internalType: 'bytes', name: 'hint', type: 'bytes' },
		],
		name: 'tradeWithHintAndFee',
		outputs: [
			{ internalType: 'uint256', name: 'destAmount', type: 'uint256' },
		],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'newAdmin', type: 'address' },
		],
		name: 'transferAdmin',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'newAdmin', type: 'address' },
		],
		name: 'transferAdminQuickly',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{
				internalType: 'address payable',
				name: 'sendTo',
				type: 'address',
			},
		],
		name: 'withdrawEther',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: 'token', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ internalType: 'address', name: 'sendTo', type: 'address' },
		],
		name: 'withdrawToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as any;

export default kyberNetworkProxyAbi;
