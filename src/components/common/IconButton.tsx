import { Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { IconProps, IconTypes } from 'solid-icons';
import { css, cx } from '@linaria/core';

import { variable } from '../../theme';

const iconButtonWrapperStyle = css`
  position: relative;
  aspect-ratio: 1;
  width: fit-content;

  padding: 8px;
  cursor: pointer;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  -webkit-tap-highlight-color: transparent;
  user-select: none;
`;

const overlayStyle = css`
  position: absolute;
  inset: 0;
  aspect-ratio: 1;
  z-index: 0;

  background: ${variable('Color.Grey.500')};
  border-radius: 50%;

  opacity: 0;
  transform: scale(0);
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  div:hover > & {
    opacity: 0.25;
    transform: scale(1);
  }

  div:active > & {
    opacity: 0.5;
    transform: scale(1.2);
  }
`;

const iconStyle = css`
  position: relative;
  z-index: 1;
`;

export interface IconButtonProps extends IconProps {
  outerClassName?: string;
  outerStyle?: JSX.HTMLAttributes<HTMLDivElement>['style'];
  children?: never;
  icon: IconTypes;
}

const IconButton: Component<IconButtonProps> = ({
  icon: Icon,
  size,
  color,
  title,
  style,
  viewBox,
  className,
  outerClassName,
  outerStyle,
  ...props
}) => {
  return (
    <div
      style={outerStyle}
      className={cx(iconButtonWrapperStyle, outerClassName)}
    >
      <div className={overlayStyle} />
      <Icon
        size={size}
        color={color}
        title={title}
        style={style}
        viewBox={viewBox}
        className={cx(iconStyle, className)}
        {...props}
      />
    </div>
  );
};

export default IconButton;
