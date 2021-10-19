import DarkTheme from './themes/DarkTheme';
import LightTheme from './themes/LightTheme';

const ThemeList = {
  light: LightTheme,
  dark: DarkTheme,
} as const;

export default ThemeList;
