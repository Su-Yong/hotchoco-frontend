import { Accessor, createRenderEffect, onCleanup } from 'solid-js';

export type Directive<Element, Value> = (element: Element, accessor: () => Value) => void;

export function model(element: HTMLInputElement, value: Accessor<any>) {
  const [field, setField, initAccessName] = value();
  const accessName = (initAccessName ?? 'value') as 'value';

  createRenderEffect(() => {
    element[accessName] = field();
  });

  const onInput = () => setField(element[accessName]);

  element.addEventListener('change', onInput);
  onCleanup(() => {
    element.removeEventListener('change', onInput);
  });
};

export const useDirective = (...directives: Directive<any, any>[]) => {
  // do nothing
};