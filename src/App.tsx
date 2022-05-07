import { lazy } from 'solid-js';
import { Routes, Route } from 'solid-app-router';

import type { Component } from 'solid-js';

const ChatPage = lazy(() => import('./pages/ChatPage'));

const App: Component = () => (
  <Routes>
    <Route path={'/chat'} element={<ChatPage />} />
  </Routes>
);

export default App;
