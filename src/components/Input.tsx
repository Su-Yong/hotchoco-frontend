import { css } from '@linaria/core';
import { PropsWithChildren, useMemo } from 'react';
import { useTheme } from '../theme';
import className from '../utils/className';
import ColorUtil from '../utils/Color';
import style from '../utils/style';

const inputStyle = css`
  padding: 8px;

  outline: none;
  border: solid 2px;
  border-radius: 8px;

  display: flex;
  flex-flow: column;
  justify-contents: center;
  align-items: center;
`;

export type InputHelp = ((text: string) => string) | string;
export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  icon?: never; // TODO: add left icon
  help?: InputHelp;
  placeholder?: string;
  error?: string;
}

const Input = ({ icon, help, placeholder, children, ...props }: PropsWithChildren<InputProps>): JSX.Element => {
  const theme = useTheme();

  const borderColor = useMemo(() => ColorUtil.alpha(theme.palette.black.main, 0.2), [theme.palette.black.main]);

  return (
    <input
      {...props}
      className={className(inputStyle, props.className)}
      style={style(
        {
          background: theme.palette.backgroundSecondary.main,
          color: theme.palette.backgroundSecondary.contrastText,
          borderColor: borderColor,
        },
        props.style,
      )}
    >
      {children}
    </input>
  );
};

export default Input;
