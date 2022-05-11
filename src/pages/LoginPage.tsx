import CheckBox from '@/components/common/CheckBox';
import IconButton from '@/components/common/IconButton';
import TextButton from '@/components/common/TextButton';
import TextInput from '@/components/common/TextInput';
import { setTheme } from '@/theme';
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
  gap: 4px;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    align-items: stretch;
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
  const [themeMode, setThemeMode] = createSignal(localStorage.getItem('theme') ?? 'light');
  
  createEffect(() => {
    localStorage.setItem('theme', themeMode());
    if (themeMode() === 'light') setTheme(LightTheme);
    if (themeMode() === 'dark') setTheme(DarkTheme);
  })

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
      <TextButton className={loginButtonStyle}>로그인</TextButton>
      <TextButton className={loginButtonStyle}>회원가입</TextButton>
    </div>
  );
}

export default LoginPage;
