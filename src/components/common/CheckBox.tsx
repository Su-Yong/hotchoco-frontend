import { Component } from 'solid-js';
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

  cursor: pointer;
`;

const inputStyle = css`
  display: none;
`;

const checkWrapperStyle = css`
  width: var(--check-size);
  height: var(--check-size);
  border-radius: 4px;

  background: transparent;
  box-shadow: 0 0 0 1px var(--secondary-color) inset;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-funciton: ${variable('Animation.easing.deceleration')};

  input:checked + & {
    box-shadow: 0 0 0 calc(var(--check-size) * 0.5) var(--main-color) inset;
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

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-funciton: ${variable('Animation.easing.deceleration')};

  input:checked + svg > & {
    stroke-width: 2px;
    stroke-dashoffset: 0;
  }
`;
 
export interface CheckBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  size?: number;
}

const CheckBox: Component<CheckBoxProps> = ({
  id: domId,
  disabled,
  size = 16,
  children,
  ...props
}) => {
  const id = domId ?? nanoid();

  const sizePixel = `${size}px`;
  const mainColor = disabled ? variable('Color.Grey.300') : variable('Color.Blue.500');
  const secondaryColor = disabled ? variable('Color.Grey.300') : variable('Color.Grey.500');

  return (
      <label
        for={id} 
        style={{
          '--check-size': sizePixel,
          '--main-color': mainColor,
          '--secondary-color': secondaryColor,
        }}
        className={wrapperStyle}
      >
        <input
          type={'checkbox'}
          id={id}
          className={inputStyle}
          disabled={disabled}
          {...props}
        />
        <svg viewBox={`0 0 16 16`} className={checkWrapperStyle}>
          <path d={'M3 8 L6.5 12 L13 5'} className={checkStyle}></path>
        </svg>
        {children}
      </label>
  );
};

export default CheckBox;
