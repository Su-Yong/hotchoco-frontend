import { SwitchPreferenceType } from '@/constants/preference';
import createStorageSignal from '@/hooks/createStorageSignal';
import { Component } from 'solid-js';
import Switch from '../common/Switch';

export interface SwitchPreferenceProps extends Omit<SwitchPreferenceType, 'type'> {
  
}

const SwitchPreference: Component<SwitchPreferenceProps> = (props) => {
  const [checked, setChecked] = props.signal ?? createStorageSignal(
    props.id,
    props.defaultValue,
  );

  return (
    <Switch
      id={props.id}
      checked={checked()}
      onChecked={setChecked}
    />
  );
}

export default SwitchPreference;
