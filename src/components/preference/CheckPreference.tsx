import { CheckPreferenceType } from '@/constants/preference';
import createStorageSignal from '@/hooks/createStorageSignal';
import { Component, createSignal } from 'solid-js';
import CheckBox from '../common/CheckBox';

export interface CheckPreferenceProps extends Omit<CheckPreferenceType, 'type'> {
  
}

const CheckPreference: Component<CheckPreferenceProps> = (props) => {
  const [checked, setChecked] = props.signal ?? createStorageSignal(
    props.id,
    props.defaultValue,
  );

  return (
    <CheckBox
      id={props.id}
      checked={checked()}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}

export default CheckPreference;
