import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import { preferenceGroupList } from '@/constants/preference';
import PreferenceContainer from '@/containers/PreferenceContainer';
import { variable } from '@/theme';
import { css } from '@linaria/core';
import { VscArrowLeft } from 'solid-icons/vsc';
import { Component, For } from 'solid-js';

const containerStyle = css`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: ${variable('Size.space.medium')};

  padding: 0 ${variable('Size.space.medium')};
  overflow-y: auto;
`;

const headerStyle = css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  z-index: 10000;
  backdrop-filter: blur(16px);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;

    height: 56px;

    opacity: ${variable('Color.Transparency.vague')};
    background: ${variable('Color.Grey.200')};
  }
`;

const PreferencePage: Component = () => {
  const onClose = () => {
    history.back();
  };

  return (
    <div className={containerStyle}>
    <Header
      className={headerStyle}
      leftIcon={<IconButton icon={VscArrowLeft} onClick={onClose} />}
    >
      설정
    </Header>
      <div style={'height: 56px; min-height: 56px; max-height: 56px;'} />
      <For each={preferenceGroupList}>
        {(group) => <PreferenceContainer group={group} />}
      </For>
    </div>
  );
};

export default PreferencePage;
