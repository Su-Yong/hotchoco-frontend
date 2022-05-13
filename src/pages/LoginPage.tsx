import { setThemeMode, themeMode } from '@/App';
import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import IconButton from '@/components/common/IconButton';
import TextButton from '@/components/common/TextButton';
import TextInput from '@/components/common/TextInput';
import { setTheme, variable } from '@/theme';
import { DarkTheme } from '@/theme/defined/DarkTheme';
import { LightTheme } from '@/theme/defined/LightTheme';
import { css } from '@linaria/core';
import { FaMoon, FaSun } from 'solid-icons/fa';
import { Component, createEffect, createSignal } from 'solid-js';

const containterStyle = css`
  width: fit-content;
  height: 100%;

  padding: 4rem;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    align-items: stretch;
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

export interface LoginPageProps {
  
}

const LoginPage: Component<LoginPageProps> = ({
  
}) => {
  const onChangeTheme = () => {
    setThemeMode((it) => it === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={containterStyle}>
      <h1 className={titleStyle}>
        Hotchoco
        {themeMode() === 'light' && <IconButton size={24} icon={FaMoon} onClick={onChangeTheme} />}
        {themeMode() === 'dark' && <IconButton size={24} icon={FaSun} onClick={onChangeTheme} />}
      </h1>
      <TextInput placeholder={'아이디'} />
      <TextInput type={'password'} placeholder={'비밀번호'} />
      <CheckBox>아이디 저장</CheckBox>
      <CheckBox>자동 로그인</CheckBox>
      <Button className={loginButtonStyle}>로그인</Button>
      <TextButton className={loginButtonStyle}>회원가입</TextButton>
    </div>
  );
}

export default LoginPage;
