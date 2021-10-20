import rgba from 'color-rgba';

const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(min, num), max);
const extract = (color: string): [number, number, number, number] => {
  const result = rgba(color);

  if (!result) throw Error(`"${color}" is not color string`);

  return result;
};

export const shade = (color: string, percent: number): string => {
  const [r, g, b, a] = extract(color);

  const rr = clamp(Math.floor(r * ((100 + percent) / 100)), 0, 255);
  const gg = clamp(Math.floor(g * ((100 + percent) / 100)), 0, 255);
  const bb = clamp(Math.floor(b * ((100 + percent) / 100)), 0, 255);

  return `rgba(${rr}, ${gg}, ${bb}, ${a})`;
};

export const darken = (color: string, percent: number): string => shade(color, -Math.abs(percent));
export const lighten = (color: string, percent: number): string => shade(color, Math.abs(percent));

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
