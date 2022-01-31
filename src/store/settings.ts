import atomWithDebouncedStorage from '@/utils/jotai/atomWithDebouncedStorage';
import { atomWithStorage } from 'jotai/utils';

export const roomListWidth = atomWithDebouncedStorage('room-list-width', 360);
export const themeType = atomWithStorage<'light' | 'dark' | 'system'>('theme', 'system');
