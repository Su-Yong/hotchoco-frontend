const toBigInt = (str: string): bigint => {
  const list = str.split('');
  const ints = list.map((it) => BigInt(it.charCodeAt(0)));

  return ints.reduce((prev, curr) => prev * 10n + curr, 0n);
};

export default toBigInt;
