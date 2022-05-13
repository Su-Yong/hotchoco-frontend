import { Accessor, createEffect, createSignal, Setter } from 'solid-js';

type StorageSignalOption = {
  storage?: Storage;
  serialize?: boolean;
};

const createStorageSignal = <T>(
  key: string,
  initValue: T,
  {
    storage = localStorage,
    serialize = true,
  }: StorageSignalOption = {},
): [Accessor<T>, Setter<T>] => {
  const [value, setValue] = createSignal(initValue);

  createEffect(() => {
    let result = value() as unknown as string;
    if (serialize) result = JSON.stringify(value());
    
    storage.setItem(key, result);
  });

  const initData = storage.getItem(key);
  if (initData) {
    let data = initData as unknown as Exclude<T, Function>;
    if (serialize) data = JSON.parse(initData);

    setValue(data);
  }

  return [value, setValue];
};

export default createStorageSignal;
