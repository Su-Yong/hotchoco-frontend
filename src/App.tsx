import React from 'react';

import { css } from '@linaria/core';
import { Route } from 'wouter';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import ThemeList from './theme/ThemeList';
import { ThemeProvider } from './theme';

const bodyStyle = css`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const themeMode = atomWithStorage<keyof typeof ThemeList>('theme', 'light');
const themeObject = atom((get) => ThemeList[get(themeMode)]);

const App = () => {
  const [theme] = useAtom(themeObject);

  return (
    <ThemeProvider theme={theme}>
      <div className={bodyStyle}>
        <Route path={'/login'} component={LoginPage} />
        <Route component={ErrorPage} />
      </div>
    </ThemeProvider>
  );
};

export default App;
