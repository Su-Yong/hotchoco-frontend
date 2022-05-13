import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const buttonStyle = css`
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  z-index: 1;
  user-select: none;

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

    background: ${variable('Color.BLACK')};
    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }

  &:hover {
    color: ${variable('Color.WHITE')};

    &::before {
      width: calc(100% - 4px);
    }
  }

  &:active {
    color: ${variable('Color.WHITE')};

    &::before {
      width: 100%;
      inset: 0;

      background: ${variable('Color.Blue.500')};
    }
  }
`;

export interface TextButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  
}

const TextButton: Component<TextButtonProps> = ({
  children,
  ...props
}) => {
  

  return (
    <button
      {...props}
      className={cx(buttonStyle, props.className)}
    >
      {children}
    </button>
  );
}

export default TextButton;
