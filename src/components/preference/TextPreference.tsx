import { TextPreferenceType } from '@/constants/preference';
import { Component } from 'solid-js';
import TextInput from '../common/TextInput';
import { model, useDirective } from '@/utils/directives';
import createStorageSignal from '@/hooks/createStorageSignal';
useDirective(model);

export interface TextPreferenceProps extends Omit<TextPreferenceType, 'type'> {
  
}

const TextPreference: Component<TextPreferenceProps> = (props) => {
  const [text, setText] = props.signal ?? createStorageSignal(
    props.id,
    props.defaultValue,  
    {
      serialize: false,
    },
  );

  return (
    <TextInput
      id={props.id}
      value={text()}
      onChange={(event) => setText(event.currentTarget.value)}
    />
  );
}

export default TextPreference;
