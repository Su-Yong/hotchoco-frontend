import { variable } from '@/theme';
import { sx } from '@/utils';
import { autoUpdate, computePosition, flip, offset, Placement, shift, size } from '@floating-ui/dom';
import { css } from '@linaria/core';
import { Component, createEffect, createSignal, createUniqueId, mergeProps, on, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import MenuList, { MenuListProps } from './MenuList';

const menuStyle = css`
  z-index: 1000000;
  
  position: absolute;
  left: var(--x);
  top: var(--y);

  max-width: calc(var(--max-width, 100%) - ${variable('Size.space.medium')} * 2);
  max-height: calc(var(--max-height, 100%) - ${variable('Size.space.medium')} * 2);

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

export interface MenuProps extends MenuListProps {
  open?: boolean;
  placement?: Placement;
  anchor?: Element;
}

const defaultProps: Omit<MenuProps, 'items'> = {
  placement: 'bottom-start',
};

const Menu: Component<MenuProps> = (props) => {
  const [local, leftProps] = splitProps(
    mergeProps({
      ...defaultProps,
      id: createUniqueId(),
    }, props),
    ['open', 'placement', 'anchor'],
  );

  let target: HTMLUListElement | undefined;

  const [playExitAnimation, setPlayExitAnimation] = createSignal(false);
  const [coord, setCoordinate] = createSignal<[number, number] | null>(null);
  const [avaiableSize, setAvailableSize] = createSignal<[number, number] | null>(null);

  let cleanUpdater: (() => void) | null = null;

  const getOrigin = (): [string, string] => {
    if (!local.placement) return ['0%', '0%'];

    let x = '0%';
    let y = '0%';
    const [side, align] = local.placement.split('-');

    if (side === 'left') x = '0%';
    if (side === 'right') x = '100%';
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
          middleware: [
            offset(0),
            shift(),
            flip(),
            size({
              apply({ availableWidth, availableHeight }) {
                setAvailableSize([availableWidth, availableHeight]);
              },
            }),
          ],
        }).then(({ x: coordX, y: coordY }) => {
          setCoordinate([~~coordX, ~~coordY]);
        });
      }, {
        animationFrame: true,
      });
    }
  });

  let isRegistered = false;
  createEffect(on(() => local.open, (isOpen) => {
    if (isRegistered) setPlayExitAnimation(!isOpen);
    else isRegistered = true;
  }));

  return (
    <Portal>
      <MenuList
        {...leftProps}
        ref={target}
        style={sx({
          '--x': `${coord()?.[0] ?? 0}px`,
          '--y': `${coord()?.[1] ?? 0}px`,
          '--max-width': avaiableSize() ? `${avaiableSize()![0]}px` : undefined,
          '--max-height': avaiableSize() ? `${avaiableSize()![1]}px` : undefined,
          '--origin-x': getOrigin()[0],
          '--origin-y': getOrigin()[1],
        }, leftProps.style)}
        classList={{
          ...leftProps.classList,
          [menuStyle]: true,
          [enterAnimation]: local.open,
          [exitAnimation]: playExitAnimation(),
          [ignoreStyle]: !local.open && !playExitAnimation(),
        }}
      />
    </Portal>
  );
}

export default Menu;
