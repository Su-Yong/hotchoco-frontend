import React from 'react';

import { css } from '@linaria/core';
import { Route } from 'wouter';

import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

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
    <div className={bodyStyle}>
      <Route path={'/login'} component={LoginPage} />
      <Route component={ErrorPage} />
    </div>
  );
}

export default App;
