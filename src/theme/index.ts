import { createTheming } from '@callstack/react-theme-provider';
import LightTheme from './themes/LightTheme';
import Theme from './Theme';

export const { ThemeProvider, withTheme, useTheme } = createTheming<Theme>(LightTheme);
