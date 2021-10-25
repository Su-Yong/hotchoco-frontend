import { css } from '@linaria/core';
import { HTMLAttributes, HTMLInputTypeAttribute, PropsWithChildren, useMemo } from 'react';
import { useTheme } from '../theme';
import className from '../utils/className';
import ColorUtil from '../utils/Color';
import style from '../utils/style';
import { TypographyProps } from './Typography';

const inputStyle = css`
  padding: 8px;

  outline: none;
  border: solid 2px transparent;
  border-radius: 100px;

  background: var(--background);
  color: var(--color);

  display: flex;
  flex-flow: column;
  justify-contents: center;
  align-items: center;

  transition: border-radius 0.25s, border-color 0.25s;

  &:hover {
    border-color: var(--border-color);
  }

  &:focus {
    border-radius: 4px;
    border-color: var(--border-color);
  }
`;

export type InputHelp = ((text: string) => string) | string;
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  typographyType?: TypographyProps['type'];
  icon?: never; // TODO: add left icon
  help?: InputHelp;
  placeholder?: string;
  error?: string;
}

const Input = ({ typographyType = 'body3', icon, help, placeholder, children, ...props }: PropsWithChildren<InputProps>): JSX.Element => {
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
