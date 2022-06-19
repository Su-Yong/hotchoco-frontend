import { getTheme, variable } from '@/theme';
import { sx } from '@/utils';
import { cssTimeToMs } from '@/utils/css';
import { css, cx } from '@linaria/core';
import { Component, createDeferred, createEffect, createSignal, createUniqueId, mergeProps, on, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import Icon from './Icon';
import Menu, { MenuProps } from './Menu';
import { MenuItem } from './MenuList';

const selectStyle = css`
  --box-shadow-color: var(--secondary-color);

  outline: none;
  border-radius: 0;
  border: 0 solid transparent;
  cursor: pointer;

  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 -4px 0 -2px var(--box-shadow-color) inset;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  gap: ${variable('Size.space.medium')};

  font-size: ${variable('Size.text.body')};
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: var(--text-color);
  background: var(--background-color);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};

  &:hover {
    background: var(--background-hover-color);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--box-shadow-color) inset;
  }

  &[data-required="true"][data-value="false"] {
    --box-shadow-color: ${variable('Danger.Main')};
  }

  &[data-value="true"] {
    --box-shadow-color: var(--main-color);
  }
`;

const iconStyle = css`
  color: var(--icon-color);

  transform: rotate(0deg);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  user-select: none;

  [data-open="true"] > & {
    transform: rotate(180deg);
  }
`;

const innerStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${variable('Size.space.small')};
`;

export interface SelectProps extends Pick<MenuProps, 'items' | 'placement'>, Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  required?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onSelect?: (id?: string) => void;
}
const defaultProps: Omit<SelectProps, 'items'> = {
  placeholder: 'none',
};

const Select: Component<SelectProps> = (props) => {
  const [local, menuProps, leftProps] = splitProps(
    mergeProps(defaultProps, props),
    ['value', 'onSelect', 'placeholder', 'disabled', 'required'],
    ['items', 'placement'],
  );

  const noneId = createUniqueId();
  const [anchor, setAnchor] = createSignal<HTMLDivElement>();
  const [open, setOpen] = createSignal(false);
  const [menuWidth, setMenuWidth] = createSignal(0);
  const [fastUpdateOptions, setFastUpdateOptions] = createSignal(false);

  const onMenuItem = (item: MenuItem) => {
    if (item.id === noneId) {
      local.onSelect?.();
    } else {
      local.onSelect?.(item.id);
    }

    setOpen(false);
  };

  const onMenuOpen = () => {
    if (!local.disabled) setOpen((it) => !it);
  }

  const innerIcon = () => {
    const found = menuProps.items.find((it) => it.id === local.value);

    if (found?.icon) return <found.icon />;
    return undefined;
  };
  const innerName = createDeferred(() => {
    const found = menuProps.items.find((it) => it.id === local.value);

    if (found) return found.name;
    return local.placeholder;
  });

  const items = createDeferred(() => {
    if (local.required) return menuProps.items;

    return [
      {
        id: noneId,
        name: local.placeholder ?? 'none',
      },
      ...menuProps.items,
    ];
  });

  const textColor = () => (local.disabled || local.value === undefined) ? variable('Color.Grey.500') : variable('Color.BLACK');
  const iconColor = () => local.disabled ? variable('Color.Grey.500') : variable('Color.BLACK');
  const mainColor = () => local.disabled ? variable('Color.Grey.200') : variable('Primary.Main');
  const secondaryColor = () => local.disabled ? variable('Color.Grey.300') : variable('Color.Grey.500');
  const backgroundColor = () => local.disabled ? variable('Color.Grey.100') : variable('Color.Grey.200');
  const backgroundHoverColor = () => local.disabled ? variable('Color.Grey.100') : variable('Color.Grey.300');

  createEffect(() => {
    if (local.disabled) {
      setOpen(false);
    }
  });

  createEffect(() => {
    const element = anchor();
    if (element) {
      const width = element.getBoundingClientRect().width;
      
      setMenuWidth(width);
    }
  });

  createEffect(on(open, () => {
    setFastUpdateOptions(false);

    setTimeout(() => {
      setFastUpdateOptions(true);
    }, cssTimeToMs(getTheme().Animation.duration.short) ?? 500);
  }));

  return (
    <>
      <div
        {...leftProps}
        data-open={open()}
        data-required={local.required}
        data-value={local.value !== undefined}
        ref={setAnchor}
        className={cx(selectStyle, leftProps.className)}
        onClick={onMenuOpen}
        style={sx({
          '--text-color': textColor(),
          '--icon-color': iconColor(),
          '--main-color': mainColor(),
          '--secondary-color': secondaryColor(),
          '--background-color': backgroundColor(),
          '--background-hover-color': backgroundHoverColor(),
        }, leftProps.style)}
      >
        <span className={innerStyle}>
          {innerIcon()}
          {innerName()}
        </span>
        <Icon icon={'expand_more'} className={iconStyle} />
      </div>
      <Menu
        {...menuProps}
        style={{
          width: typeof menuWidth() === 'number' ? `${menuWidth()}px` : undefined,
        }}
        items={items()}
        open={open()}
        onMenuItem={onMenuItem}
        anchor={anchor()}
        updateOptions={fastUpdateOptions() ? {
          ancestorResize: true,
          ancestorScroll: true,
          elementResize: false,
          animationFrame: false,
        } : {
          ancestorResize: true,
          ancestorScroll: true,
          elementResize: true,
          animationFrame: true,
        }}
      />
    </>
  );
}

export default Select;
