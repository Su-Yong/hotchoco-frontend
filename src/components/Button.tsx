import { css } from '@linaria/core';
import React, { PropsWithChildren, useMemo } from 'react';
import { useTheme } from '../theme';
import className from '../utils/className';
import ColorUtil from '../utils/Color';
import style from '../utils/style';
import { TypographyProps } from './Typography';

const buttonStyle = css`
  outline: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  padding: 8px 12px;

  background: var(--background);
  color: var(--color);

  transition: background 0.25s;

  &:hover {
    background: var(--background-hover);
  }

  &:active {
    background: var(--background-active);
  }
`;

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: TypographyProps['type'];
}

const Button = ({ type = 'body3', children, ...props }: PropsWithChildren<ButtonProps>): JSX.Element => {
  const theme = useTheme();

  const backgroundHover = useMemo(() => ColorUtil.lighten(theme.palette.primary.main, 0.2), [theme.palette]);
  const backgroundActive = useMemo(() => ColorUtil.lighten(theme.palette.primary.main, 0.5), [theme.palette]);
  const typeStyle = useMemo(() => {
    const style = theme.typography[type];

    return {
      fontFamily: style.font,
      fontWeight: style.weight,
      fontSize: style.size,
      lineHeight: style.height,
    };
  }, [type, theme.typography]);

  return (
    <button
      {...props}
      className={className(buttonStyle, props.className)}
      style={style(
        {
          '--background': theme.palette.primary.main,
          '--color': theme.palette.primary.contrastText,
          '--background-hover': backgroundHover,
          '--background-active': backgroundActive,
        },
        typeStyle,
        props.style,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
