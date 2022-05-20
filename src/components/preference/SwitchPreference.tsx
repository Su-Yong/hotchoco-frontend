import { SwitchPreferenceType } from '@/constants/preference';
import { variable, getTheme } from '@/theme';
import { css } from '@linaria/core';
import { Component, createSignal } from 'solid-js';
import Switch from '../common/Switch';

export interface SwitchPreferenceProps extends Omit<SwitchPreferenceType, 'type'> {
  
}

const SwitchPreference: Component<SwitchPreferenceProps> = (props) => {
  const [checked, setChecked] = createSignal(props.defaultValue);

  return (
    <Switch
      id={props.id}
      checked={checked()}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}

export default SwitchPreference;
