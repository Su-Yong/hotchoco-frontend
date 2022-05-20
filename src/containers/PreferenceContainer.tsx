import Header from '@/components/Header';
import Preference from '@/components/preference/Preference';
import { PreferenceGroupType } from '@/constants/preference';
import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Component, For } from 'solid-js';

const containerStyle = css`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;

  background: ${variable('Color.Grey.100')};
`;

export interface PreferenceContainerProps {
  group: PreferenceGroupType;
}

const PreferenceContainer: Component<PreferenceContainerProps> = (props) => {
  

  return (
    <div className={containerStyle}>
      <Header>{props.group.name}</Header>
      <For each={props.group.preferences}>
        {(preference) => <Preference preference={preference} />}
      </For>
    </div>
  );
}

export default PreferenceContainer;
