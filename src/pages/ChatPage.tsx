import { For } from 'solid-js';

import type { Component } from 'solid-js';
import { css } from '@linaria/core';
import { VscSearch } from 'solid-icons/vsc';
import ChatRoom from '@/components/chat/ChatRoom';

import Header from '@/components/Header';
import IconButton from '@/components/common/IconButton';
import VirtualList from '@/components/virtual/VirtualList';
import { variable } from '@/theme';
import { messageList, roomList } from '@/utils/dummy';

const containerStyle = css`
  width: 100%;
  height: 100%;

  overflow: auto;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const headerStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;

  z-index: 10000;
  backdrop-filter: blur(16px);
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;

    height: 56px;

    opacity: 0.5;
    background: ${variable('Color.WHITE')};
  }
`;

const ChatPage: Component = () => {
  return (
    <div className={containerStyle}>
      <Header
        className={headerStyle}
        rightIcon={<IconButton size={16} icon={VscSearch} />}
      >
        채팅
      </Header>
      <VirtualList
        items={roomList}
        style={'flex: 1'}
        itemHeight={56}
        topMargin={56}
      >
        {(room) => (
          <ChatRoom
            room={room}
            lastMessage={Math.random() > 0.5 ? messageList[~~(Math.random() * messageList.length)] : undefined}
            unread={~~(Math.random() * 10)}
            writing={Math.random() > 0.5}
          />
        )}
      </VirtualList>
    </div>
  );
};

export default ChatPage;

