import { createEffect, createSignal } from 'solid-js';

import type { Component } from 'solid-js';
import { css } from '@linaria/core';
import { modularScale, hiDPI } from 'polished';
import Button from '../components/common/Button';
import { createThemeStyle, setTheme, variable } from '../theme';
import { LightTheme } from '../theme/defined/LightTheme';
import { DarkTheme } from '../theme/defined/DarkTheme';
import IconButton from '../components/common/IconButton';
import { VscAccount } from 'solid-icons/vsc';
import CheckBox from '../components/common/CheckBox';

const header = css`
  text-transform: uppercase;
  font-size: ${modularScale(2)};

  ${hiDPI(1.5)} {
    font-size: ${modularScale(2.5)};
  }

  color: ${variable('Color.Grey.900')};
`;

const ChatPage: Component = () => {
  const [themeMode, setThemeMode] = createSignal('light');
  
  const style = createThemeStyle();

  const onChangeTheme = () => {
    setThemeMode(themeMode() === 'light' ? 'dark' : 'light');
  };

  createEffect(() => {
    if (themeMode() === 'light') setTheme(LightTheme);
    if (themeMode() === 'dark') setTheme(DarkTheme);
  });

  return (
    <div>
      <div className={header}>Test!</div>
      <Button>Hello</Button>
      <Button onClick={onChangeTheme}>change theme</Button>
      <IconButton size={36} icon={VscAccount} />
      <CheckBox>테스트</CheckBox>
      <CheckBox checked size={64}>테스트 size 64</CheckBox>
      <CheckBox disabled>테스트 disabled</CheckBox>
      <CheckBox disabled checked>테스트 disabled checked</CheckBox>
    </div>
  );
};

export default ChatPage;

