const buildDivisor = (decimals: number) => {
	let divisor = '1';

	for (let i = 0; i < decimals; i++) {
		divisor += '0';
	}

	return Number(divisor);
};

export default buildDivisor;
