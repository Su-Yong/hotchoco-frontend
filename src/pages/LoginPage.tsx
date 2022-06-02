import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import IconButton from '@/components/common/IconButton';
import TextButton from '@/components/common/TextButton';
import TextInput from '@/components/common/TextInput';
import Preference from '@/components/preference/Preference';
import { appearancePreferenceGroup, preferenceGroupList } from '@/constants/preference';
import createMediaSignal from '@/hooks/createMediaSignal';
import { setThemeMode, themeMode } from '@/store/display';
import { variable } from '@/theme';
import { css } from '@linaria/core';
import { useNavigate } from 'solid-app-router';
import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { Transition } from 'solid-transition-group';

const containerStyle = css`
  width: 100%;
  height: 100%;
  padding: 4rem;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4rem;
`;

const formStyle = css`
  min-width: 16rem;
  height: 100%;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 8px;

  background: transparent;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  @media (max-width: 640px) {
    min-width: unset;
    width: 100%;

    justify-content: center;
    align-items: stretch;
  }

  &[data-settings="true"] {
    transform: translateX(-10%);
  }

  & > * {
    animation: show ${variable('Animation.duration.short')} ${variable('Animation.easing.deceleration')} both;
  }

  & > *:nth-child(1) {
    animation-delay: calc(0 * ${variable('Animation.duration.shortest')});
  }
  & > *:nth-child(2) {
    animation-delay: calc(0.5 * ${variable('Animation.duration.shortest')});
  }
  & > *:nth-child(3) {
    animation-delay: calc(1 * ${variable('Animation.duration.shortest')});
  }
  & > *:nth-child(4) {
    animation-delay: calc(1.5 * ${variable('Animation.duration.shortest')});
  }
  & > *:nth-child(5) {
    animation-delay: calc(2 * ${variable('Animation.duration.shortest')});
  }
  & > *:nth-child(6) {
    animation-delay: calc(2.5 * ${variable('Animation.duration.shortest')});
  }
  & > *:nth-child(7) {
    animation-delay: calc(3 * ${variable('Animation.duration.shortest')});
  }

  @keyframes show {
    0% {
      transform: translateY(50%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const titleStyle = css`
  @media (max-width: 640px) {
    align-self: center;
  }
`;

const loginButtonStyle = css`
  align-self: flex-end;
`;

const infoContainerStyle = css`
  flex: 1;
  height: 100%;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: ${variable('Size.space.medium')};

  background: ${variable('Color.Grey.100')};
  border-radius: ${variable('Size.space.large')};
  padding: ${variable('Size.space.large')};

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  @media (max-width: 640px) {
    position: absolute;
    inset: 0;

    border-radius: 0;
    background: transparent;

    z-index: 10;
    backdrop-filter: blur(8px);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;

      background: ${variable('Color.Grey.100')};
      opacity: ${variable('Color.Transparency.vague')};

      transition-duration: ${variable('Animation.duration.short')};
      transition-timing-function: ${variable('Animation.easing.deceleration')};
    }
  }
`;

const showStart = css`
  transform: translateX(100%);
`;

const showEnd = css`
  transform: translateX(0);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const dismissStart = css`
  transform: translateX(0);
`;

const dismissEnd = css`
  transform: translateX(100%);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const overlayStyle = css`
  position: fixed;
  inset: 0;
  background: ${variable('Color.Grey.500')};
  opacity: ${variable('Color.Transparency.translucent')};
  z-index: 5;

  pointer-events: none;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.linear')};
`;

const fadeInStart = css`
  opacity: 0;
`;
const fadeInEnd = css`
  opacity: ${variable('Color.Transparency.translucent')};
`;
const fadeOutStart = css`
  opacity: ${variable('Color.Transparency.translucent')};
`;
const fadeOutEnd = css`
  opacity: 0;
`;

export interface LoginPageProps {
  
}

const LoginPage: Component<LoginPageProps> = (props) => {
  const navigate = useNavigate();
  const isWideScreen = createMediaSignal('(min-width: 640px)');
  const [open, setOpen] = createSignal(false);

  const onSettingToggle = () => {
    setOpen((it) => !it);
  };

  const onLogin = () => {
    navigate('../chat');
  };

  return (
    <div className={containerStyle}>
      <div className={formStyle} data-settings={open()}>
        <h1 className={titleStyle}>
          Hotchoco
          <Show when={!isWideScreen()}>
            <IconButton icon={'settings'} onClick={onSettingToggle} />
          </Show>
        </h1>
        <TextInput placeholder={'아이디'} />
        <TextInput type={'password'} placeholder={'비밀번호'} />
        <CheckBox>아이디 저장</CheckBox>
        <CheckBox>자동 로그인</CheckBox>
        <Button className={loginButtonStyle} onClick={onLogin}>로그인</Button>
        <TextButton className={loginButtonStyle}>회원가입</TextButton>
      </div>
      <Transition
        enterClass={fadeInStart}
        enterToClass={fadeInEnd}
        exitClass={fadeOutStart}
        exitToClass={fadeOutEnd}
      >
        <Show when={open()}>
          <div className={overlayStyle} />
        </Show>
      </Transition>
      <Transition
        enterClass={showStart}
        enterToClass={showEnd}
        exitClass={dismissStart}
        exitToClass={dismissEnd}
      >
        <Show
          when={isWideScreen() || open()}
        >
          <div className={infoContainerStyle}>
            <Show when={!isWideScreen()}>
              <IconButton icon={'close'} onClick={() => setOpen(false)} />
            </Show>
            <For each={appearancePreferenceGroup.preferences}>
              {(preference) => (
                <Preference preference={preference} />
              )}
            </For>
          </div>
        </Show>
      </Transition>
    </div>
  );
}

export default LoginPage;
