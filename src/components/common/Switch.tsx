import { useTheme } from '@/theme';
import { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const inputStyle = css`
  display: none;
`;

const containerStyle = css`
  width: 24px;
  height: 4px;

  border-radius: 16px;

  background: var(--switch-guide);

  position: relative;
`;

const thumbStyle = css`
  width: 16px;
  height: 16px;

  border-radius: 16px;

  box-shadow: 0 0 0 0 var(--border);

  cursor: move;
  user-select: none;

  position: absolute;
  left: var(--position);
  top: -6px;

  transition: background 0.1s, box-shadow 0.1s;

  @media (pointer: coarse), (pointer: none) {
    box-shadow: 0 0 0 2px var(--border);
  }

  &:hover, &:active {
    box-shadow: 0 0 0 2px var(--border);
  }

  &[data-checked='true'] {
    background: var(--switch-thumb-enabled);
  }

  &[data-checked='false'] {
    background: var(--switch-thumb-disabled);
  }

  &[data-animation='true'] {
    transition: left 0.1s, background 0.1s, box-shadow 0.1s;
  }
`;

const MIN = -8;
const MAX = 16;

export interface SwitchProps {
  value?: boolean;
  onChecked?: (value: boolean) => void;
}

const Switch = ({ value: initValue = false, onChecked }: SwitchProps) => {
  const theme = useTheme();

  const switchGuide = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.1).get(), [theme]);
  const switchThumbDisabled = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.3).get(), [theme]);
  const switchThumbEnabled = useMemo(() => Color(theme.palette.primary.main).get(), [theme]);
  const border = useMemo(() => Color(theme.palette.black.main).alpha(0.5).get(), [theme]);

  const [checked, setChecked] = useState(initValue);
  const [animation, setAnimation] = useState(false);
  const [startPosition, setStartPosition] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  const onDragEnter = useCallback((x: number) => {
    setStartPosition(x);
  }, []);
  const onDrag = useCallback((x: number) => {
    if (startPosition !== null) {
      const diff = x - startPosition;
      const start = checked ? MAX : MIN;
      
      setPosition(Math.max(Math.min(start + diff, MAX), MIN));
    }
  }, [startPosition, checked]);
  const onDragEnd = useCallback(() => {
    if (startPosition !== null && position !== null) {
      const value = position > (MAX + MIN) / 2;

      setPosition(null);
      setChecked(value);

      setAnimation(true);
      setTimeout(() => setAnimation(false), 100);
    }

    setStartPosition(null);
  }, [startPosition, position]);

  const onClick = useCallback(() => {
    setChecked(!checked);
    setAnimation(true);
    setTimeout(() => setAnimation(false), 100);

    if (checked) setPosition(MIN);
    else setPosition(MAX);
  }, [checked]);

  useEffect(() => {
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchend', onDragEnd);
    document.addEventListener('touchcancel', onDragEnd);

    return () => {
      document.removeEventListener('mouseup', onDragEnd);
      document.removeEventListener('touchend', onDragEnd);
      document.removeEventListener('touchcancel', onDragEnd);
    }
  }, [onDragEnd]);

  useEffect(() => {
    const mousemove = ({ clientX }: MouseEvent) => onDrag(clientX);
    const touchmove = ({ touches }: TouchEvent) => {
      const item = touches.item(0)
      
      if (item) onDrag(item.clientX);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('touchmove', touchmove);

    return () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('touchmove', touchmove);
    }
  }, [onDrag]);

  useEffect(() => {
    onChecked?.(checked);
  }, [checked, onChecked]);

  useEffect(() => {
    setChecked(initValue);
  }, [initValue]);

  return (
    <>
      <input type={'checkbox'} className={inputStyle} />
      <label
        style={style({
          '--switch-guide': switchGuide,
          '--switch-thumb-disabled': switchThumbDisabled,
          '--switch-thumb-enabled': switchThumbEnabled,
          '--position': `${(position ?? (checked ? MAX : MIN))}px`,
          '--border': border,
        })}
        className={containerStyle}
        onClick={onClick}
      >
        <div
          data-animation={animation}
          data-checked={checked}
          className={thumbStyle}
          onTouchStart={({ touches }) => onDragEnter(touches.item(0).clientX)}
          onMouseDown={({ clientX }) => onDragEnter(clientX)}
        />
      </label>
    </>
  )
};

export default Switch;
