import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import { preferenceGroupList } from '@/constants/preference';
import PreferenceContainer from '@/containers/PreferenceContainer';
import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Component, createSignal, For } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const containerStyle = css`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: ${variable('Size.space.medium')};

  padding: ${variable('Size.space.medium')};
  overflow-y: auto;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;

    opacity: ${variable('Color.Transparency.vague')};
    background: ${variable('Color.Grey.200')};
  }

  @media (max-width: 640px) {
    height: fit-content;
  }
`;
const allowGestureStyle = css`
  touch-action: pan-down;
`;
const disallowGestureStyle = css`
  touch-action: pan-y;
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
const headerDummyStyle = css`
  height: 56px;
  min-height: 56px;
  max-height: 56px;
  margin-bottom: calc(-1 * ${variable('Size.space.medium')});
`;

const PreferencePage: Component = () => {
  const onClose = () => {
    history.back();
  };

  const [isGestureAllow, setIsGestureAllow] = createSignal(true);

  const onScroll: JSX.EventHandlerUnion<HTMLDivElement, UIEvent> = (event) => {
    const top = event.target.scrollTop;

    if (top <= 0) {
      if (!isGestureAllow()) setIsGestureAllow(true);
    } else {
      if (isGestureAllow()) setIsGestureAllow(false);
    }
  };

  return (
    <div
      classList={{
        [containerStyle]: true,
        [allowGestureStyle]: isGestureAllow(),
        [disallowGestureStyle]: !isGestureAllow(),
      }}
      onScroll={onScroll}
    >
      <Header
        className={headerStyle}
        leftIcon={<IconButton icon={'arrow_back'} onClick={onClose} />}
      >
        설정
      </Header>
      <div class={headerDummyStyle} />
      <For each={preferenceGroupList}>
        {(group) => <PreferenceContainer group={group} />}
      </For>
    </div>
  );
};

export default PreferencePage;
