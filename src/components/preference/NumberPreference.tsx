import { NumberPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import TextInput from '../common/TextInput';
import { model, useDirective } from '@/utils/directives';
useDirective(model);

export interface NumberPreferenceProps extends Omit<NumberPreferenceType, 'type'> {
  
}

const NumberPreference: Component<NumberPreferenceProps> = (props) => {
  const [text, setText] = createSignal(props.defaultValue);

  return (
    <TextInput
      id={props.id}
      type={'number'}
      use:model={[text, setText]}
    />
  );
}

export default NumberPreference;
