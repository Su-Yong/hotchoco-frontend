import { css, cx } from '@linaria/core';
import { Component, JSX, splitProps } from 'solid-js';
import { variable } from '../../theme';

const buttonStyle = css`
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  z-index: 1;

  padding: 8px 12px;

  -webkit-tap-highlight-color: transparent;
  user-select: none;

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
    color: ${variable('Primary.Text')};
    background-color: ${variable('Primary.Main')};
  }
  &:active::before {
    inset: 0;
    color: ${variable('Primary.Text')};
    background-color: ${variable('Primary.Main')};
  }
`;

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button: Component<ButtonProps> = (props) => {
  const [children, leftProps] = splitProps(props, ['children']);

  return (
    <button
      {...leftProps}
      className={cx(buttonStyle, props.className)}
    >
      {children.children}
    </button>
  );
};

export default Button;
