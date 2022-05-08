import { Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import Color from 'color';
import { IconProps, IconTypes } from 'solid-icons';
import { css, cx } from '@linaria/core';

import { getTheme, variable } from '../../theme';
import { sx } from '@/utils';

const iconButtonWrapperStyle = css`
  position: relative;
  aspect-ratio: 1;
  width: fit-content;

  padding: 8px;
  cursor: pointer;
`;

const overlayStyle = css`
  position: absolute;
  inset: 0;
  aspect-ratio: 1;
  z-index: -1;

  background: var(--overlay-color);
  border-radius: 50%;

  opacity: 0;
  transform: scale(0);
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  div:hover > & {
    opacity: 1;
    transform: scale(1);
  }

  div:active > & {
    opacity: 1;
    transform: scale(1.2);
  }
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
}) => {
  const overlayColor = Color(getTheme().Color.Grey[500]).fade(0.5);

  return (
    <div
      style={sx({'--overlay-color': overlayColor}, outerStyle)}
      className={cx(iconButtonWrapperStyle, outerClassName)}
    >
      <div className={overlayStyle} />
      <Icon
        size={size}
        color={color}
        title={title}
        style={style}
        viewBox={viewBox}
        className={className}
      />
    </div>
  );
};

export default IconButton;
