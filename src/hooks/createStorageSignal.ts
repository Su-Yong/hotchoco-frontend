import { Accessor, createEffect, createSignal, Setter } from 'solid-js';

type StorageSignalOption<T> = {
  storage?: Storage;
  serialize?: boolean;
  to?: (value: unknown) => Exclude<T, Function>;
};

const createStorageSignal = <T>(
  key: string,
  initValue: T,
  {
    storage = localStorage,
    serialize = true,
    to,
  }: StorageSignalOption<T> = {},
): [Accessor<T>, Setter<T>] => {
  const [value, setValue] = createSignal(initValue);

  createEffect(() => {
    let result = value() as unknown as string;
    if (serialize) result = JSON.stringify(value());
    
    storage.setItem(key, result);
  });

  const initData = storage.getItem(key);
  if (initData) {
    let data = initData as unknown;
    if (serialize) data = JSON.parse(initData);
    if (to) data = to(data);

    setValue(data as Exclude<T, Function>);
  }

  return [value, setValue];
};

export default createStorageSignal;
