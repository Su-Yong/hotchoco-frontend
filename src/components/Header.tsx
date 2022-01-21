import { useTheme } from '@/theme';
import ColorUtil, { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import { useMemo } from 'react';
import Typography from './common/Typography';

const containerStyle = css`
  height: 56px;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  flex: 1;
  padding-left: 16px;
  padding-right: 16px;

  user-select: none;

  background: var(--background);
  backdrop-filter: blur(8px);
`;

const textContainerStyle = css`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
`;

const textStyle = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface HeaderProps {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ title, subtitle, left, right }: HeaderProps): JSX.Element => {
  const theme = useTheme();

  const background = useMemo(() => ColorUtil.alpha(theme.palette.backgroundSecondary.main, 0.3), [theme]);
  const active = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.2).alpha(0.5).get(), [theme]);

  return (
    <div
      className={containerStyle}
      style={style({
        '--background': background,
        '--active': active,
      })}
    >
      {left}
      <div className={textContainerStyle}>
        <Typography type={'h5'} className={textStyle}>
          {title}
        </Typography>
        <Typography type={'h6'} className={textStyle}>
          {subtitle}
        </Typography>
      </div>
      {right}
    </div>
  );
};

export default Header;
