import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { Component, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const buttonStyle = css`
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  z-index: 1;

  user-select: none;
  -webkit-tap-highlight-color: transparent;

  margin: 0;
  padding: 8px 12px;

  background: transparent;
  color: ${variable('Color.BLACK')};

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  &::before {
    content: '';
    position: absolute;
    inset: 2px;

    width: 0;

    box-sizing: border-box;
    z-index: -1;

    background: ${variable('Secondary.Main')};
    box-shadow: 0 0 0 0 ${variable('Secondary.Main')};

    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }

  &:hover {
    color: ${variable('Secondary.Text')};

    &::before {
      width: calc(100% - 4px);
      box-shadow: 0 0 0 0 ${variable('Secondary.Main')};
    }
  }

  &:active {
    color: ${variable('Primary.Text')};

    &::before {
      width: calc(100% - 4px);
      background: ${variable('Primary.Main')};
      box-shadow: 0 0 0 2px ${variable('Primary.Main')};
    }
  }
`;

export interface TextButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  
}

const TextButton: Component<TextButtonProps> = (props) => {
  const [children, leftProps] = splitProps(props, ['children']);

  return (
    <button
      {...leftProps}
      className={cx(buttonStyle, leftProps.className)}
    >
      {children.children}
    </button>
  );
}

export default TextButton;
