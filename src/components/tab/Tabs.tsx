import { variable } from '@/theme';
import { offset } from '@floating-ui/dom';
import { css } from '@linaria/core';
import { createSignal, createEffect, For, mergeProps, Show } from 'solid-js';
import Popup from '../common/Popup';
import Tab, { TabProps } from './Tab';

const containerStyle = css`
  position: relative;

  display: flex;
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
`;

const horizontalStyle = css`
  flex-flow: row;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const verticalStyle = css`
  flex-flow: column;
  height: 100%;

  & > * {
    aspect-ratio: 1;
  }
`;

const tooltipPopupStyle = css`
  backdrop-filter: blur(16px);
  border-radius: ${variable('Size.space.medium')};
  overflow: hidden;
`;

const tooltipStyle = css`
  margin: 0;
  padding: ${variable('Size.space.medium')};
  border-radius: ${variable('Size.space.medium')};

  position: relative;
  overflow: hidden;
  z-index: 5;

  color: ${variable('Color.BLACK')};
  font-size: ${variable('Size.text.title')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;

    background: ${variable('Color.Grey.200')};
    opacity: ${variable('Color.Transparency.vague')};
  }
`;

export interface TabsProps {
  tabs: Omit<TabProps, 'onClick' | 'selected'>[];

  direction?: 'vertical' | 'horizontal';
  selected?: string;
  onTabChange?: (id: string) => void;
}

const defaultProps = {
  direction: 'horizontal',
};

const Tabs = (props: TabsProps) => {
  const local = mergeProps(defaultProps, props);

  const [select, setSelect] = createSignal(local.selected);
  
  const [tabList, setTabList] = createSignal<HTMLDivElement[]>([]);
  const [tooltipVisible, setTooltipVisible] = createSignal<boolean[]>([]);
  const onTab = (id: string) => {
    setSelect(id);
  
    local.onTabChange?.(id);
  };

  createEffect(() => {
    setSelect(local.selected);
  });

  return (
    <div
      classList={{
        [containerStyle]: true,
        [horizontalStyle]: local.direction === 'horizontal',
        [verticalStyle]: local.direction === 'vertical',
      }}
    >
      <For each={local.tabs}>
        {(tab, index) => (
          <div
            onPointerEnter={() => {
              const newTooltip = [...tooltipVisible()];
              newTooltip.splice(index(), 1, true);

              setTooltipVisible(newTooltip);
            }}
            onPointerLeave={() => {
              const newTooltip = [...tooltipVisible()];
              newTooltip.splice(index(), 1, false);

              setTooltipVisible(newTooltip);
            }}
            ref={(element) => {
              const newList = [...tabList()];
              newList.splice(index(), 1, element);

              setTabList(newList);
            }}
          >
            <Tab
              {...tab}
              direction={local.direction}
              selected={tab.id === select()}
              onClick={onTab}
            />
            <Show when={local.direction === 'vertical'}>
              <Popup          
                open={tooltipVisible()[index()]}
                placement={'right'}
                anchor={tabList()[index()]}
                middleware={[
                  offset({
                    mainAxis: 16,
                  }),
                ]}
                class={tooltipPopupStyle}
              >
                <h1 class={tooltipStyle}>
                  {tab.title}
                </h1>
              </Popup>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};

export default Tabs;
