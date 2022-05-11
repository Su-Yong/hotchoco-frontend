import { NumberPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import TextInput from '../common/TextInput';
import { model, useDirective } from '@/utils/directives';
useDirective(model);

export interface NumberPreferenceProps extends Omit<NumberPreferenceType, 'type'> {
  
}

const NumberPreference: Component<NumberPreferenceProps> = ({
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
        type={'number'}
        use:model={[text, setText]}
      />
    </div>
  );
}

export default NumberPreference;
