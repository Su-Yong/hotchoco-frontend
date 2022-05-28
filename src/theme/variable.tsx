import { Theme } from './theme';
import { Leaves } from '../utils/types';
import { flattenKey } from '../utils';
import { UserColor } from './UserColor';

export type CSSVariable = `var(${string})`;
export type CSSVariableName = `--${string}`;

export const getCSSVariables = (theme: Theme | UserColor, prefix = 'th'): Record<CSSVariableName, unknown> => {
  const allKeys = Object.keys(flattenKey(theme));

  const result: Record<CSSVariableName, unknown> = {};
  allKeys.forEach((key) => {
    const name = getVariableName(key as Leaves<Theme | UserColor>, prefix);

    result[name] = key.split('.').reduce((prev: object | string, curr) => {
      if (typeof prev === 'object') return prev[curr as keyof typeof prev];

      return curr;
    }, theme);
  });

  return result;
};

export const getVariableName = (key: Leaves<Theme | UserColor>, prefix = 'th'): CSSVariableName => {
  const computedKey = key.split('.')
    .map((key) => key.toLowerCase())
    .join('-');

  return `--${prefix}-${computedKey}`;
};

export const variable = (key: Leaves<Theme | UserColor>): CSSVariable => `var(${getVariableName(key)})`;
