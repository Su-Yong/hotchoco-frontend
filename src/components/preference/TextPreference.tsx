import { TextPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import TextInput from '../common/TextInput';
import { model, useDirective } from '@/utils/directives';
useDirective(model);

export interface TextPreferenceProps extends Omit<TextPreferenceType, 'type'> {
  
}

const TextPreference: Component<TextPreferenceProps> = (props) => {
  const [text, setText] = createSignal(props.defaultValue);

  return (
    <TextInput
      id={props.id}
      use:model={[text, setText]}
    />
  );
}

export default TextPreference;
