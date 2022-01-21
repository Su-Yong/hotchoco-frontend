import { useTheme } from '@/theme';
import ColorUtil, { Color } from '@/utils/Color';
import { Icon, IconProps } from '@iconify/react';
import { css } from '@linaria/core';
import { useMemo } from 'react';
import Typography, { TypographyProps } from './Typography';

const iconStyle = css`
  cursor: pointer;
  border-radius: 300px;

  transition: transform 0.25s, background 0.25s;

  @media (pointer: fine) {
    &:hover {
      transform: translateX(-4px);
    }

    &:active {
      transform: translateX(0) scale(1.25);
    }
  }

  @media (pointer: coarse), (pointer: none) {
    &:active {
      background: var(--active);
    }
  }
`;

const centerStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;

export interface IconButtonProps extends TypographyProps {
  icon: IconProps['icon'];
}

const IconButton = ({ type = 'h4', className, icon, ...props }: IconButtonProps): JSX.Element => {
  const theme = useTheme();

  const active = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.2).alpha(0.5), [theme]);

  return (
    <Typography
      {...props}
      type={type ?? 'h4'}
      className={centerStyle}
    >
      <Icon icon={icon} className={iconStyle} />
    </Typography>
  )
};

export default IconButton;
