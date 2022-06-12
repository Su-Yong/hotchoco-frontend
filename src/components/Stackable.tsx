import { css, cx } from '@linaria/core';
import { JSX } from 'solid-js/jsx-runtime';
import Hammer from 'hammerjs';
import { createEffect, createSignal, createUniqueId, Show, splitProps } from 'solid-js';
import { getTheme, variable } from '@/theme';
import { Transition } from 'solid-transition-group';
import { cssTimeToMs } from '@/utils/css';

const containerStyle = css`
  position: absolute;
  inset: 0;
`;

const wrapperStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);

  z-index: 100;
  touch-action: none;

  &[data-animation="true"] {
    transition-property: transform;
    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.inOut')};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: 0 0 0 max(100vw, 100vh) ${variable('Color.Grey.900')};
    opacity: calc((100% - var(--offset)) * ${variable('Color.Transparency.translucent')});

    pointer-events: none;
    z-index: -1;
  }

  &[data-animation="true"]::after {
    transition-property: opacity;
    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.inOut')};
  }
`;

const toLeftStyle = css`
  transform: translateX(calc(-1 * var(--offset)));
`;

const toRightStyle = css`
  transform: translateX(var(--offset));
`;

const toUpStyle = css`
  transform: translateY(calc(-1 * var(--offset)));
`;

const toDownStyle = css`
  transform: translateY(var(--offset));
`;

export interface StackableProps extends JSX.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  direction: 'left' | 'right' | 'up' | 'down';
  children: JSX.Element;

  onBack?: () => void;
  onGesture?: (offset: number) => void;
}

const Stackable = (props: StackableProps) => {
  const [local, leftProps] = splitProps(
    props,
    ['open', 'direction', 'children', 'onBack', 'onGesture'],
  );

  const containerId = createUniqueId();

  const [offset, setOffset] = createSignal(0);
  const [animation, setAnimation] = createSignal(false);

  const direction = () => {
    if (local.direction === 'left') return Hammer.DIRECTION_LEFT;
    if (local.direction === 'right') return Hammer.DIRECTION_RIGHT;
    if (local.direction === 'up') return Hammer.DIRECTION_UP;
    if (local.direction === 'down') return Hammer.DIRECTION_DOWN;

    return Hammer.DIRECTION_ALL;
  };

  const directionValue = () => {
    if (local.direction === 'left') {
      return {
        direction: 'x',
        delta: 'deltaX',
        dimension: 'clientWidth',
        sign: -1,
      } as const;
    }

    if (local.direction === 'right') {
      return {
        direction: 'x',
        delta: 'deltaX',
        dimension: 'clientWidth',
        sign: 1,
      } as const;
    }

    if (local.direction === 'up') {
      return {
        direction: 'y',
        delta: 'deltaY',
        dimension: 'clientHeight',
        sign: -1,
      } as const;
    }

    if (local.direction === 'down') {
      return {
        direction: 'y',
        delta: 'deltaY',
        dimension: 'clientHeight',
        sign: 1,
      } as const;
    }
  };

  const registerGesture = (target: HTMLDivElement) => {
    const hammer = new Hammer(target);

    hammer.get('pan').set({ direction: direction() });

    let isStart = false;
    hammer.on('panstart', (event) => {
      const value = directionValue()!;
      if (!value) return;

      const { direction, dimension, sign } = value;
      setAnimation(false);

      if ((event.center[direction] - document.body[dimension] / 2) * sign < 0) {
        isStart = true;
      }
    });
    hammer.on('pan', (event) => {
      if (isStart) {
        const value = directionValue()!;
        if (!value) return;

        const { delta, dimension, sign } = value;

        const ratio = Math.min(Math.max(event[delta] * sign / document.body[dimension], 0), 1);
        setOffset(ratio);
      }
    });
    hammer.on('panend', () => {
      if (isStart) {
        const value = directionValue()!;
        if (!value) return;

        const { sign } = value;

        setAnimation(true);

          if (offset() > 0.5) {
            setOffset(1);
            local.onBack?.();
          } else {
            setOffset(0);
          }

        isStart = false;
      }
    });
  };

  createEffect(() => {
    setAnimation(true);

    if (local.open) setOffset(0);
    else setOffset(1);
  });

  createEffect(() => {
    if (local.onGesture) local.onGesture(offset());
  });

  return (
    <Transition
      onExit={(element, done) => {
        if (!local.open && element instanceof HTMLDivElement) {
          element.style.setProperty('--offset', '100%');
        }

        const time = cssTimeToMs(getTheme().Animation.duration.short);

        setTimeout(done, time ?? 0);
      }}
    >
      <Show when={local.open}>
        <div
          id={containerId}
          style={{
            '--offset': `${~~(offset() * 100)}%`,
          }}
          classList={{
            [containerStyle]: true,
          }}
        >
          <div
            {...leftProps}
            data-animation={animation()}
            ref={registerGesture}
            classList={{
              ...leftProps.classList,
              [wrapperStyle]: true,
              [toLeftStyle]: local.direction === 'left',
              [toRightStyle]: local.direction === 'right',
              [toUpStyle]: local.direction === 'up',
              [toDownStyle]: local.direction === 'down',
            }}
          >
            {local.children}
          </div>
        </div>
      </Show>
    </Transition>
  );
};

export default Stackable;
