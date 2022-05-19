// https://developer.mozilla.org/ko/docs/Web/CSS/time
export const cssTimeToMs = (str: string | number): number | null => {
  if (typeof str === 'number') return str;
  const [_, value, unit] = str.match(/^(-?\d+)(s|ms)$/i) ?? [];

  if (value && unit) {
    const num = Number(value);
    const offset = unit === 'ms' ? 1 : 1000;

    return num * offset;
  }

  return null;
};