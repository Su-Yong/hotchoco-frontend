import { variable } from '@/theme';
import { Message } from '@/types';
import { css, cx } from '@linaria/core';
import { Component, Match, Switch } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import TextContent from './types/TextContent';

const bubbleStyle = css`
  width: fit-content;

  @media (min-width: 640px) {
    max-width: 60vw;
  };

  padding: 8px;
  border-radius: 8px;

  background: ${variable('Color.Grey.200')};
`;

export interface ChatBubbleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  message: Message;
}

const ChatBubble: Component<ChatBubbleProps> = ({
  message,
  ...props
}) => {
  

  return (
    <div {...props} className={cx(bubbleStyle, props.className)}>
      <Switch
        fallback={message.content}
      >
        <Match when={message.type === 'text'}>
          <TextContent content={message.content} />
        </Match>
      </Switch>
    </div>
  );
}

export default ChatBubble;
