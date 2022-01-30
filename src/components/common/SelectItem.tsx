import { useTheme } from '@/theme';
import { StringLike } from '@/types/common';
import { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import { useMemo } from 'react';

const containerStyle = css`
  width: 100%;
  color: var(--color);
  background: var(--background);

  border-radius: 4px;
  padding: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  position: relative;

  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 8px;

  box-sizing: border-box;

  transition: all 0.1s;

  &:hover {
    background: var(--background-active);
  }
  &:active {
    box-shadow: var(--background-select) 0 0 0 4px inset;
  }

  &[data-select='true'] {
    color: var(--color-select);
    background: var(--background-select);
    border-radius: 40px;
  }
`;

export interface SelectItemProps {
  value: StringLike;
  selected?: boolean;
  children?: string;
  onClick?: (value: StringLike) => void;
}

const SelectItem = ({ value, children, selected, onClick }: SelectItemProps) => {
  const theme = useTheme();
  const textCategoryColor = useMemo(() => theme.palette.backgroundSecondary.contrastText, [theme]);
  const backgroundColor = useMemo(() => theme.palette.backgroundSecondary.main, [theme]);
  const backgroundActiveColor = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.1).get(), [theme]);
  const textSelectColor = useMemo(() => theme.palette.primary.contrastText, [theme]);
  const backgroundSelectColor = useMemo(() => Color(theme.palette.primary.main).get(), [theme]);

  return (
    <div
      key={value.toString()}
      className={containerStyle}
      style={style({
        '--color': textCategoryColor,
        '--color-select': textSelectColor,
        '--background-active': backgroundActiveColor,
        '--background-select': backgroundSelectColor,
        '--background': backgroundColor,
      })}
      onClick={() => onClick?.(value)}
      data-select={!!selected}
    >
      {children}
    </div>
  );
}

export default SelectItem;
