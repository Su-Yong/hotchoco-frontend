import React from 'react';

import { css } from '@linaria/core';
import { Route, useLocation, Switch } from 'wouter';
import { useAtom } from 'jotai';

import LoginPage from '@/pages/LoginPage';
import ErrorPage from '@/pages/ErrorPage';
import TestPage from '@/pages/TestPage';
import ChatPage from '@/pages/ChatPage';
import SettingsPage from '@/pages/SettingsPage';
import { ThemeProvider } from '@/theme';
import { themeObject } from '@/store/theme';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const bodyStyle = css`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const absoluteStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const App = () => {
  const [theme] = useAtom(themeObject);
  const [location] = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <TransitionGroup className={bodyStyle}>
        <CSSTransition in unmountOnExit key={location.split('/')[1]} classNames={'page'} timeout={250}>
          <Switch location={location}>
            <Route path={'/login'}>
              <div className={absoluteStyle}>
                <LoginPage />
              </div>
            </Route>
            <Route path={'/chat/:rest*'}>
              <div className={absoluteStyle}>
                <ChatPage />
              </div>
            </Route>
            <Route path={'/test'}>
              <div className={absoluteStyle}>
                <TestPage />
              </div>
            </Route>
            <Route path={'/settings/:rest*'}>
              <div className={absoluteStyle}>
                <SettingsPage />
              </div>
            </Route>
            <Route>
              <div className={absoluteStyle}>
                <ErrorPage />
              </div>
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </ThemeProvider>
  );
};

export default App;
