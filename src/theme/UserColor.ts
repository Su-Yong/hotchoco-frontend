import { createSignal, createRoot, Accessor } from 'solid-js';
import { Color } from './ColorSheet';
import { DefaultUserColor } from './defined/DefaultUserColor';
import { CSSVariableName, getCSSVariables } from './variable';

export interface ColorTokens {
  Main: Color;
  Text: Color;
  Container: Color;
}
export interface UserColor {
  Primary: ColorTokens;
  Secondary: ColorTokens;
  Tertiary: ColorTokens;
  Success: ColorTokens;
  Warning: ColorTokens;
  Danger: ColorTokens;

  Light: Color;
  Dark: Color;
}

const createUserColor = () => {
  const [userColor, setUserColor] = createSignal<UserColor>(DefaultUserColor);

  return { userColor, setUserColor };
};

export const { userColor: getUserColor, setUserColor } = createRoot(createUserColor);

export type UserColorStyle = Record<CSSVariableName, unknown>;
export const createUserColorStyle = (): Accessor<UserColorStyle> => () =>  getCSSVariables(getUserColor());
