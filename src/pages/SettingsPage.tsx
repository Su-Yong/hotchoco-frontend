import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import { useTheme } from '@/theme';
import { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { useMemo } from 'react';
import ArrowLeft from '@iconify/icons-mdi/arrow-left';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link, Route, Switch, useLocation } from 'wouter';
import Room from '@/components/chat/Room';

import DisplayIcon from '@iconify/icons-mdi/tv';
import AccountIcon from '@iconify/icons-mdi/account';
import ConnectionIcon from '@iconify/icons-mdi/cloud';
import { Icon } from '@iconify/react';

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

    &[data-in-room='true'] {
      transform: translateX(-5%);
      filter: brightness(50%);
    }
  }

  @media (min-width: 600px) {
    width: 360px;
  }
`;

const panelContainerStyle = css`
  position: relative;

  @media (min-width: 600px) {
    flex: 1;
  }

  @media (max-width: 600px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &[data-in-room='false'] {
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
  gap: 4px;

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

const panelStyle = css`
  flex: 1;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  background: var(--background);
`;

const settings = [
  {
    key: 'display',
    title: '화면',
    icon: DisplayIcon,
  },
  {
    key: 'account',
    title: '계정',
    icon: AccountIcon,
  },
  {
    key: 'connection',
    title: '연결',
    icon: ConnectionIcon,
  },
];

const SettingsPage = (): JSX.Element => {
  const theme = useTheme();

  const [location] = useLocation();
  
  const backgroundColor = useMemo(() => theme.palette.backgroundPrimary.main, [theme]);
  const textCategoryColor = useMemo(() => theme.palette.backgroundSecondary.contrastText, [theme]);
  const backgroundCategoryColor = useMemo(() => theme.palette.backgroundSecondary.main, [theme]);
  const backgroundActiveColor = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.1).get(), [theme]);
  const textSelectColor = useMemo(() => theme.palette.primary.contrastText, [theme]);
  const backgroundSelectColor = useMemo(() => Color(theme.palette.primary.main).get(), [theme]);

  return (
    <div
      className={backdropStyle}
      style={style({
        '--background': backgroundColor,
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
            '--background': backgroundCategoryColor,
          })}
        >
          {
            settings.map(({ key, title, icon }) => {
              const target = `/settings/${key}`;

              return (
                <Link
                  key={key}
                  href={target}
                  className={categoryStyle}
                  data-select={location === target}
                >
                  <Icon icon={icon} />
                  {title}
                </Link>
              )
            })
          }
        </ul>
      </div>
      <TransitionGroup className={panelContainerStyle}>
        <CSSTransition in unmountOnExit key={location} classNames={'room'} timeout={250}>
          <Switch location={location}>
            <Route path={'/settings/test1'}>
              <div>
              test1
              </div>
            </Route>
            <Route path={'/settings/test2'}>
              <div>
                test2
              </div>
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default SettingsPage;
