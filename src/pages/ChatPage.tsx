import { For } from 'solid-js';

import type { Component } from 'solid-js';
import { css } from '@linaria/core';
import { VscSearch } from 'solid-icons/vsc';
import ChatRoom from '@/components/chat/ChatRoom';

import { User, ChatRoom as ChatRoomType, Message } from '@/types';
import { randAvatar, randFileName, randImg, randText, randUuid } from '@ngneat/falso';
import TextInput from '@/components/common/TextInput';
import Header from '@/components/Header';
import IconButton from '@/components/common/IconButton';

const containerStyle = css`
  width: 100%;
  height: 100%;

  overflow: auto;
`;

const userList: User[] = Array.from({ length: 10 })
  .map((_, i) => ({
    id: randUuid(),
    name: randFileName(),
    profile: randImg(),
  }));

const messageList: Message[] = Array.from({ length: 10 })
.map((_, i) => ({
  id: randUuid(),
  sender: userList[~~(Math.random() * userList.length)],
  content: randText(),
  timestamp: Date.now(),
}));

const roomList: ChatRoomType[] = Array.from({ length: 10 })
  .map((_, i) => ({
    id: randUuid(),
    title: randText(),
    type: 'group',
    members: userList.slice(
      ...[
        ~~(Math.random() * userList.length),
        ~~(Math.random() * userList.length),
      ].sort((a, b) => a - b)
    ),
    thumbnail: randImg(),
  }));

const ChatPage: Component = () => {
  return (
    <div className={containerStyle}>
      <Header>
        채팅
        <IconButton size={16} icon={VscSearch} />
      </Header>
      <For each={roomList}>
        {(room) => (
          <ChatRoom
            room={room}
            lastMessage={Math.random() > 0.5 ? messageList[~~(Math.random() * messageList.length)] : undefined}
            unread={~~(Math.random() * 10)}
            writing={Math.random() > 0.5}
          />
        )}
      </For>
    </div>
  );
};

export default ChatPage;

