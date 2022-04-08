import ThemeList from '@/theme/ThemeList';
import atomWithDebouncedStorage from '@/utils/jotai/atomWithDebouncedStorage';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const ROOM_LIST_WIDTH = atomWithDebouncedStorage('room-list-width', 360);
export const THEME_TYPE = atomWithStorage<keyof typeof ThemeList>('theme', 'light');
export const THEME_OBJECT = atom((get) => ThemeList[get(THEME_TYPE)]);

export const AUTO_LOGOUT = atomWithStorage('auto-logout', true);
export const LOGOUT_TIME = atomWithDebouncedStorage('logout-time', 5 * 60); // 단위: seconds

export const SERVER_URL = atomWithStorage('server-url', '');
