import React, { PropsWithChildren, useMemo } from 'react';

import { css } from '@linaria/core';

import className from '@/utils/className';
import ColorUtil, { Color } from '@/utils/Color';
import style from '@/utils/style';
import { useTheme } from '@/theme';

import { TypographyProps } from './Typography';

const inputStyle = css`
  padding: 8px;

  outline: none;
  border: none;
  border-radius: 12px;

  background: var(--background);
  color: var(--text);

  display: flex;
  flex-flow: column;
  justify-contents: center;
  align-items: center;

  transition: box-shadow 0.25s, border-radius 0.25s;

  &:hover {
    box-shadow: 0 0 0 4px var(--hover-color);
  }

  &:focus {
    box-shadow: 0 0 0 4px var(--hover-color);
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

  const backgroundColor = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.3).alpha(0.5).get(), [theme]);
  const hoverColor = useMemo(() => Color(theme.palette.backgroundSecondary.main).lighten(0.5).alpha(0.5).get(), [theme]);
  const textColor = useMemo(() =>theme.palette.backgroundSecondary.contrastText, [theme]);
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

  return (
    <input
      {...props}
      className={className(inputStyle, props.className)}
      style={style(
        {
          '--border-color': borderColor,
          '--hover-color': hoverColor,
          '--background': backgroundColor,
          '--text': textColor,
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
