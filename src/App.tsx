import { createEffect, lazy } from 'solid-js';
import { Routes, Route } from 'solid-app-router';

import type { Component } from 'solid-js';
import { createThemeStyle, setTheme, variable } from './theme';
import { css } from '@linaria/core';
import createStorageSignal from './hooks/createStorageSignal';
import { LightTheme } from './theme/defined/LightTheme';
import { DarkTheme } from './theme/defined/DarkTheme';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const PreferencePage = lazy(() => import('./pages/PreferencePage'));
const ChatContainer = lazy(() => import('./containers/ChatContainer'));
const ComponentPage = lazy(() => import('./pages/ComponentPage'));

const bodyStyle = css`
  background: ${variable('Color.WHITE')};
  color: ${variable('Color.BLACK')};
  
  transition-property: background, color;
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-funciton: ${variable('Animation.easing.deceleration')};
`;

export const [themeMode, setThemeMode] = createStorageSignal('theme', 'light', { serialize: false });

const App: Component = () => {
  const themeStyle = createThemeStyle();

  createEffect(() => {
    if (themeMode() === 'light') setTheme(LightTheme);
    if (themeMode() === 'dark') setTheme(DarkTheme);
  });

  return (
    <div style={themeStyle()} className={bodyStyle}>
      <Routes>
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/chat'} element={<ChatPage />} />
        <Route path={'/test'} element={<ChatContainer />} />
        <Route path={'/component'} element={<ComponentPage />} />
        <Route path={'/preference'} element={<PreferencePage />} />
      </Routes>
    </div>
  );
};

export default App;
