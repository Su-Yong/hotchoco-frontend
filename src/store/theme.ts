import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import ThemeList from '../theme/ThemeList';

export const theme = atomWithStorage<keyof typeof ThemeList>('theme', 'light');
export const themeObject = atom((get) => ThemeList[get(theme)]);
