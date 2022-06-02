import { variable } from '@/theme';
import { sx } from '@/utils';
import { css, cx } from '@linaria/core';
import { Component, createEffect, createSignal, mergeProps, on, onCleanup, onMount, Show, splitProps } from 'solid-js';
import { Portal } from 'solid-js/web';
import { JSX } from 'solid-js/jsx-runtime';
import { Transition } from 'solid-transition-group';

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
  transition-timing-function: ${variable('Animation.easing.acceleration')};
`;

const wrapperStyle = css`
  position: fixed;
  left: calc(var(--x) + var(--gap-x, 0px));
  top: calc(var(--y) + var(--gap-y, 0px));

  z-index: 1000000;
`;

const invisibleWrapperStyle = css`
  width: fit-content;
  height: fit-content;

  visibility: hidden;
`;

type Origin = {
  vertical?: 'top' | 'center' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
};
export interface PopupProps {
  open?: boolean;
  origin?: Origin;
  targetOrigin?: Origin;
  anchor?: Element;
  gapX?: string;
  gapY?: string;

  outerStyle?: JSX.HTMLAttributes<HTMLDivElement>['style'];
  outerClassName?: JSX.HTMLAttributes<HTMLDivElement>['className'];
}

const defaultProps: PopupProps = {
  origin: {
    horizontal: 'left',
    vertical: 'bottom',
  },
  targetOrigin: {
    horizontal: 'left',
    vertical: 'top',
  },
  gapX: '0px',
  gapY: '0px',
};

const Popup: Component<PopupProps> = (props) => {
  const [local, leftProps] = splitProps(
    mergeProps(defaultProps, props),
    ['open', 'origin', 'targetOrigin', 'anchor', 'gapX', 'gapY', 'children'],
  );

  const [coord, setCoord] = createSignal<[number, number]>([0, 0]);
  const [localSize, setLocalSize] = createSignal<[number, number] | null>(null);

  const calculateCoordinate = () => {
    const anchorRect = local.anchor?.getBoundingClientRect();
    const localRect = localSize();

    console.log('calc', anchorRect, localRect);
    if (anchorRect && localRect) {
      let horizontalOffset = 0;
      let verticalOffset = 0;
      let localHorizontalOffset = 0;
      let localVerticalOffset = 0;

      if (local.targetOrigin?.horizontal === 'left') localHorizontalOffset += 0;
      if (local.targetOrigin?.horizontal === 'center') localHorizontalOffset -= localRect[0] / 2;
      if (local.targetOrigin?.horizontal === 'right') localHorizontalOffset -= localRect[0];
      if (local.targetOrigin?.vertical === 'top') localVerticalOffset -= 0;
      if (local.targetOrigin?.vertical === 'center') localVerticalOffset -= localRect[1] / 2;
      if (local.targetOrigin?.vertical === 'bottom') localVerticalOffset -= localRect[1];

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
    if (local.targetOrigin?.horizontal === 'left') return '0%';
    if (local.targetOrigin?.horizontal === 'center') return '50%';
    if (local.targetOrigin?.horizontal === 'right') return '100%';
  };
  
  const getOriginY = () => {
    if (local.targetOrigin?.vertical === 'top') return '0%';
    if (local.targetOrigin?.vertical === 'center') return '50%';
    if (local.targetOrigin?.vertical === 'bottom') return '100%';
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
    
    document.addEventListener('scroll', calculateCoordinate, true);
  });

  createEffect(on(() => local.open, () => calculateCoordinate()));

  createEffect(calculateCoordinate);

  createEffect<boolean>((isDisconnect) => {
    if (local.anchor) {
      if (isDisconnect) anchorMutationObserver.disconnect();

      anchorMutationObserver.observe(local.anchor, mutationObserverConfig);

      return true;
    }

    return false;
  }, false);

  onCleanup(() => {
    anchorMutationObserver.disconnect();
    menuMutationObserver.disconnect();

    document.removeEventListener('scroll', calculateCoordinate, true);
  });

  return (
    <Portal>
      <Transition
        enterClass={enterStart}
        enterToClass={enterEnd}
        exitClass={exitStart}
        exitToClass={exitEnd}
      >
        <Show when={local.open || localSize() === null}>
          <div
            ref={onLoad}
            style={sx({
              '--x': `${coord()[0]}px`,
              '--y': `${coord()[1]}px`,
              '--origin-x': getOriginX(),
              '--origin-y': getOriginY(),
              '--gap-x': local.gapX,
              '--gap-y': local.gapY,
            }, leftProps.outerStyle)}
            className={cx(
              wrapperStyle,
              (localSize() === null) && invisibleWrapperStyle,
              leftProps.outerClassName,
            )}
          >
            {local.children}
          </div>
        </Show>
      </Transition>
    </Portal>
  );
}

export default Popup;
