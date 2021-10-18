import React from 'react';

import { css } from '@linaria/core';
import { Route } from 'wouter';

import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import { ThemeProvider } from './theme';

const bodyStyle = css`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <ThemeProvider>
      <div className={bodyStyle}>
        <Route path={'/login'} component={LoginPage} />
        <Route component={ErrorPage} />
      </div>
    </ThemeProvider>
  );
};

export default App;
