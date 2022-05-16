import { variable } from '@/theme';
import { ChatRoom as ChatRoomType, Message } from '@/types';
import { css } from '@linaria/core';
import { randNumber, seed } from '@ngneat/falso';
import { Component, createMemo } from 'solid-js';
import ChatBadge from './ChatBadge';

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
  &:active::before, &:focus::before {
    transform: translateX(4px);
  }

  & > img {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    object-fit: cover;
    aspect-ratio: 1;
    grid-row: 1 / span 2;
    margin-right: 4px;

    justify-center: center;
    align-self: center;
  }

  & > .title {
    font-size: 18px;
  }

  & > .message {
    font-size: 16px;
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  room: ChatRoomType;
  lastMessage?: Message;
  unread?: number;
  writing?: boolean;
}

const ChatRoom: Component<ChatRoomProps> = ({
  room,
  lastMessage,
  unread,
  writing,
}) => {
  const timestamp = createMemo(() => {
    if (lastMessage) {
      const time = new Date(lastMessage.timestamp);
      return time.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit' });
    }

    return undefined;
  });

  return (
    <div className={containerStyle}>
      {room.thumbnail && <img src={room.thumbnail} />}
      <div className={'title'}>{room.title}</div>
      <div className={'message'}>{lastMessage?.content}</div>
      {timestamp && <div className={'timestamp'}>{timestamp}</div>}
      {(unread || writing) && (
        <div className={'badge'}>
          <ChatBadge indeterminent={writing}>
            {unread ?? 0}
          </ChatBadge>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
