import Header from '@/components/Header';
import Preference from '@/components/preference/Preference';
import { PreferenceGroupType } from '@/constants/preference';
import { Component, For } from 'solid-js';

export interface PreferenceContainerProps {
  group: PreferenceGroupType;
}

const PreferenceContainer: Component<PreferenceContainerProps> = ({
  group,
}) => {
  

  return (
    <div>
      <Header>{group.name}</Header>
      <For each={group.preferences}>
        {(preference) => <Preference preference={preference} />}
      </For>
    </div>
  );
}

export default PreferenceContainer;
