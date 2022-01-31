import { useTheme } from '@/theme';
import { css } from '@linaria/core';
import React, { HTMLAttributes, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import MoreIcon from '@iconify/icons-mdi/expand-more';
import { Icon } from '@iconify/react';
import Typography from './Typography';
import style from '@/utils/style';
import { Color } from '@/utils/Color';
import { StringLike } from '@/types/common';
import { SelectItemProps } from './SelectItem';
import className from '@/utils/className';

const containerStyle = css`
  position: relative;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
  padding-top: 8px;
  padding-bottom: 8px;

  color: var(--text);
  background: var(--background);
  border-radius: 16px;

  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.1s;

  &:hover {
    background: var(--background-hover);
  }

  &:active {
    box-shadow: var(--background-active) 0 0 0 4px inset;
  }
`;

const titleStyle = css`
  flex: 1;
`;

const optionContainerStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(16px + 24px + 8px);

  max-height: 30vh;
  overflow: hidden;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4px;

  border-radius: 4px;
  padding: 4px;
  background: var(--background);
  backdrop-filter: blur(4px);

  z-index: 500;

  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s;

  &[data-open='true'] {
    transform: translateY(0);
    pointer-events: auto;
    opacity: 1;
  }
`;

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: StringLike;
  onChange?: (value: StringLike) => void;
}

const Select = ({ value: initValue, onChange, children, ...restProps }: PropsWithChildren<SelectProps>) => {
  const theme = useTheme();

  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(initValue);

  const textColor = useMemo(() => theme.palette.primary.contrastText, [theme]);
  const backgroundColor = useMemo(() => theme.palette.primary.main, [theme]);
  const optionBackgroundColor = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.2).alpha(0.5).get(), [theme]);
  const backgroundHoverColor = useMemo(() => Color(backgroundColor).darken(0.1).get(), [backgroundColor]);
  const backgroundActiveColor = useMemo(() => Color(backgroundColor).darken(0.2).get(), [backgroundColor]);

  const onToggle = useCallback(() => {
    setOpen((it) => !it);
  }, []);

  const props: SelectItemProps[] = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (React.isValidElement(child) && typeof child.type !== 'string' && child.type.name === 'SelectItem') {
          return child.props;
        }
      }) ?? [],
    [children],
  );

  const options = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (React.isValidElement(child) && typeof child.type !== 'string' && child.type.name === 'SelectItem') {
          return React.cloneElement(
            child,
            {
              ...child.props,
              selected: value === child.props.value,
              onClick: setValue,
            },
            ...child.props.children,
          );
        }
      }),
    [children, value],
  );

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    if (value) onChange?.(value);
  }, [value, onChange]);

  return (
    <div
      {...restProps}
      className={className(containerStyle, restProps.className)}
      style={style({
        ...restProps.style,
        '--background': backgroundColor,
        '--background-hover': backgroundHoverColor,
        '--background-active': backgroundActiveColor,
        '--text': textColor,
      })}
      onClick={onToggle}
    >
      <Typography type={'h5'} className={titleStyle}>
        {props.find(({ value: it }) => it === value)?.children}
      </Typography>
      <Icon icon={MoreIcon} />
      <div
        className={optionContainerStyle}
        data-open={isOpen}
        style={style({
          '--background': optionBackgroundColor,
        })}
      >
        {options}
      </div>
    </div>
  );
};

export default Select;
