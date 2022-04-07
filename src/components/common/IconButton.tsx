import { useTheme } from '@/theme';
import ColorUtil, { Color } from '@/utils/Color';
import style from '@/utils/style';
import { Icon, IconProps } from '@iconify/react';
import { css } from '@linaria/core';
import { useMemo } from 'react';
import Typography, { TypographyProps } from './Typography';

const iconStyle = css`
  cursor: pointer;
`;

const centerStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  border-radius: 300px;
  position: relative;
  cursor: pointer;

  margin: -6px;
  padding: 6px;

  transition: transform 0.25s, background 0.25s;

  @media (pointer: fine) {
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 100%;
      position: absolute;
      z-index: -10;

      background: transparent;
      transform: scale(0);

      transition: background 0.25s, transform 0.25s;
    }
  
    &:hover::before {
      background: var(--hover);
      transform: scale(1);
    }

    &:active::before {
      background: var(--active);
      transform: scale(1.2);
      transition: background 0.25s, transform 0.75s;
    }
  }

  @media (pointer: coarse), (pointer: none) {
    &:active {
      background: var(--active);
    }
  }
`;

export interface IconButtonProps extends TypographyProps {
  icon: IconProps['icon'];
}

const IconButton = ({ type = 'h4', className, icon, ...props }: IconButtonProps): JSX.Element => {
  const theme = useTheme();

  const hover = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.1).alpha(0.5).get(), [theme]);
  const active = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.2).alpha(0.5).get(), [theme]);

  return (
    <Typography
      {...props}
      type={type ?? 'h4'}
      className={centerStyle}
      style={style({
        '--hover': hover,
        '--active': active,
      })}
    >
      <Icon icon={icon} className={iconStyle} />
    </Typography>
  );
};

export default IconButton;
