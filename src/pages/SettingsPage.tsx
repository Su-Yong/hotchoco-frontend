import { useTheme } from '@/theme';
import { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { useMemo } from 'react';

const backdropStyle = css`
  width: 100%;
  height: 100%;

  background: var(--background);
  backdrop-filter: blur(4px);

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const panelStyle = css`
  width: 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  background: var(--background);

  @media (min-width: 600px) {
    width: 420px;
    max-width: 60%;
  }
`;

const SettingsPage = (): JSX.Element => {
  const theme = useTheme();
  
  const backdropColor = useMemo(() => Color(theme.palette.black.main).alpha(0.5).get(), [theme]);
  const backgroundColor = useMemo(() => theme.palette.backgroundPrimary.main, [theme]);

  return (
    <div
      className={backdropStyle}
      style={style({
        '--background': backdropColor,
      })}
    >
      <div
        className={panelStyle}
        style={style({
          '--background': backgroundColor,
        })}
      >
        <div>test1</div>
        <div>test2</div>
        <div>test3</div>
      </div>
    </div>
  );
};

export default SettingsPage;
