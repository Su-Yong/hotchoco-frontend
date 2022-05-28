import Preference from '@/components/preference/Preference';
import { PreferenceGroupType } from '@/constants/preference';
import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Component, For } from 'solid-js';

const containerStyle = css`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: ${variable('Size.space.small')};

  padding: ${variable('Size.space.large')};
  border-radius: ${variable('Size.space.large')};
  background: ${variable('Color.Grey.100')};

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const titleStyle = css`
  font-size: ${variable('Size.text.title')};
  font-weight: bold;
  font-family: 'SUIT Variable';
  
  margin-bottom: ${variable('Size.space.medium')};
`;

export interface PreferenceContainerProps {
  group: PreferenceGroupType;
}

const PreferenceContainer: Component<PreferenceContainerProps> = (props) => {
  

  return (
    <div className={containerStyle}>
      <div className={titleStyle}>{props.group.name}</div>
      <For each={props.group.preferences}>
        {(preference) => <Preference preference={preference} />}
      </For>
    </div>
  );
}

export default PreferenceContainer;
