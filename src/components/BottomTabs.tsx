import { variable } from '@/theme';
import { css } from '@linaria/core';
import { createEffect, createSignal, For } from 'solid-js';
import Tab, { TabProps } from './Tab';

const containerStyle = css`
  width: 100%;

  position: relative;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;

  backdrop-filter: blur(16px);
  padding: ${variable('Size.space.medium')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    
    background: ${variable('Color.Grey.200')};
    opacity: ${variable('Color.Transparency.vague')};
  }

  & > * {
    flex: 1;
  }
`;

export interface BottomTabsProps {
  tabs: Omit<TabProps, 'onClick' | 'selected'>[];

  selected?: string;
  onTabChange?: (id: string) => void;
}

const BottomTabs = (props: BottomTabsProps) => {
  const [select, setSelect] = createSignal(props.selected);
  
  const onTab = (id: string) => {
    setSelect(id);
  
    props.onTabChange?.(id);
  };

  createEffect(() => {
    setSelect(props.selected);
  });

  return (
    <div class={containerStyle}>
      <For each={props.tabs}>
        {(tab) => (
          <Tab
            {...tab}
            selected={tab.id === select()}
            onClick={onTab}
          />
        )}
      </For>
    </div>
  )
};

export default BottomTabs;
