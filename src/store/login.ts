import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Nullish from '../types/Nullish';

export const session = atom<string | Nullish>(null);
export const storedSession = atomWithStorage<string | Nullish>('session', null);
