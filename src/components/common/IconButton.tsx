import { Component, splitProps } from 'solid-js';
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

const IconButton: Component<IconButtonProps> = (props) => {
  const [local, listeners, leftProps] = splitProps(props, [  
    'icon',
    'size',
    'color',
    'title',
    'style',
    'viewBox',
    'className',
    'outerClassName',
    'outerStyle',
  ], [
    'onclick',
    'onClick',
    'ondblclick',
    'onDblClick',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseDown',
    'onMouseUp',
    'onPointerDown',
    'onPointerUp',
    'onPointerCancel',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerMove',
    'onPointerOver',
    'onPointerOut',
  ]);

  return (
    <div
      style={local.outerStyle}
      className={cx(iconButtonWrapperStyle, local.outerClassName)}
      {...(listeners as JSX.HTMLAttributes<HTMLDivElement>)}
    >
      <div className={overlayStyle} />
      <local.icon
        size={local.size}
        color={local.color}
        title={local.title}
        style={local.style}
        viewBox={local.viewBox}
        className={cx(iconStyle, local.className)}
        {...leftProps}
      />
    </div>
  );
};

export default IconButton;
