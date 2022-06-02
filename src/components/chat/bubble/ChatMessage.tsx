import { variable } from '@/theme';
import { Message, User } from '@/types';
import { css, cx } from '@linaria/core';
import { Component, mergeProps, Show } from 'solid-js';
import Profile from '../Profile';
import ChatBubble from './ChatBubble';

const containerStyle = css`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: auto 1fr auto;
  gap: ${variable('Size.space.small')};

  & > .profile {
    grid-row: 1 / span 2;

    align-self: flex-end;
  }

  & > .sender-name {
    grid-row: 1 / 2;
    grid-column: 2 / span 2;
    font-size: ${variable('Size.text.subtitle')};
  }

  & > .bubble {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  & > .info {
    padding-right: ${variable('Size.icon.large')};

    white-space: nowrap;
    font-size: ${variable('Size.text.caption')};
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
    text-align: end;
    padding-right: 0;
    padding-left: ${variable('Size.icon.large')};

    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }
`;

const profileDummyStyle = css`
  width: ${variable('Size.icon.medium')};
  height: ${variable('Size.icon.medium')};
`;

const profileDummy = () => <div className={cx(profileDummyStyle, 'profile')} />

export interface ChatMessageProps {
  message: Message;
  mine?: boolean;
  type?: 'follow' | 'first' | 'last' | 'first-last';

  className?: string;
}

const ChatMessage: Component<ChatMessageProps> = (props) => {
  const local = mergeProps({ type: 'first-last'}, props);

  const time = () => new Date(local.message.timestamp);
  const timeString = () => time().toLocaleString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      data-mine={local.mine}
      className={cx(containerStyle, local.mine && mineStyle, props.className)}
    >
      <Show
        when={!local.mine && (local.type === 'first-last' || local.type === 'last')}
        fallback={local.mine ? null : profileDummy}
      >
        <Profile
          className={'profile'}
          url={local.message.sender.profile}
          size={'medium'}
        />
      </Show>
      <Show when={!local.mine && (local.type === 'first-last' || local.type === 'first')}>
        <div className={'sender-name'}>{local.message.sender.name}</div>
      </Show>
      <ChatBubble
        type={local.mine ? 'mine' : 'other'}
        isTail={local.type === 'last' || local.type === 'first-last'}
        className={'bubble'}
        message={local.message}
      />
      <div className={'info'}>{timeString()}</div>
    </div>
  );
}

export default ChatMessage;
