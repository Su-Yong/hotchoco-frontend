import { css, cx } from '@linaria/core';
import { Component, JSX } from 'solid-js';
import { variable } from '../theme';

const buttonStyle = css`
  outline: none;
  border: none;
  cursor: pointer;

  border-radius: 8px;
  padding: 8px 12px;

  color: ${variable('Color.Grey.900')};
  background: ${variable('Color.Blue.500')};
  box-shadow: 0 4px 8px ${variable('Color.Grey.500')};
  transition: background ${variable('Animation.duration.short')};

  &:hover {
    background: ${variable('Color.Blue.400')};
  }
  &:active {
    background: ${variable('Color.Blue.600')};
  }
`;

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button: Component<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cx(buttonStyle, className)}
    >
      {children}
    </button>
  );
};

export default Button;
