import { preferenceGroupList } from '@/constants/preference';
import PreferenceContainer from '@/containers/PreferenceContainer';
import { createThemeStyle } from '@/theme';
import { Component, For } from 'solid-js';

const PreferencePage: Component = () => {

  return (
    <For each={preferenceGroupList}>
      {(group) => <PreferenceContainer group={group} />}
    </For>
  );
};

export default PreferencePage;
