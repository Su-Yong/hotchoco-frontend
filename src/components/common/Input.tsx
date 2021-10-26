import React, { PropsWithChildren, useMemo } from 'react';

import { css } from '@linaria/core';

import className from '@/utils/className';
import ColorUtil from '@/utils/Color';
import style from '@/utils/style';
import { useTheme } from '@/theme';

import { TypographyProps } from './Typography';

const inputStyle = css`
  padding: 8px;

  outline: none;
  border: none;
  border-radius: 100px;

  background: var(--background);
  color: var(--color);

  display: flex;
  flex-flow: column;
  justify-contents: center;
  align-items: center;

  transition: box-shadow 0.25s, border-radius 0.25s;

  &:hover {
    border-radius: 4px;
  }

  &:focus {
    border-radius: 4px;
    box-shadow: inset -2px -2px 12px rgba(255, 255, 255, 1), inset 2px 2px 12px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: var(--border-color);
  }
`;

export type InputHelp = ((text: string) => string) | string;
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  typographyType?: TypographyProps['type'];
  icon?: never; // TODO: add left icon
  help?: InputHelp;
  error?: string;
}

const Input = ({ typographyType = 'body3', icon, help, children, ...props }: PropsWithChildren<InputProps>): JSX.Element => {
  const theme = useTheme();

  const borderColor = useMemo(() => ColorUtil.alpha(theme.palette.black.main, 0.2), [theme.palette.black.main]);
  const typeStyle = useMemo(() => {
    const style = theme.typography[typographyType];

    return {
      fontFamily: style.font,
      fontWeight: style.weight,
      fontSize: style.size,
      lineHeight: style.height,
    };
  }, [typographyType, theme.typography]);

  console.log(props);

  return (
    <input
      {...props}
      className={className(inputStyle, props.className)}
      style={style(
        {
          '--background': theme.palette.backgroundSecondary.main,
          '--color': theme.palette.backgroundSecondary.contrastText,
          '--border-color': borderColor,
        },
        typeStyle,
        props.style,
      )}
    >
      {children}
    </input>
  );
};

export default Input;
