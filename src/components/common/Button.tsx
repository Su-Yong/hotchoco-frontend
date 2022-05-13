import { css, cx } from '@linaria/core';
import { Component, JSX } from 'solid-js';
import { variable } from '../../theme';

const buttonStyle = css`
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  z-index: 1;

  padding: 8px 12px;

  color: ${variable('Color.WHITE')};
  background: transparent;
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  &::before {
    content: '';
    position: absolute;
    inset: 2px;
    z-index: -1;

    background-color: ${variable('Color.BLACK')};

    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }

  &:hover::before {
    background-color: ${variable('Color.Blue.500')};
  }
  &:active::before {
    inset: 0;
    background-color: ${variable('Color.Blue.500')};
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
