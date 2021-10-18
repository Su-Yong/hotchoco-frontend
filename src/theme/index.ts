import { createTheming } from '@callstack/react-theme-provider';
import DefaultTheme from './DefaultTheme';
import Theme from './Theme';

export const { ThemeProvider, withTheme, useTheme } = createTheming<Theme>(DefaultTheme);
