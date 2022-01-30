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

const backdropStyle = css`
  width: 100%;
  height: 100%;

  background: var(--background);

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
  color: var(--color);
  background: var(--background);

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

const panelStyle = css`
  width: 100%;

  border-radius: 4px;
  padding: 16px;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  background: var(--background);
  box-sizing: border-box;

  & > div.title {
    flex: 1;
  }
`;

const SettingsPage = (): JSX.Element => {
  const theme = useTheme();

  const [location] = useLocation();
  
  const backdropColor = useMemo(() => theme.palette.backgroundPrimary.main, [theme]);
  const textCategoryColor = useMemo(() => theme.palette.backgroundSecondary.contrastText, [theme]);
  const backgroundColor = useMemo(() => theme.palette.backgroundSecondary.main, [theme]);
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
        '--background': backdropColor,
        '--background-active': backgroundActiveColor,
        '--background-select': backgroundSelectColor,
      })}
    >
      <div className={categoryContainerStyle}>
        <div className={headerWrapperStyle}>
          <Header
            title={'설정'}
            left={<IconButton icon={ArrowLeft} />}
          />
        </div>
        <ul
          className={categoryGroupStyle}
          style={style({
            '--color': textCategoryColor,
            '--color-select': textSelectColor,
            '--background': backgroundColor,
          })}
        >
          {settings.map(({ key, title, icon }) => {
            const target = `/settings/${key}`;

            return (
              <Link
                key={key}
                href={target}
                className={categoryStyle}
                data-select={location === target}
              >
                { icon && <Icon icon={icon} />}
                {title}
              </Link>
            )
          })}
        </ul>
      </div>
      <TransitionGroup className={panelContainerStyle} data-in-settings={location === '/settings'}>
        <CSSTransition in unmountOnExit key={location} classNames={'room'} timeout={250}>
          <Switch location={location}>
            {settings.map((it) => {
              const target = `/settings/${it.key}`;

              return (
                <Route key={it.key} path={target}>
                  <div className={panelWrapperStyle}>
                    <div className={headerWrapperStyle}>
                      <Header title={it.title} left={<IconButton icon={CloseIcon} onClick={onBack} />} />
                    </div>
                    <div className={panelGroupStyle}>
                      {it.map((setting) => {
                        return (
                          <div key={setting.key} className={panelStyle} style={style({
                            '--background': backgroundColor,
                          })}>
                            {setting.icon && <Icon icon={setting.icon} />}
                            <div className={'title'}>{setting.title}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Route>
              );
            })}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default SettingsPage;
