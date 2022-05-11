import { SwitchPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import Switch from '../common/Switch';

export interface SwitchPreferenceProps extends Omit<SwitchPreferenceType, 'type'> {
  
}

const SwitchPreference: Component<SwitchPreferenceProps> = ({
  id,
  name,
  value,
  defaultValue,
}) => {
  const [checked, setChecked] = createSignal(value ?? defaultValue);

  return (
    <div>
      {name}
      <Switch
        id={id}
        checked={checked()}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
    </div>
  );
}

export default SwitchPreference;
