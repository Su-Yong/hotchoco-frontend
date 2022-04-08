import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import { useTheme } from '@/theme';
import { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { useCallback, useMemo } from 'react';
import ArrowLeft from '@iconify/icons-mdi/arrow-left';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link, Route, Switch, useLocation } from 'wouter';

import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-mdi/close';
import settings from '@/constants/settings';
import DisplaySettingsContainer from '@/containers/settings/DisplaySettingsContainer';
import InfoSettingsContainer from '@/containers/settings/InfoSettingsContainer';
import AccountSettingsContainer from '@/containers/settings/AccountSettingsContainer';
import ConnectSettingsContainer from '@/containers/settings/ConnectSettingsContainer';

const backdropStyle = css`
  width: 100%;
  height: 100%;

  background: var(--th-backgroundPrimary-main);

  display: flex;
  flex-flow: rows;
  justify-content: center;
  align-items: center;
`;

const categoryContainerStyle = css`
  height: 100%;
  background: var(--background);

  position: relative;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  transition: transform 0.25s, filter 0.25s;

  @media (max-width: 600px) {
    flex: 1;
  }

  @media (min-width: 600px) {
    width: 360px;
  }
`;

const panelContainerStyle = css`
  position: relative;
  height: 100%;

  @media (min-width: 600px) {
    flex: 1;
  }

  @media (max-width: 600px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &[data-in-settings='true'] {
      pointer-events: none;
    }
  }
`;

const headerWrapperStyle = css`
  width: 100%;
`;

const categoryGroupStyle = css`
  width: 100%;
  padding: 8px;
  margin: 0;

  flex: 1;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;

  box-sizing: border-box;
`;

const categoryStyle = css`
  width: 100%;
  color: var(--th-backgroundSecondary-contrastText);
  background: var(--th-backgroundSecondary-main);

  border-radius: 4px;
  padding: 16px;
  position: relative;

  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 8px;

  list-style: none;
  box-sizing: border-box;
  text-decoration: none;

  transition: all 0.1s;

  &:hover {
    background: var(--background-active);
  }
  &:active {
    box-shadow: var(--background-select) 0 0 0 4px inset;
  }

  &[data-select='true'] {
    color: var(--color-select);
    background: var(--background-select);
    border-radius: 40px;
  }
`;

const panelWrapperStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: var(--th-backgroundPrimary-main);

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const panelGroupStyle = css`
  width: 100%;
  padding: 8px;
  margin: 0;

  flex: 1;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;

  box-sizing: border-box;
`;

const SettingsPage = (): JSX.Element => {
  const theme = useTheme();

  const [location] = useLocation();

  const backgroundActiveColor = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.1).get(), [theme]);
  const textSelectColor = useMemo(() => theme.palette.primary.contrastText, [theme]);
  const backgroundSelectColor = useMemo(() => Color(theme.palette.primary.main).get(), [theme]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div
      className={backdropStyle}
      style={style({
        '--background-active': backgroundActiveColor,
        '--background-select': backgroundSelectColor,
      })}
    >
      <div className={categoryContainerStyle}>
        <div className={headerWrapperStyle}>
          <Header title={'설정'} left={<IconButton icon={ArrowLeft} onClick={onBack} />} />
        </div>
        <ul
          className={categoryGroupStyle}
          style={style({
            '--color-select': textSelectColor,
          })}
        >
          {settings.map(({ key, title, icon }) => (
            <Link
              key={key}
              replace={location !== '/settings'}
              href={`/settings/${key}`}
              className={categoryStyle}
              data-select={location === `/settings/${key}`}
            >
              {icon && <Icon icon={icon} />}
              {title}
            </Link>
          ))}
        </ul>
      </div>
      <TransitionGroup className={panelContainerStyle} data-in-settings={location === '/settings'}>
        <CSSTransition in unmountOnExit key={location} classNames={'left-in'} timeout={250}>
          <Switch location={location}>
            {settings.map(({ key, title }) => (
              <Route key={key} path={`/settings/${key}`}>
                <div className={panelWrapperStyle}>
                  <div className={headerWrapperStyle}>
                    <Header title={title} left={<IconButton icon={CloseIcon} onClick={onBack} />} />
                  </div>
                  <div className={panelGroupStyle}>
                    {
                      key === 'display' ? <DisplaySettingsContainer /> :
                      key === 'info' ? <InfoSettingsContainer /> : 
                      key === 'account' ? <AccountSettingsContainer /> :
                      key === 'connection' ? <ConnectSettingsContainer /> : null
                    }
                  </div>
                </div>
              </Route>
            ))}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default SettingsPage;
