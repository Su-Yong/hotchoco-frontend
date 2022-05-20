import { CheckPreferenceType, NumberPreferenceType, PreferenceType, SelectPreferenceType, SwitchPreferenceType, TextPreferenceType } from '@/constants/preference';
import { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { JSX } from 'solid-js/jsx-runtime';
import CheckPreference from './CheckPreference';
import SwitchPreference from './SwitchPreference';
import TextPreference from './TextPreference';
import NumberPreference from './NumberPreference';
import { variable, getTheme } from '@/theme';
import { css } from '@linaria/core';
import SelectPreference from './SelectPreference';

const containerStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${variable('Size.space.small')};
`;

const iconWrapperStyle = css`
  padding: ${variable('Size.space.medium')};
  border-radius: ${variable('Size.space.medium')};
  background: ${variable('Color.Grey.300')};

  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const components: Record<PreferenceType['type'], (preference: any) => JSX.Element> = {
  check: (preference: CheckPreferenceType) => (
    <CheckPreference
      id={preference.id}
      name={preference.name}
      icon={preference.icon}
      defaultValue={preference.defaultValue}
    />
  ),
  number: (preference: NumberPreferenceType) => (
    <NumberPreference
      id={preference.id}
      name={preference.name}
      icon={preference.icon}
      defaultValue={preference.defaultValue}
    />
  ),
  text: (preference: TextPreferenceType) => (
    <TextPreference
      id={preference.id}
      name={preference.name}
      icon={preference.icon}
      defaultValue={preference.defaultValue}
    />
  ),
  select: (preference: SelectPreferenceType) => (
    <SelectPreference
      id={preference.id}
      name={preference.name}
      icon={preference.icon}
      values={preference.values}
      required={preference.required}
      defaultValue={preference.defaultValue}
    />
  ),
  radio: () => <div>radio</div>,
  switch: (preference: SwitchPreferenceType) => (
    <SwitchPreference
      id={preference.id}
      name={preference.name}
      icon={preference.icon}
      defaultValue={preference.defaultValue}
    />
  ),
}

export interface PreferenceProps {
  preference: PreferenceType;
}

const Preference: Component<PreferenceProps> = (props) => {
  return (
    <div className={containerStyle}>
      <div className={iconWrapperStyle}>
        <props.preference.icon
          size={getTheme().Size.icon.medium}
        />
      </div>
      {props.preference.name}
      <div style={'flex'} />
      <Dynamic component={() => components[props.preference.type](props.preference)} />
    </div>
  )
};

export default Preference;
