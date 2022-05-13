import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Component, createEffect, createSignal } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const wrapperStyle = css`
  display: inline-flex;
  flex-flow: row-reverse;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;

  cursor: pointer;
  touch-action: none;
  user-select: none;
`;
const inputStyle = css`
  display: none;
`;

const switchStyle = css`
  width: calc(var(--switch-size) * 2);
  height: var(--switch-size);

  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
`;

const switchThumbStyle = css`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;

  width: var(--switch-size);
  height: var(--switch-size);
  border-radius: 50%;

  will-change: background, background-size, background-position;
  background: linear-gradient(to right, var(--main-color), var(--secondary-color));
  background-size: calc(var(--switch-size) * 10) var(--switch-size);
  background-position: calc(var(--offset) * var(--switch-size) * 9 + var(--switch-size)) 0px;

  transform: translateX(calc(100% * var(--offset)));

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 100%;

    background: ${variable('Color.Grey.500')};
    opacity: 0;
    transform: scale(0);

    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }

  div:hover > div > &::before {
    opacity: 0.3;
    transform: scale(1);
  }
  div:active > div > &::before {
    opacity: 0.5;
    transform: scale(1.25);
  }

  div[data-disabled='false'] label:active + div &,
  div[data-disabled='false'] &:active,
  div[data-disabled='false'] &[data-move='true'] {
    transform: translateX(calc(100% * var(--offset))) scale(0.9);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 50%;

    will-change: transform;

    transform: scale(calc(1 - var(--offset)));
    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.deceleration')};
    background: ${variable('Color.WHITE')};
  }
`;

const switchRailStyle = css`
  position: absolute;
  left: calc(var(--switch-size) / 2);
  right: calc(var(--switch-size) / 2);
  margin: auto;

  height: 8px;
  border-radius: 8px;

  background: ${variable('Color.Grey.300')};
`;

export interface SwitchProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  size?: number;
}

const Switch: Component<SwitchProps> = ({
  size = 24,
  checked: initChecked,
  disabled,
  children,
}) => {
  let switchThumbRef: HTMLDivElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  const [checked, setChecked] = createSignal(initChecked);
  const [offset, setOffset] = createSignal(initChecked ? 1 : 0);
  const [isMove, setIsMove] = createSignal(false);

  const sizePixel = `${size}px`;
  const mainColor = disabled ? variable('Color.Grey.300') : variable('Color.Blue.500');
  const secondaryColor = disabled ? variable('Color.Grey.300') : variable('Color.Grey.500');

  let lastX: number = 0;
  let x: number | null = null;
  let moved: boolean = false;
  const onEnter = (event: PointerEvent) => {
    x = checked() ? size : 0;
    setIsMove(true);
    lastX = event.screenX;
  };
  const onMove = (event: PointerEvent) => {
    if (typeof x === 'number') {
      x += event.movementX ?? event.screenX - lastX;
      lastX = event.screenX;
      moved = true;

      const newOffset = Math.min(Math.max(x, 0), size) / size;
      setOffset(newOffset);
    }
  };
  const onEnd = (event: PointerEvent) => {
    if (typeof x === 'number') {
      x += event.movementX ?? event.screenX - lastX;
      lastX = event.screenX;

      if (moved) {
        const newOffset = Math.min(Math.max(x, 0), size) / size;
  
        setChecked(newOffset > 0.5);
        setOffset(newOffset > 0.5 ? 1 : 0);
      } else {
        const newValue = !checked();
        setChecked(newValue);
        setOffset(newValue ? 1 : 0);
      }
    }

    x = null;
    moved = false;
    setIsMove(false);
  };

  const onInput: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    setChecked(event.currentTarget.checked);
    setOffset(event.currentTarget.checked ? 1 : 0);
  };

  createEffect((remover: () => void) => {
    if (remover) remover();

    if (!disabled) {
      switchThumbRef?.addEventListener('pointerdown', onEnter);
      document?.addEventListener('pointermove', onMove);
      document?.addEventListener('pointerup', onEnd);
      document?.addEventListener('pointercancel', onEnd);
    }

    return () => {
      switchThumbRef?.removeEventListener('pointerdown', onEnter);
      document?.removeEventListener('pointermove', onMove);
      document?.removeEventListener('pointerup', onEnd);
      document?.removeEventListener('pointercancel', onEnd);
    };
  }, () => {});

  return (
    <div
      style={{
        '--switch-size': sizePixel,
        '--main-color': mainColor,
        '--secondary-color': secondaryColor,
        '--offset': offset(),
      }}
      data-disabled={disabled ?? false}
      className={wrapperStyle}
    >
      <label>
        <input
          ref={inputRef}
          type={'checkbox'}
          className={inputStyle}
          disabled={disabled}
          checked={checked()}
          onChange={isMove() ? undefined : onInput}
        />
        {children}
      </label>
      <div ref={switchThumbRef} className={switchStyle}>
        <div className={switchRailStyle} />
        <div className={switchThumbStyle} data-move={isMove()} />
      </div>
    </div>
  );
}

export default Switch;
