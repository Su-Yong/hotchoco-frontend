import createStorageSignal from '@/hooks/createStorageSignal';

export const [themeMode, setThemeMode] = createStorageSignal(
  'theme',
  'light',
  { serialize: false },
);
