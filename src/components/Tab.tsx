import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Transition } from 'solid-transition-group';

const containerStyle = css`
  width: 100%;

  position: relative;
  z-index: 0;

  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  user-select: none;
  padding: ${variable('Size.space.medium')};

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

const iconOverlayStyle = css`
  position: absolute;

  inset: ${variable('Size.space.small')};
  border-radius: 10000px;
  z-index: -1;

  background: var(--color, ${variable('Primary.Main')});
  opacity: ${variable('Color.Transparency.transparent')};
  transform: scale(0);
  box-shadow: 0 0 0 0 var(--color);

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  *:active > & {
    transform: scale(1);
    opacity: ${variable('Color.Transparency.clear')};
  }

  [data-select="true"] > & {
    transform: scale(1);
    opacity: ${variable('Color.Transparency.translucent')};
    box-shadow: 0 0 0 calc(${variable('Size.space.medium')} - ${variable('Size.space.small')}) var(--color);
  }
`;

const titleStyle = css`
  overflow: hidden;
  white-space: nowrap;
  margin: 0;

  font-size: ${variable('Size.text.subtitle')};
`;

const titleWrapperStyle = css`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
`;

const enterStart = css`
  max-width: 0%;
  transform: translateX(-50%) scale(0);
  opacity: 0;
`;
const enterEnd = css`
  max-width: 100%;
  transform: translateX(0%) scale(1);
  opacity: 1;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;
const exitStart = css`
  max-width: 100%;
  transform: translateX(0%) scale(1);
  opacity: 1;
`;
const exitEnd = css`
  max-width: 0%;
  transform: translateX(-50%) scale(0);
  opacity: 0;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

export interface TabProps {
  id: string;
  icon: JSX.Element;
  title: string;

  color?: string;
  selected?: boolean;

  onClick?: (id: string) => void;
}

const Tab = (props: TabProps) => {
  const onClick = () => {
    props.onClick?.(props.id);
  };

  return (
    <div
      data-select={props.selected}
      class={containerStyle}
      onClick={onClick}
      style={{
        '--color': props.color,
      }}
    >
      <div class={iconOverlayStyle} />
      {props.icon}
      <Transition
        enterClass={enterStart}
        enterToClass={enterEnd}
        exitClass={exitStart}
        exitToClass={exitEnd}
      >
        <Show when={props.selected}>
          <div class={titleWrapperStyle}>
            <div
              style={{
                width: variable('Size.space.small'),
              }}
            />
            <h1 class={titleStyle}>
              {props.title}
            </h1>
          </div>
        </Show>
      </Transition>
    </div>
  )
};

export default Tab;
