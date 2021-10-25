import React from 'react';

import { css } from '@linaria/core';
import { Route } from 'wouter';
import { useAtom } from 'jotai';

import LoginPage from '@/pages/LoginPage';
import ErrorPage from '@/pages/ErrorPage';
import TestPage from '@/pages/TestPage';
import { ThemeProvider } from '@/theme';
import { themeObject } from '@/store/theme';

const bodyStyle = css`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [theme] = useAtom(themeObject);

  return (
    <ThemeProvider theme={theme}>
      <div className={bodyStyle}>
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/test'} component={TestPage} />
        <Route component={ErrorPage} />
      </div>
    </ThemeProvider>
  );
};

export default App;
