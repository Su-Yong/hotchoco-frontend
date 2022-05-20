import Button from '@/components/common/Button';
import Menu from '@/components/common/Menu';
import MenuList, { MenuItem } from '@/components/common/MenuList';
import Select from '@/components/common/Select';
import Switch from '@/components/common/Switch';
import TextInput from '@/components/common/TextInput';
import { css } from '@linaria/core';
import { FaMoon, FaSun } from 'solid-icons/fa';
import { Component, createSignal } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const containerStyle = css`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
`;

const ComponentPage: Component = () => {
  const [anchor, setAnchor] = createSignal<Element>();
  const [open, setOpen] = createSignal(false);
  const [disabled, setDisabled] = createSignal(false);
  const [item, setItem] = createSignal<string>();

  const onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (event) => {
    setAnchor(event.target);
    setOpen((it) => !it);
  };

  return (
    <div className={containerStyle}>
      <Switch
        checked={disabled()}
        onChecked={setDisabled}
      >
        disable: {disabled().toString()}
      </Switch>
      <TextInput disabled={disabled()} />
      <MenuList
        items={[
          { id: 'light', name: '라이트 테마', icon: FaSun },
          { id: 'dark', name: '다크 테마', icon: FaMoon },
        ]}
      />
      <Button onClick={onClick}>메뉴</Button>
      <Menu
        open={open()}
        onMenuItem={() => setOpen(false)}
        items={[
          { id: 'light', name: '라이트 테마', icon: FaSun },
          { id: 'dark', name: '다크 테마', icon: FaMoon },
        ]}
        anchor={anchor()}
      />
      <Select
        disabled={disabled()}
        value={item()}
        placeholder={'테마'}
        onSelect={(value) => {
          setItem(value);
        }}
        items={[
          { id: 'light', name: '라이트 테마', icon: FaSun },
          { id: 'dark', name: '다크 테마', icon: FaMoon },
        ]}
      />
    </div>
  )
};

export default ComponentPage;
