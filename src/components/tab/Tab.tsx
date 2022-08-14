import { variable } from '@/theme';
import { css } from '@linaria/core';
import { mergeProps, Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Transition } from 'solid-transition-group';

const containerStyle = css`
  width: 100%;
  height: 100%;

  position: relative;
  z-index: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;
  padding: ${variable('Size.space.medium')};

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  -webkit-tap-highlight-color: transparent;
  user-select: none;

`;
const horizontalStyle = css`
  flex-direction: row;
`;
const verticalStyle = css`
  flex-direction: column;
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

  *:hover > & {
    transform: scale(1);
    opacity: ${variable('Color.Transparency.clear')};
  }

  *:active > & {
    transform: scale(1);
    opacity: ${variable('Color.Transparency.translucent')};
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

const verticalAnimationStyle = css`
  --translate: translateY(-50%);
`;
const horizontalAnimationStyle = css`
  --translate: translateX(-50%);
`;

const enterStart = css`
  max-width: 0%;
  max-height: 0%;
  transform: var(--translate) scale(0);
  opacity: 0;
`;
const enterEnd = css`
  max-width: 100%;
  max-height: 100%;
  transform: translate(0%) scale(1);
  opacity: 1;

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;
const exitStart = css`
  max-width: 100%;
  max-height: 100%;
  transform: translate(0%) scale(1);
  opacity: 1;
`;
const exitEnd = css`
  max-width: 0%;
  max-height: 0%;
  transform: var(--translate) scale(0);
  opacity: 0;

  transition-duration: ${variable('Animation.duration.shorter')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};
`;

export interface TabProps {
  id: string;
  icon: JSX.Element;
  title: string;

  color?: string;
  selected?: boolean;
  direction?: 'vertical' | 'horizontal';

  onClick?: (id: string) => void;
}

const defaultTabProps = {
  direction: 'horizontal',
  color: variable('Primary.Main'),
};

const Tab = (props: TabProps) => {
  const local = mergeProps(defaultTabProps, props);

  const onClick = () => {
    local.onClick?.(local.id);
  };

  return (
    <div
      data-select={local.selected}
      classList={{
        [containerStyle]: true,
        [horizontalStyle]: local.direction === 'horizontal',
        [horizontalAnimationStyle]: local.direction === 'horizontal',
        [verticalStyle]: local.direction === 'vertical',
        [verticalAnimationStyle]: local.direction === 'vertical',
      }}
      onClick={onClick}
      style={{
        '--color': local.color,
      }}
    >
      <div class={iconOverlayStyle} />
      {local.icon}
      <Transition
        enterClass={enterStart}
        enterToClass={enterEnd}
        exitClass={exitStart}
        exitToClass={exitEnd}
      >
        <Show when={local.direction === 'horizontal' && local.selected}>
          <div class={titleWrapperStyle}>
            <div
              style={{
                width: variable('Size.space.small'),
                height: variable('Size.space.small'),
              }}
            />
            <h1 class={titleStyle}>
              {local.title}
            </h1>
          </div>
        </Show>
      </Transition>
    </div>
  )
};

export default Tab;
