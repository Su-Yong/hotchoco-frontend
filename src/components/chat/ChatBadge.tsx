import { variable } from '@/theme';
import { css } from '@linaria/core';
import { Component, Show, splitProps } from 'solid-js';

const containerStyle = css`
  width: fit-content;
  min-width: 24px;

  padding: ${variable('Size.space.small')};
  display: inline-flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  font-size: ${variable('Size.text.caption')};
  color: ${variable('Color.Red.100')};
  background: ${variable('Color.Red.500')};

  border-radius: 50px;
`;

const indeterminateStyle = css`
  height: ${variable('Size.text.caption')};
  fill: ${variable('Color.Red.100')};

  & > * {
    animation: indeterminate ${variable('Animation.duration.long')} infinite both;
    animation-timing-function: ${variable('Animation.easing.linear')};
  }

  & > *:nth-child(1) {
    transform-origin: 25% 50%;
    animation-delay: calc(0 * ${variable('Animation.duration.long')} / 3);
  }
  & > *:nth-child(2) {
    transform-origin: 50% 50%;
    animation-delay: calc(1 * ${variable('Animation.duration.long')} / 3);
  }
  & > *:nth-child(3) {
    transform-origin: 75% 50%;
    animation-delay: calc(2 * ${variable('Animation.duration.long')} / 3);
  }

  @keyframes indeterminate {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }

    100% {
      transform: scale(1);
    }
  }
`;

export interface ChatBadgeProps {
  indeterminent?: boolean;
  children: number;
}

const ChatBadge: Component<ChatBadgeProps> = (props) => {
  const [local, children] = splitProps(props, ['indeterminent'], ['children']);

  return (
    <div className={containerStyle}>
      <Show when={local.indeterminent} fallback={children.children}>
        <svg viewBox={`0 0 48 24`} className={indeterminateStyle}>
          <circle cx="12" cy="12" r="4" />
          <circle cx="24" cy="12" r="4" />
          <circle cx="36" cy="12" r="4" />
        </svg>
      </Show>
    </div>
  );
}

export default ChatBadge;
