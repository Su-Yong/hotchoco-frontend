import { SelectPreferenceType } from '@/constants/preference';
import createStorageSignal from '@/hooks/createStorageSignal';
import { Component, createSignal } from 'solid-js';
import Select from '../common/Select';

export interface CheckPreferenceProps extends Omit<SelectPreferenceType, 'type'> {
  
}

const CheckPreference: Component<CheckPreferenceProps> = (props) => {
  const [select, setSelect] = props.signal ?? createStorageSignal(
    props.id,
    props.defaultValue,
    {
      serialize: false,
    },
  );

  if (props.required && props.values.every((it) => it.id !== select())) {
    setSelect(props.defaultValue);
  }

  return (
    <Select
      required={props.required}
      id={props.id}
      value={select()}
      onSelect={(it) => {
        setSelect(it!);
      }}
      items={props.values}
      style={'width: 180px;'}
    />
  );
}

export default CheckPreference;
