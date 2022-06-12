import { variable } from '@/theme';
import { css, cx } from '@linaria/core';
import { Component, For, Show, splitProps } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import TextButton from './TextButton';

const menuContainer = css`
  height: fit-content;
  overflow: auto;

  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;

  background: ${variable('Color.Grey.300')};
  box-shadow: 0 4px 12px ${variable('Color.Grey.300')};
`;

const itemStyle = css`
  width: 100%;
  flex: 1;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${variable('Size.space.medium')};

  padding: ${variable('Size.space.medium')};
  font-size: ${variable('Size.text.body')};
`;

export interface MenuItem {
  id: string;
  name: string;
  icon?: () => JSX.Element;
}

export interface MenuListProps extends JSX.HTMLAttributes<HTMLUListElement> {
  items: MenuItem[];
  onMenuItem?: (item: MenuItem) => void;
}

const MenuList: Component<MenuListProps> = (props) => {
  const [local, leftProps] = splitProps(props, ['items', 'onMenuItem']);

  const onClick = (item: MenuItem) => {
    if (local.onMenuItem) local.onMenuItem(item);
  };

  return (
    <ul
      {...leftProps}
      classList={{
        ...leftProps.classList,
        [menuContainer]: true,
      }}
    >
      <For each={local.items}>
        {(item) => (
          <TextButton
            id={item.id}
            className={itemStyle}
            onClick={() => onClick(item)}
          >
            <Show when={!!item.icon}>
              {item.icon && <item.icon />}
            </Show>
            {item.name}
          </TextButton> 
        )}
      </For>
    </ul>
  );
}

export default MenuList;
