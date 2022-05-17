import { Theme, variable } from '@/theme';
import { Leaves } from '@/utils';
import { css, cx } from '@linaria/core';
import { Component } from 'solid-js';
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

  overlayColor?: Leaves<Theme>;
  overlayScale?: number;
  overlayOpacity?: number;
}

const Hoverable: Component<HoverableProps> = ({
  borderless = true,
  overlayColor = 'Color.Grey.500',
  overlayScale = borderless ? 1 : Math.sqrt(2),
  overlayOpacity = 0.3,
  className,
  children,
  ...props
}) => {
  

  return (
    <div
      {...props}
      className={cx(iconButtonWrapperStyle, className)}
      style={{
        '--border-radius': borderless ? '0' : '50%',
        '--overlay-scale': overlayScale,
        '--overlay-opacity': overlayOpacity,
        '--overlay-color': variable(overlayColor),
      }}
    >
      <div className={overlayStyle} />
      {children}
    </div>
  );
}

export default Hoverable;
