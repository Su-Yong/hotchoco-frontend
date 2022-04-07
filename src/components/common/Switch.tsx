import useDragEvent from '@/hooks/useDragEvent';
import { useTheme } from '@/theme';
import { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const MIN = -8;
const MAX = 16;

const inputStyle = css`
  display: none;
`;

const containerStyle = css`
  width: 24px;
  height: 4px;

  border-radius: 16px;

  background: var(--switch-guide-disabled);

  transition: background 0.1s;

  &[data-checked='true'] {
    background: var(--switch-guide-enabled);
  }

  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: -6px;
    bottom: -6px;
    left: -4px;
    right: -4px;
  }
`;

const thumbStyle = css`
  width: 16px;
  height: 16px;

  border-radius: 16px;
  border: solid 2px var(--border);

  cursor: move;
  user-select: none;

  position: absolute;
  left: var(--position, ${MIN}px);
  top: -6px;

  transition: background 0.1s, box-shadow 0.1s, border 0.1s;
  box-sizing: border-box;

  @media (pointer: fine) {
    &:hover, &:active {
      box-shadow: 0 0 0 2px var(--border);
    }
  }

  &[data-checked='true'] {
    background: var(--switch-thumb-enabled);
    border: solid 8px var(--switch-thumb-enabled);
  }

  &[data-checked='false'] {
    background: var(--switch-thumb-disabled);
    border: solid 2px var(--border);
  }
`;

export interface SwitchProps {
  value?: boolean;
  onChecked?: (value: boolean) => void;
}

const Switch = ({ value: initValue = false, onChecked }: SwitchProps) => {
  const theme = useTheme();

  const switchGuideDisabled = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.1).get(), [theme]);
  const switchGuideEnabled = useMemo(() => Color(theme.palette.primary.main).darken(0.3).get(), [theme]);
  const switchThumbDisabled = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.3).get(), [theme]);
  const switchThumbEnabled = useMemo(() => Color(theme.palette.primary.main).get(), [theme]);
  const border = useMemo(() => Color(theme.palette.black.main).alpha(0.5).get(), [theme]);

  const ref = useRef<HTMLDivElement>(null);
  const isMoved = useRef(false);
  const [checked, setChecked] = useState(initValue);

  const setValue = useCallback((isCheck: boolean) => {
    ref.current?.setAttribute('style', `--position: ${isCheck ? MAX : MIN}px; transition: left 0.1s, background 0.1s, border 0.1s;`);
    setTimeout(() => ref.current?.setAttribute('style', `--position: ${isCheck ? MAX : MIN}px;`), 100);
  }, [ref]);

  const dragEvents = useDragEvent({
    onDragStart: () => {
      isMoved.current = false;
    },
    onDrag: ({ x }) => {
      isMoved.current = true;
      const value = Math.min(Math.max(x + (checked ? MAX : MIN), MIN), MAX);
      
      ref.current?.setAttribute('style', `--position: ${value}px`);
    },
    onDragEnd: ({ x }) => {
      const result = (x + (checked ? MAX : MIN)) < (MIN + MAX) / 2 ? false : true;
      setChecked(result);
      setValue(result);
    }
  }, [isMoved, checked, setValue]);

  const onClick = useCallback(() => {
    if (!isMoved.current) {
      setChecked(!checked);
      setValue(!checked);
    }
  }, [isMoved, checked, setValue]);

  useEffect(() => {
    onChecked?.(checked);
  }, [checked, onChecked]);

  useEffect(() => {
    setChecked(initValue);
    setValue(initValue);
  }, [initValue]);

  return (
    <>
      <input type={'checkbox'} className={inputStyle} />
      <label
        style={style({
          '--switch-guide-disabled': switchGuideDisabled,
          '--switch-guide-enabled': switchGuideEnabled,
          '--switch-thumb-disabled': switchThumbDisabled,
          '--switch-thumb-enabled': switchThumbEnabled,
          '--border': border,
        })}
        className={containerStyle}
        data-checked={checked}
        onClick={onClick}
      >
        <div
          ref={ref}
          {...dragEvents}
          data-checked={checked}
          className={thumbStyle}
        />
      </label>
    </>
  )
};

export default Switch;
