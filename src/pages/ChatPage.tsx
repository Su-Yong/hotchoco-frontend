import { createEffect, createSignal } from 'solid-js';

import type { Component } from 'solid-js';
import { css } from '@linaria/core';
import { modularScale, hiDPI } from 'polished';
import Button from '../components/Button';
import { createThemeStyle, setTheme, variable } from '../theme';
import { LightTheme } from '../theme/defined/LightTheme';
import { DarkTheme } from '../theme/defined/DarkTheme';

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
    <div style={style()}>
      <div className={header}>Test!</div>
      <Button>Hello</Button>
      <Button onClick={onChangeTheme}>change theme</Button>
    </div>
  );
};

export default ChatPage;
