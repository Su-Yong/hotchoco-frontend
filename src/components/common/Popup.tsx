import { variable } from '@/theme';
import { sx } from '@/utils';
import { css, cx } from '@linaria/core';
import { Component, createEffect, createSignal, mergeProps, on, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import { JSX } from 'solid-js/jsx-runtime';
import { autoUpdate, AutoUpdateOptions, computePosition, flip, Middleware, offset, Placement, shift, size } from '@floating-ui/dom';

const popupStyle = css`
  z-index: 1000000;
  
  position: absolute;
  left: var(--x);
  top: var(--y);

  margin: 0;

  opacity: 1;
  transform: scale(1);

  transition-property: opacity, transform;
  transition-duration: ${variable('Animation.duration.shortest')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const enterAnimation = css`
  transform-origin: var(--origin-x, 50%) var(--origin-y, 50%);

  animation: enter;
  animation-duration: ${variable('Animation.duration.shortest')};
  animation-timing-funciton: ${variable('Animation.easing.deceleration')};
  animation-fill-mode: both;

  @keyframes enter {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
const exitAnimation = css`
  transform-origin: var(--origin-x, 50%) var(--origin-y, 50%);

  animation: exit;
  animation-duration: ${variable('Animation.duration.shortest')};
  animation-timing-funciton: ${variable('Animation.easing.deceleration')};
  animation-fill-mode: both;

  @keyframes exit {
    0% {
      opacity: 1;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`;

const ignoreStyle = css`
  opacity: 0;
  transform: scale(0);
`;
export interface PopupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  placement?: Placement;
  anchor?: Element;
  middleware?: Middleware[];
  updateOptions?: Partial<AutoUpdateOptions>;

  outerStyle?: JSX.HTMLAttributes<HTMLDivElement>['style'];
  outerClassName?: JSX.HTMLAttributes<HTMLDivElement>['className'];
}

const defaultProps: PopupProps = {
  placement: 'bottom-start',
  middleware: [
    offset(),
    shift(),
    flip(),
  ],
  updateOptions: {
    animationFrame: true,
  },
};

const Popup: Component<PopupProps> = (props) => {
  const [local, leftProps] = splitProps(
    mergeProps(defaultProps, props),
    ['open', 'placement', 'middleware', 'updateOptions', 'anchor', 'children'],
  );

  let target: HTMLDivElement | undefined;

  const [playExitAnimation, setPlayExitAnimation] = createSignal(false);
  const [coord, setCoordinate] = createSignal<[number, number] | null>(null);

  let cleanUpdater: (() => void) | null = null;

  const getOrigin = (): [string, string] => {
    if (!local.placement) return ['0%', '0%'];

    let x = '50%';
    let y = '50%';
    const [side, align] = local.placement.split('-');

    if (side === 'left') x = '100%';
    if (side === 'right') x = '0%';
    if (side === 'top') y = '100%';
    if (side === 'bottom') y = '0%';

    if (align === 'start') {
      if (side === 'left' || side === 'right') y = '100%';
      if (side === 'top' || side === 'bottom') x = '0%';
    }
    if (align === 'end') {
      if (side === 'left' || side === 'right') y = '0%';
      if (side === 'top' || side === 'bottom') x = '100%';
    }

    return [x, y];
  };

  createEffect(() => {
    if (local.anchor && target) {
      if (cleanUpdater) cleanUpdater();

      cleanUpdater = autoUpdate(local.anchor, target, () => {
        if (!local.anchor || !target) return;
        
        computePosition(local.anchor, target, {
          placement: local.placement,
          middleware: local.middleware,
        }).then(({ x: coordX, y: coordY }) => {
          setCoordinate([~~coordX, ~~coordY]);
        });
      }, local.updateOptions);
    }
  });

  let isRegistered = false;
  createEffect(on(() => local.open, (isOpen) => {
    if (isRegistered) setPlayExitAnimation(!isOpen);
    else isRegistered = true;
  }));

  return (
    <Portal>
      <div
        {...leftProps}
        ref={target}
        style={sx({
          '--x': `${coord()?.[0] ?? 0}px`,
          '--y': `${coord()?.[1] ?? 0}px`,
          '--origin-x': getOrigin()[0],
          '--origin-y': getOrigin()[1],
        }, leftProps.style)}
        classList={{
          ...leftProps.classList,
          [popupStyle]: true,
          [enterAnimation]: local.open,
          [exitAnimation]: playExitAnimation(),
          [ignoreStyle]: !local.open && !playExitAnimation(),
        }}
      >
        {local.children}
      </div>
    </Portal>
  );
}

export default Popup;
