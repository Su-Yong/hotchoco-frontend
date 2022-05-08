import { CheckPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import CheckBox from '../common/CheckBox';

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
      {name}
      <CheckBox
        id={id}
        checked={checked()}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
    </div>
  );
}

export default CheckPreference;
