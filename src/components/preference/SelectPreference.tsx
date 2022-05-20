import { SelectPreferenceType } from '@/constants/preference';
import { Component, createSignal } from 'solid-js';
import Select from '../common/Select';

export interface CheckPreferenceProps extends Omit<SelectPreferenceType, 'type'> {
  
}

const CheckPreference: Component<CheckPreferenceProps> = (props) => {
  const [select, setSelect] = createSignal<string | undefined>(props.defaultValue);

  return (
    <Select
      required={props.required}
      id={props.id}
      value={select()}
      onSelect={setSelect}
      items={props.values}
    />
  );
}

export default CheckPreference;
