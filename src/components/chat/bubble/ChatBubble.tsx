import { variable } from '@/theme';
import { ImageMessage, Message, TextMessage } from '@/types';
import { css, cx } from '@linaria/core';
import { Component, Match, Switch } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import ImageContent from './types/ImageContent';
import TextContent from './types/TextContent';

const bubbleStyle = css`
  position: relative;
  width: fit-content;

  @media (min-width: 640px) {
    max-width: 420px;
  };

  padding: 8px;
  border-radius: 8px;
  z-index: 1;

  background: ${variable('Color.Grey.200')};

  &.tail {
    &::before {
      content: '';
      position: absolute;
      left: calc(${variable('Size.space.medium')} * -1);
      bottom: 0;
      z-index: -1;
      width: ${variable('Size.space.medium')};
      height: ${variable('Size.space.medium')};
  
      background: linear-gradient(to bottom right, transparent 50%, ${variable('Color.Grey.200')} 50%);
    }
  
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: -1;
      width: ${variable('Size.space.medium')};
      height: ${variable('Size.space.medium')};
  
      background: linear-gradient(to bottom left, transparent 50%, ${variable('Color.Grey.200')} 50%);
    }
  }
`;

const mineStyle = css`
  background: ${variable('Color.Blue.200')};

  &.tail {
    &::before {
      left: unset;
      right: 0;

      background: linear-gradient(to bottom right, transparent 50%, ${variable('Color.Blue.200')} 50%);
    }

    &::after {
      left: unset;
      right: calc(${variable('Size.space.medium')} * -1);
      background: linear-gradient(to bottom left, transparent 50%, ${variable('Color.Blue.200')} 50%);
    }
  }
`;

export interface ChatBubbleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  message: Message;
  type?: 'mine' | 'other';
  isTail?: boolean;
}

const ChatBubble: Component<ChatBubbleProps> = ({
  message,
  type = 'other',
  isTail = false,
  ...props
}) => {
  

  return (
    <div
      {...props}
      className={cx(
        bubbleStyle, type === 'mine' && mineStyle,
        isTail && 'tail',
        props.className,
      )}
    >
      <Switch
        fallback={message.content}
      >
        <Match when={message.type === 'text'}>
          <TextContent content={(message as TextMessage).content} />
        </Match>
        <Match when={message.type === 'image'}>
          <ImageContent sources={(message as ImageMessage).content} />
        </Match>
      </Switch>
    </div>
  );
}

export default ChatBubble;
