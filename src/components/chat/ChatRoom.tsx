import { variable } from '@/theme';
import { ChatRoom as ChatRoomType, Message } from '@/types';
import { css } from '@linaria/core';
import { Component, Show } from 'solid-js';
import ChatBadge from './ChatBadge';
import Profile from './Profile';

const containerStyle = css`
  position: relative;

  width: 100%;
  height: fit-content;

  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  gap: 4px;

  padding: 8px;
  cursor: pointer;

  transition: background ${variable('Animation.duration.short')} ${variable('Animation.easing.deceleration')};

  &::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 0;
    bottom: 0;

    width: 4px;
    background: ${variable('Color.Blue.500')};

    transition: transform ${variable('Animation.duration.short')} ${variable('Animation.easing.deceleration')};
  }

  &:hover {
    background: ${variable('Color.Grey.200')};
  }
  &:active, &:focus, &[data-selected="true"] {
    background: ${variable('Color.Grey.300')};
  }
  &:active::before, &:focus::before, &[data-selected='true']::before {
    transform: translateX(4px);
  }

  & > img {
    grid-row: 1 / span 2;
    margin-right: ${variable('Size.space.small')};

    justify-center: center;
    align-self: center;
  }

  & > .title {
    font-size: ${variable('Size.text.title')};
  }

  & > .message {
    font-size: ${variable('Size.text.subtitle')};
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > .timestamp {
    font-size: ${variable('Size.text.caption')};
  }

  & > .badge {
    width: fit-content;
    height: fit-content;

    grid-column: 3 / span 1;
    grid-row: 2 / span 1;

    justify-self: flex-end;

    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;

export interface ChatRoomProps {
  selected?: boolean;
  room: ChatRoomType;
  lastMessage?: Message;
  unread?: number;
  writing?: boolean;

  onClick?: (room: ChatRoomType) => void;
}

const ChatRoom: Component<ChatRoomProps> = (props) => {
  const timestamp = () => {
    const timeValue = props.lastMessage?.timestamp;
    if (timeValue) {
      const time = new Date(timeValue);
      return time.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit' });
    }

    return undefined;
  };

  return (
    <div
      className={containerStyle}
      data-selected={props.selected}
      onClick={() => props.onClick?.(props.room)}
    >
      <Show when={props.room.thumbnail}>
        <Profile url={props.room.thumbnail} />
      </Show>
      <div className={'title'}>{props.room.title}</div>
      <div className={'message'}>{props.lastMessage?.content}</div>
      <Show when={timestamp()}>
        <div className={'timestamp'}>{timestamp()}</div>
      </Show>
      <Show when={props.unread || props.writing}>
        <div className={'badge'}>
          <ChatBadge indeterminent={props.writing}>
            {props.unread ?? 0}
          </ChatBadge>
        </div>
      </Show>
    </div>
  );
}

export default ChatRoom;
