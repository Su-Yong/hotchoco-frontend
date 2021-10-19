import { css } from '@linaria/core';
import { PropsWithChildren } from 'react';
import { useTheme } from '../theme';
import className from '../utils/className';
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

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}

const Input = ({ children, ...props }: PropsWithChildren<InputProps>): JSX.Element => {
  const theme = useTheme();

  return (
    <input
      {...props}
      className={className(inputStyle, props.className)}
      style={style(
        {
          background: theme.palette.backgroundPrimary.main,
          color: theme.palette.backgroundPrimary.contrastText,
          borderColor: theme.palette.backgroundSecondary.main,
        },
        props.style,
      )}
    >
      {children}
    </input>
  );
};

export default Input;
