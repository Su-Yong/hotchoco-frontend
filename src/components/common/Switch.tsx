import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Component, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { model, useDirective } from '@/utils/directives';
useDirective(model);

const wrapperStyle = css`
  display: inline-flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;

  cursor: pointer;
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

  background: linear-gradient(to right, var(--main-color), var(--secondary-color));
  background-size: calc(var(--switch-size) * 10) var(--switch-size);
  background-position: calc(var(--offset) * var(--switch-size) * 9 + var(--switch-size)) 0px;

  transform: translateX(calc(100% * var(--offset)));

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 50%;

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
  let switchRef: HTMLInputElement | undefined;

  const [checked, setChecked] = createSignal(initChecked);
  const [offset, setOffset] = createSignal(initChecked ? 1 : 0);

  const sizePixel = `${size}px`;
  const mainColor = disabled ? variable('Color.Grey.300') : variable('Color.Blue.500');
  const secondaryColor = disabled ? variable('Color.Grey.300') : variable('Color.Grey.500');

  let x: number | null = null;
  let isMove = false;
  const onEnter = () => {
    x = checked() ? size : 0;
  };
  const onMove = (event: PointerEvent) => {
    if (typeof x === 'number') {
      isMove = true;
      x += event.movementX;

      const newOffset = Math.min(Math.max(x, 0), size) / size;
      setOffset(newOffset);
    }
  };
  const onEnd = (event: PointerEvent) => {
    if (typeof x === 'number') {
      x += event.movementX;

      if (!isMove) {
        setChecked(!checked());
      } else {
        const newOffset = Math.min(Math.max(x, 0), size) / size;
        setChecked(newOffset > 0.5);
        setOffset(newOffset > 0.5 ? 1 : 0);
      }
    }

    x = null;
    isMove = false;
  };

  createEffect(() => {
    setOffset(checked() ? 1 : 0);
  }, [checked]);

  createEffect(() => {
    if (!disabled) {
      switchRef?.addEventListener('pointerdown', onEnter);
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onEnd);
    }

    return () => {
      switchRef?.removeEventListener('pointerdown', onEnter);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onEnd);
    }
  }, [disabled]);

  return (
    <label
      style={{
        '--switch-size': sizePixel,
        '--main-color': mainColor,
        '--secondary-color': secondaryColor,
        '--offset': offset(),
      }}
      className={wrapperStyle}
    >
      <input
        type={'checkbox'}
        className={inputStyle}
        checked={checked()}
      />
      <div ref={switchRef} className={switchStyle}>
        <div className={switchRailStyle} />
        <div className={switchThumbStyle}/>
      </div>
      {children}
    </label>
  );
}

export default Switch;
