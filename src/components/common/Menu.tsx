import { variable } from '@/theme';
import { sx } from '@/utils';
import { css, cx } from '@linaria/core';
import { Component, createEffect, createSignal, createUniqueId, mergeProps, onCleanup, onMount, Show, splitProps } from 'solid-js';
import { Transition } from 'solid-transition-group';
import MenuList, { MenuItem, MenuListProps } from './MenuList';

const menuStyle = css`
  position: absolute;
  left: var(--menu-x);
  top: var(--menu-y);

  z-index: 100;
`;

const enterStart = css`
  opacity: 0;
  transform: scale(0);
  transform-origin: var(--origin-x) var(--origin-y);
`;
const enterEnd = css`
  opacity: 1;
  transform: scale(1);
  transform-origin: var(--origin-x) var(--origin-y);

  transition-duration: ${variable('Animation.duration.shortest')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const exitStart = css`
  opacity: 1;
  transform: scale(1);
  transform-origin: var(--origin-x) var(--origin-y);
`;
const exitEnd = css`
  opacity: 0;
  transform: scale(0);
  transform-origin: var(--origin-x) var(--origin-y);

  transition-duration: ${variable('Animation.duration.shortest')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const invisibleStyle = css`
  visibility: collapse;
  overflow: hidden;
`;

type Origin = {
  vertical?: 'top' | 'center' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}
export interface MenuProps extends MenuListProps {
  open?: boolean;
  origin?: Origin;
  menuOrigin?: Origin;
  anchor?: Element;
}

const defaultProps: Omit<MenuProps, 'items'> = {
  origin: {
    horizontal: 'left',
    vertical: 'bottom',
  },
  menuOrigin: {
    horizontal: 'left',
    vertical: 'top',
  },
};

const Menu: Component<MenuProps> = (props) => {
  const [local, leftProps] = splitProps(
    mergeProps({
      ...defaultProps,
      id: createUniqueId(),
    }, props),
    ['open', 'origin', 'menuOrigin', 'anchor'],
  );

  const [coord, setCoord] = createSignal<[number, number]>([0, 0]);
  const [localSize, setLocalSize] = createSignal<[number, number] | null>(null);

  const calculateCoordinate = () => {
    const anchorRect = local.anchor?.getBoundingClientRect();
    const localRect = localSize();

    if (anchorRect && localRect) {
      let horizontalOffset = 0;
      let verticalOffset = 0;
      let localHorizontalOffset = 0;
      let localVerticalOffset = 0;

      if (local.menuOrigin?.horizontal === 'left') localHorizontalOffset += 0;
      if (local.menuOrigin?.horizontal === 'center') localHorizontalOffset -= localRect[0] / 2;
      if (local.menuOrigin?.horizontal === 'right') localHorizontalOffset -= localRect[0];
      if (local.menuOrigin?.vertical === 'top') localVerticalOffset -= 0;
      if (local.menuOrigin?.vertical === 'center') localVerticalOffset -= localRect[1] / 2;
      if (local.menuOrigin?.vertical === 'bottom') localVerticalOffset -= localRect[1];

      if (local.origin?.horizontal === 'left') horizontalOffset += 0;
      if (local.origin?.horizontal === 'center') horizontalOffset += anchorRect.width / 2;
      if (local.origin?.horizontal === 'right') horizontalOffset += anchorRect.width;
      if (local.origin?.vertical === 'top') verticalOffset += 0;
      if (local.origin?.vertical === 'center') verticalOffset += anchorRect.height / 2;
      if (local.origin?.vertical === 'bottom') verticalOffset += anchorRect.height;

      setCoord([
        anchorRect.left + horizontalOffset + localHorizontalOffset,
        anchorRect.top + verticalOffset + localVerticalOffset,
      ]);
    }
  };

  const getOriginX = () => {
    if (local.menuOrigin?.horizontal === 'left') return '0%';
    if (local.menuOrigin?.horizontal === 'center') return '50%';
    if (local.menuOrigin?.horizontal === 'right') return '100%';
  };
  
  const getOriginY = () => {
    if (local.menuOrigin?.vertical === 'top') return '0%';
    if (local.menuOrigin?.vertical === 'center') return '50%';
    if (local.menuOrigin?.vertical === 'bottom') return '100%';
  };

  let menuRef: Element | undefined;
  const onLoad = (ref: Element) => {
    menuRef = ref;
    
    const { width, height } = ref.getBoundingClientRect();

    if (width && height) setLocalSize([width, height]);
  };

  const mutationObserverConfig = {
    attributes: true,
    childList: false,
    characterData: true,
  };
  const menuMutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.target.isSameNode(menuRef ?? null)) {
        onLoad(menuRef!);

        calculateCoordinate();
      }
    }
  });
  const anchorMutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.target.isSameNode(local.anchor ?? null)) {
        calculateCoordinate();
      }
    }
  });

  onMount(() => {
    if (menuRef) {
      onLoad(menuRef);
      menuMutationObserver.observe(menuRef, mutationObserverConfig);
    }
  });

  createEffect(calculateCoordinate);

  createEffect<Element | undefined>((prevAnchor) => {
    if (local.anchor) {
      if (prevAnchor) anchorMutationObserver.disconnect();

      anchorMutationObserver.observe(local.anchor, mutationObserverConfig);
    }

    return local.anchor;
  }, undefined);

  onCleanup(() => {
    anchorMutationObserver.disconnect();
    menuMutationObserver.disconnect();
  });

  return (
    <Transition
      enterClass={enterStart}
      enterToClass={enterEnd}
      exitClass={exitStart}
      exitToClass={exitEnd}
    >
      <Show when={local.open || localSize() === null}>
        <MenuList
          {...leftProps}
          ref={onLoad}
          style={sx({
            '--menu-x': `${coord()[0]}px`,
            '--menu-y': `${coord()[1]}px`,
            '--origin-x': getOriginX(),
            '--origin-y': getOriginY(),
          }, leftProps.style)}
          className={cx(
            menuStyle,
            (localSize() === null) && invisibleStyle,
            leftProps.className,
          )}
        />
      </Show>
    </Transition>
  );
}

export default Menu;
