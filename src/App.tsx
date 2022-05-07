import { lazy } from 'solid-js';
import { Routes, Route } from 'solid-app-router';

import type { Component } from 'solid-js';
import { createThemeStyle } from './theme';

const ChatPage = lazy(() => import('./pages/ChatPage'));
const PreferencePage = lazy(() => import('./pages/PreferencePage'));

const App: Component = () => {
  const themeStyle = createThemeStyle();

  return (
    <div style={themeStyle()}>
      <Routes>
        <Route path={'/chat'} element={<ChatPage />} />
        <Route path={'/preference'} element={<PreferencePage />} />
      </Routes>
    </div>
  );
};

export default App;
