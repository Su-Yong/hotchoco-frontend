import { TextPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import TextInput from '../common/TextInput';
import { model, useDirective } from '@/utils/directives';
useDirective(model);

export interface TextPreferenceProps extends Omit<TextPreferenceType, 'type'> {
  
}

const TextPreference: Component<TextPreferenceProps> = ({
  id,
  name,
  defaultValue,
}) => {
  const [text, setText] = createSignal(defaultValue);

  return (
    <div>
      {name}
      <TextInput
        id={id}
        use:model={[text, setText]}
      />
    </div>
  );
}

export default TextPreference;
