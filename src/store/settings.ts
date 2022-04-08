import ThemeList from '@/theme/ThemeList';
import atomWithDebouncedStorage from '@/utils/jotai/atomWithDebouncedStorage';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const roomListWidth = atomWithDebouncedStorage('room-list-width', 360);
export const themeType = atomWithStorage<keyof typeof ThemeList>('theme', 'light');
export const themeObject = atom((get) => ThemeList[get(themeType)]);

export const autoLogout = atomWithStorage('auto-logout', true);
export const logoutTime = atomWithDebouncedStorage('logout-time', 5 * 60); // 단위: seconds

export const serverUrl = atomWithStorage('server-url', '');
