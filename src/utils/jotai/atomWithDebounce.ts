import Nullish from '@/types/Nullish';
import { atom, WritableAtom } from 'jotai';
import { Read, Write } from './jotaiType';

export const DEFAULT_TIMEOUT = 500;
const atomWithDebounce = <Value, Update>(
  getterOrInit: Value | Read<Value>,
  setter: Write<Update, void>,
  timeout = DEFAULT_TIMEOUT,
): WritableAtom<Value, Update> => {
  let debounce: NodeJS.Timeout | Nullish = null;

  const resultAtom = atom<Value, Update>(
    getterOrInit as Value, // easy typing
    (get, set, value) => {
      if (debounce) clearTimeout(debounce);

      debounce = setTimeout(() => {
        setter(get, set, value);
      }, timeout);
    },
  );

  return resultAtom;
};

export default atomWithDebounce;
