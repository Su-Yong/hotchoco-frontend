import { Theme, variable } from '@/theme';
import { UserColor } from '@/theme/UserColor';
import { Leaves } from '@/utils';
import { css, cx } from '@linaria/core';
import { Component, mergeProps, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const iconButtonWrapperStyle = css`
  position: relative;
  aspect-ratio: 1;
  width: fit-content;

  padding: 8px;
  cursor: pointer;
  overflow: hidden;

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

  background: var(--overlay-color, ${variable('Color.Grey.500')});
  border-radius: 50%;

  opacity: 0;
  transform: scale(0);
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  div:hover > & {
    opacity: var(--overlay-opacity, 0.3);
    transform: scale(var(--overlay-scale, 1));
  }

  div:active > & {
    opacity: calc(var(--overlay-opacity, 0.3) + 0.2);
    transform: scale(calc(var(--overlay-scale, 1) + 0.2));
  }
`;

export interface HoverableProps extends JSX.HTMLAttributes<HTMLDivElement> {
  borderless?: boolean;

  overlayColor?: Leaves<Theme | UserColor>;
  overlayScale?: number;
  overlayOpacity?: number;
}

const defaultProps = {
  borderless: true,
  overlayColor: 'Color.Grey.500',
  overlayOpacity: 0.3, 
} as const;

const Hoverable: Component<HoverableProps> = (props) => {
  const [local, children, leftProps] = splitProps(mergeProps({
    ...defaultProps,
    overlayScale: props.borderless ? 1 : Math.sqrt(2),
  }, props), [
    'className',
    'borderless',
    'overlayColor',
    'overlayScale',
    'overlayOpacity',
  ], ['children']);

  return (
    <div
      {...leftProps}
      className={cx(iconButtonWrapperStyle, local.className)}
      style={{
        '--border-radius': local.borderless ? '0' : '50%',
        '--overlay-scale': local.overlayScale ?? (local.borderless ? Math.sqrt(2) : 1),
        '--overlay-opacity': local.overlayOpacity,
        '--overlay-color': variable(local.overlayColor),
      }}
    >
      <div className={overlayStyle} />
      {children.children}
    </div>
  );
}

export default Hoverable;
