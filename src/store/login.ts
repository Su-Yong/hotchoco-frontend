import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Nullish from '../types/Nullish';

export const SESSION = atom<string | Nullish>(null);
export const STORED_SESSION = atomWithStorage<string | Nullish>('session', null);
