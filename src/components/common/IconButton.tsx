import { Component, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { css, cx } from '@linaria/core';

import { Theme, variable } from '../../theme';
import Icon, { IconProps } from './Icon';
import { Leaves } from '@/utils';

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

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
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
  icon: string;
}

const IconButton: Component<IconButtonProps> = (props) => {
  const [local, listeners, leftProps] = splitProps(props, [  
    'icon',
    'size',
    'color',
    'title',
    'style',
    'className',
    'outerClassName',
    'outerStyle',
    'ref',
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
      ref={local.ref}
      style={local.outerStyle}
      className={cx(iconButtonWrapperStyle, local.outerClassName)}
      {...(listeners as JSX.HTMLAttributes<HTMLDivElement>)}
    >
      <div className={overlayStyle} />
      <Icon
        size={local.size}
        title={local.title}
        style={local.style}
        className={cx(iconStyle, local.className)}
        icon={local.icon}
        {...leftProps}
      />
    </div>
  );
};

export default IconButton;
