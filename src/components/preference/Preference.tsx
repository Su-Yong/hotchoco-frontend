import { CheckPreferenceType, PreferenceType, SwitchPreferenceType } from '@/constants/preference';
import { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { JSX } from 'solid-js/jsx-runtime';
import CheckPreference from './CheckPreference';
import SwitchPreference from './SwitchPreference';

const components: Record<PreferenceType['type'], (preference: any) => JSX.Element> = {
  check: (preference: CheckPreferenceType) => (
    <CheckPreference
      id={preference.id}
      name={preference.name}
      value={preference.value}
      defaultValue={preference.defaultValue} />
  ),
  number: () => <div>number</div>,
  text: () => <div>text</div>,
  select: () => <div>select</div>,
  radio: () => <div>radio</div>,
  switch: (preference: SwitchPreferenceType) => (
    <SwitchPreference
      id={preference.id}
      name={preference.name}
      value={preference.value}
      defaultValue={preference.defaultValue} />
  ),
}

export interface PreferenceProps {
  preference: PreferenceType;
}

const Preference: Component<PreferenceProps> = ({
  preference,
}) => {
  return (
    <Dynamic component={() => components[preference.type](preference)} />
  )
};

export default Preference;
