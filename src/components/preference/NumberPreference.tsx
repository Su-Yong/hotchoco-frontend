import { NumberPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import TextInput from '../common/TextInput';
import { model, useDirective } from '@/utils/directives';
import createStorageSignal from '@/hooks/createStorageSignal';
useDirective(model);

export interface NumberPreferenceProps extends Omit<NumberPreferenceType, 'type'> {
  
}

const NumberPreference: Component<NumberPreferenceProps> = (props) => {
  const [text, setText] = props.signal ?? createStorageSignal(
    props.id,
    props.defaultValue,
    {
      serialize: false,
      to: (it) => Number(it),
    },
  );

  return (
    <TextInput
      min={props.min}
      max={props.max}
      type={'number'}
      value={text()}
      onChange={(event) => setText(Number(event.currentTarget.value))}
    />
  );
}

export default NumberPreference;
