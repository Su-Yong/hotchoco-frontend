import { lazy } from 'solid-js';
import { Routes, Route } from 'solid-app-router';

import type { Component } from 'solid-js';
import { createThemeStyle, variable } from './theme';
import { css } from '@linaria/core';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const PreferencePage = lazy(() => import('./pages/PreferencePage'));

const bodyStyle = css`
  background: ${variable('Color.WHITE')};
  color: ${variable('Color.BLACK')};
`;

const App: Component = () => {
  const themeStyle = createThemeStyle();

  return (
    <div style={themeStyle()} className={bodyStyle}>
      <Routes>
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/chat'} element={<ChatPage />} />
        <Route path={'/preference'} element={<PreferencePage />} />
      </Routes>
    </div>
  );
};

export default App;
