import createStorageSignal from '@/hooks/createStorageSignal';
import { variable } from '@/theme';

export const [themeMode, setThemeMode] = createStorageSignal(
  'theme',
  'light',
  { serialize: false },
);

export const [mainColor, setMainColor] = createStorageSignal(
  'mainColor',
  variable('Color.Blue.500'),
  { serialize: false },
);
