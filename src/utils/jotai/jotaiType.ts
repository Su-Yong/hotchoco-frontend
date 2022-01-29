import { Atom, WritableAtom } from 'jotai';

/* From Jotai */
export type ResolveType<T> = T extends Promise<infer V> ? V : T; // TODO: Awaited 로 교체
export type Getter = {
  <Value>(atom: Atom<Value | Promise<Value>>): Value;
  <Value>(atom: Atom<Promise<Value>>): Value;
  <Value>(atom: Atom<Value>): ResolveType<Value>;
};
export type WriteGetter = Getter & {
  <Value>(atom: Atom<Value | Promise<Value>>, options: {
      unstable_promise: true;
  }): Promise<Value> | Value;
  <Value>(atom: Atom<Promise<Value>>, options: {
      unstable_promise: true;
  }): Promise<Value> | Value;
  <Value>(atom: Atom<Value>, options: {
      unstable_promise: true;
  }): Promise<ResolveType<Value>> | ResolveType<Value>;
};
export type Setter = {
  <Value, Result extends void | Promise<void>>(atom: WritableAtom<Value, undefined, Result>): Result;
  <Value, Update, Result extends void | Promise<void>>(atom: WritableAtom<Value, Update, Result>, update: Update): Result;
};
export type Read<Value> = (get: Getter) => Value;
export type Write<Update, Result extends void | Promise<void>> = (get: WriteGetter, set: Setter, update: Update) => Result;
/* From Jotai */