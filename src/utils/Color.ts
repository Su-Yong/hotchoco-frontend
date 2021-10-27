import rgba from 'color-rgba';

const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(min, num), max);
const extract = (color: string): [number, number, number, number] => {
  const result = rgba(color);

  if (!result) throw Error(`"${color}" is not color string`);

  return result;
};

export const shade = (color: string, value: number): string => {
  const [r, g, b, a] = extract(color);

  const rr = clamp(Math.floor(r * (1 + value)), 0, 255);
  const gg = clamp(Math.floor(g * (1 + value)), 0, 255);
  const bb = clamp(Math.floor(b * (1 + value)), 0, 255);

  return `rgba(${rr}, ${gg}, ${bb}, ${a})`;
};

export const darken = (color: string, value: number): string => shade(color, -Math.abs(value));
export const lighten = (color: string, value: number): string => shade(color, Math.abs(value));

export const alpha = (color: string, alpha: number): string => {
  const [r, g, b] = extract(color);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ColorUtil = {
  shade,
  darken,
  lighten,
  alpha,
};

export default ColorUtil;