import { CheckPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import CheckBox from '../common/CheckBox';
import { model, useDirective } from '@/utils/directives';

useDirective(model);

export interface CheckPreferenceProps extends Omit<CheckPreferenceType, 'type'> {
  
}

const CheckPreference: Component<CheckPreferenceProps> = ({
  id,
  name,
  value,
  defaultValue,
}) => {
  const [checked, setChecked] = createSignal(value ?? defaultValue);

  return (
    <div>
      <CheckBox
        id={id}
        checked={checked()}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      >
        {name}
      </CheckBox>
    </div>
  );
}

export default CheckPreference;
