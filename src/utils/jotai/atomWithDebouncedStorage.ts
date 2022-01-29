import Nullish from '@/types/Nullish';
import { atom, WritableAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { DEFAULT_TIMEOUT } from './atomWithDebounce';

const atomWithDebouncedStorage = <Value>(
  key: string,
  initialValue: Value,
  timeout = DEFAULT_TIMEOUT,
): WritableAtom<Value, Value> => {
  const fastAtom = atom<Value | Nullish>(null);
  const storageAtom = atomWithStorage(key, initialValue);

  let debounce: NodeJS.Timeout | Nullish = null;

  return atom(
    (get) => get(fastAtom) ?? get(storageAtom),
    (_, set, value) => {
      if (debounce) clearTimeout(debounce);
      set(fastAtom, value);

      debounce = setTimeout(() => {
        set(storageAtom, value);
      }, timeout);
    }
  );
}

export default atomWithDebouncedStorage;
