import React from 'react';

import { css } from '@linaria/core';
import { Redirect, Route, Switch } from 'wouter';
import { useAtom } from 'jotai';

import LoginPage from '@/pages/LoginPage';
import ErrorPage from '@/pages/ErrorPage';
import TestPage from '@/pages/TestPage';
import { ThemeProvider } from '@/theme';
import { themeObject } from '@/store/theme';
import { session as sessionObject } from '@/store/login';
import ChatPage from './pages/ChatPage';

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
  const [session] = useAtom(sessionObject);

  return (
    <ThemeProvider theme={theme}>
      <div className={bodyStyle}>
        <Switch>
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/chat'} component={ChatPage} />
          <Route path={'/test'} component={TestPage} />
          <Route path={'/error'} component={ErrorPage} />
          <Route>
            {
              session
                ? <Redirect to={'/chat'} />
                : <Redirect to={'/login'} />
            }
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
