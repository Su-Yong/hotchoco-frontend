import { Accessor, createRenderEffect, onCleanup } from 'solid-js';

export type Directive<Element, Value> = (element: Element, accessor: () => Value) => void;

export function model(element: HTMLInputElement, value: Accessor<any>) {
  const [field, setField, initAccessName] = value();
  const accessName = (initAccessName ?? 'value') as 'value';

  console.log('model directive', element, field(), accessName);

  createRenderEffect(() => {
    element[accessName] = field();
  });

  const onclick = () => setField(element[accessName]);

  element.addEventListener('input', onclick);
  onCleanup(() => element.removeEventListener('input', onclick));
};

export const useDirective = (...directives: Directive<any, any>[]) => {
  // do nothing
};