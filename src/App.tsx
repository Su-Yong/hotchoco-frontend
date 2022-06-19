import { createEffect, lazy } from 'solid-js';
import { Routes, Route, Navigate } from 'solid-app-router';

import type { Component } from 'solid-js';
import { createThemeStyle, setTheme, variable } from './theme';
import { css } from '@linaria/core';
import { LightTheme } from './theme/defined/LightTheme';
import { DarkTheme } from './theme/defined/DarkTheme';
import { mainColor, themeMode } from './store/display';
import { Transition } from 'solid-transition-group';
import ChatContainer from './containers/ChatContainer';
import ChatPage from './pages/ChatPage';
import ComponentPage from './pages/ComponentPage';
import LoginPage from './pages/LoginPage';
import PreferencePage from './pages/PreferencePage';
import { ROOT_ID } from './constants/common';
import { createUserColorStyle, setUserColor } from './theme/UserColor';
import { DefaultUserColor } from './theme/defined/DefaultUserColor';
import MainPage from './pages/MainPage';

const bodyStyle = css`
  position: relative;
  
  overflow: hidden;

  background: ${variable('Color.WHITE')};
  color: ${variable('Color.BLACK')};
  
  transition-property: background, color;
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-funciton: ${variable('Animation.easing.deceleration')};

  & > * {
    position: absolute;
    inset: 0;
  }
`;

const enterStart = css`
  opacity: 0;
  transform: translateY(10%);
`;

const enterEnd = css`
  opacity: 1;
  transform: translateY(0%);

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.in')};
  `;

const exitStart = css`
  opacity: 1;
  transform: translateY(0%);
`;

const exitEnd = css`
  opacity: 0;
  transform: translateY(10%);

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.out')};
  `;

const App: Component = () => {
  const themeStyle = createThemeStyle();
  const userColorStyle = createUserColorStyle();

  createEffect(() => {
    if (themeMode() === 'light') setTheme(LightTheme);
    if (themeMode() === 'dark') setTheme(DarkTheme);
  });

  createEffect(() => {
    setUserColor({
      ...DefaultUserColor,
      Primary: {
        ...DefaultUserColor.Primary,
        Main: `var(${mainColor()})`,
      },
    });
  });

  createEffect(() => {
    let bodyStyle = '';

    const variableList = [
      ...Object.entries(themeStyle()),
      ...Object.entries(userColorStyle()),
    ];
    
    variableList.forEach(([key, value]) => {
      bodyStyle += `${key}: ${value};\n`;
    });

    document.body.setAttribute('style', bodyStyle);
  });

  return (
    <div id={ROOT_ID} className={bodyStyle}>
      <Transition
        enterClass={enterStart}
        enterToClass={enterEnd}
        exitClass={exitStart}
        exitToClass={exitEnd}
      >
        <Routes>
          <Route path={'/login/*'} element={<LoginPage />} />
          <Route path={'/*'} element={<MainPage />} />
        </Routes>  
      </Transition>
    </div>
  );
};

export default App;
