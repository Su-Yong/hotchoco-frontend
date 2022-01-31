import { useTheme } from '@/theme';
import { StringLike } from '@/types/common';
import { Color } from '@/utils/Color';
import style from '@/utils/style';
import { css } from '@linaria/core';
import { useMemo } from 'react';

const containerStyle = css`
  width: 100%;
  color: var(--th-backgroundSecondary-contrastText);
  background: var(--th-backgroundSecondary-main);

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
    box-shadow: var(--th-primary-main) 0 0 0 4px inset;
  }

  &[data-select='true'] {
    color: var(--th-primary-contrastText);
    background: var(--th-primary-main);
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
  const backgroundActiveColor = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.1).get(), [theme]);

  return (
    <div
      key={value.toString()}
      className={containerStyle}
      style={style({
        '--background-active': backgroundActiveColor,
      })}
      onClick={() => onClick?.(value)}
      data-select={!!selected}
    >
      {children}
    </div>
  );
};

export default SelectItem;
