import { variable } from '@/theme';
import { Message, User } from '@/types';
import { css, cx } from '@linaria/core';
import { Component, Show } from 'solid-js';
import UserProfile from '../UserProfile';
import ChatBubble from './ChatBubble';

const containerStyle = css`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 4px;

  & > .profile {
    grid-row: 1 / span 2;

    align-self: flex-end;
  }

  & > .sender-name {
    grid-row: 1 / 2;
    grid-column: 2 / span 2;
    font-size: 16px;
  }

  & > .bubble {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  & > .info {
    font-size: 12px;
    color: ${variable('Color.Grey.500')};

    grid-row: 2 / span 1;
    grid-column: 3 / span 1;
    align-self: flex-end;
  }
`;

const mineStyle = css`
  grid-template-columns: 1fr auto auto;
  grid-template-rows: auto 1fr auto;

  justify-items: flex-end;

  & > .profile {
    grid-row: 1 / span 2;
    grid-column: 3 / span 1;
  }

  & > .sender-name {
    grid-row: 1 / 2;
    grid-column: 1 / span 2;
  }

  & > .bubble {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  & > .info {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }
`;

const profileDummyStyle = css`
  width: 36px;
  height: 36px;
`;

const profileDummy = () => <div className={cx(profileDummyStyle, 'profile')} />

export interface ChatMessageProps {
  message: Message;
  mine?: boolean;
  type?: 'follow' | 'first' | 'last' | 'first-last';
}

const ChatMessage: Component<ChatMessageProps> = ({
  message,
  mine,
  type = 'first-last',
}) => {
  const { sender, content } = message;
  
  const time = new Date(message.timestamp);
  const timeString = time.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cx(containerStyle, mine && mineStyle)}>
      <Show when={type === 'first-last' || type === 'last'} fallback={profileDummy}>
        <UserProfile className={'profile'} user={sender} />
      </Show>
      <Show when={type === 'first-last' || type === 'first'}>
        <div className={'sender-name'}>{sender.name}</div>
      </Show>
      <ChatBubble className={'bubble'} message={message} />
      <div className={'info'}>{timeString}</div>
    </div>
  );
}

export default ChatMessage;
