import { Component, mergeProps, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { css } from '@linaria/core';
import { nanoid } from 'nanoid';

import { variable } from '@/theme';
import { model, useDirective } from '@/utils/directives';

useDirective(model);

const wrapperStyle = css`
  display: inline-flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;

  position: relative;
  z-index: 0;
  cursor: pointer;
  user-select: none;
`;

const inputStyle = css`
  display: none;
`;

const checkWrapperStyle = css`
  width: var(--check-size);
  height: var(--check-size);

  overflow: visible;
`;

const hoverStyle = css`
  fill: ${variable('Color.Grey.500')};
  opacity: 0;

  transform-origin: center;
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-funciton: ${variable('Animation.easing.deceleration')};

  label:hover > svg > & {
    opacity: 0.35;
    transform: scale(1.75);
  }

  label:active > svg & {
    opacity: 0.5;
    transform: scale(2);
  }
`;

const checkFrameStyle = css`
  fill: var(--secondary-color);
  stroke: var(--secondary-color);
  stroke-width: 1px;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-funciton: ${variable('Animation.easing.deceleration')};

  input:checked + svg > & {
    fill: var(--main-color);
    stroke: var(--main-color);
  }
`;

const checkInnerStyle = css`
  fill: ${variable('Color.WHITE')};
  stroke: none;

  transform-origin: center;
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-funciton: ${variable('Animation.easing.deceleration')};

  input:checked + svg > & {
    transform: scale(0);
    opacity: 0;
  }
`;

const checkStyle = css`
  fill: transparent;
  stroke: ${variable('Color.WHITE')};
  stroke-width: 0;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;

  transition-delay: calc(${variable('Animation.duration.shorter')} / 1.5);
  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-funciton: ${variable('Animation.easing.deceleration')};

  input:checked + svg > & {
    stroke-width: 2px;
    stroke-dashoffset: 0;
  }
`;
 
export interface CheckBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  size?: number;
}

const CheckBox: Component<CheckBoxProps> = (props) => {
  const [local, children, leftProps] = splitProps(mergeProps({
    size: 16,
    id: nanoid(),
  }, props), [
    'className',
    'size',
    'id',
    'disabled'
  ], ['children']);

  const sizePixel = `${local.size}px`;
  const mainColor = local.disabled ? variable('Color.Grey.300') : variable('Primary.Main');
  const secondaryColor = local.disabled ? variable('Color.Grey.300') : variable('Color.Grey.500');

  return (
      <label
        for={local.id}
        style={{
          '--check-size': sizePixel,
          '--main-color': mainColor,
          '--secondary-color': secondaryColor,
        }}
        className={wrapperStyle}
      >
        <input
          type={'checkbox'}
          id={local.id}
          className={inputStyle}
          disabled={local.disabled}
          {...leftProps}
        />
        <svg viewBox={`0 0 16 16`} className={checkWrapperStyle}>
          <circle cx={8} cy={8} r={8} className={hoverStyle} />
          <path d={'M2 0 L14 0 a2 2 0 0 1 2 2 L16 14 a2 2 0 0 1 -2 2 L2 16 a2 2 0 0 1 -2 -2 L0 2 a2 2 0 0 1 2 -2Z'} className={checkFrameStyle} />
          <path d={'M2 0 L14 0 a2 2 0 0 1 2 2 L16 14 a2 2 0 0 1 -2 2 L2 16 a2 2 0 0 1 -2 -2 L0 2 a2 2 0 0 1 2 -2Z'} className={checkInnerStyle} />
          <path d={'M3 8 L6.5 12 L13 5'} className={checkStyle}></path>
        </svg>
        {children.children}
      </label>
  );
};

export default CheckBox;
