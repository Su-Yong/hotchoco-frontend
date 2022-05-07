import { Accessor, createRoot, createSignal } from 'solid-js';
import { CSSVariableName, getCSSVariables } from './variable';

import { LightTheme } from './defined/LightTheme';

import type { ColorSheet } from './ColorSheet';
import type { Animation } from './Animation';

export interface Theme {
  Color: ColorSheet;
  Animation: Animation;
}

const createTheme = () => {
  const [theme, setTheme] = createSignal(LightTheme);

  return { theme, setTheme };
};

export const { theme: getTheme, setTheme } = createRoot(createTheme);

export type ThemeStyle = Record<CSSVariableName, unknown>;
export const createThemeStyle = (): Accessor<ThemeStyle> => () =>  getCSSVariables(getTheme());
