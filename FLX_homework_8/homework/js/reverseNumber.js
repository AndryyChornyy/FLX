function reverseNumber(x) {
	return parseInt(x.toString().split('').reverse().join('')) * Math.sign(x);
}
reverseNumber(10000);