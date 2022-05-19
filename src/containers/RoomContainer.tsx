import ChatRoom from '@/components/chat/ChatRoom';
import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import VirtualList from '@/components/virtual/VirtualList';
import { variable } from '@/theme';
import { ChatRoom as ChatRoomType } from '@/types';
import { messageList } from '@/utils/dummy';
import { css } from '@linaria/core';
import { VscSearch, VscSettingsGear } from 'solid-icons/vsc';
import { Component, createEffect, createSignal } from 'solid-js';

const containerStyle = css`
  position: relative;
  width: 100%;
  height: 100%;

  z-index: 1;
  overflow: auto;
  background: ${variable('Color.WHITE')};

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

    opacity: ${variable('Color.Transparency.vague')};
    background: ${variable('Color.Grey.200')};
  }
`;

const roomListStyle = css`
  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-track {
    margin-top: var(--scrollbar-track-margin-top, 0);
    margin-bottom: var(--scrollbar-track-margin-bottom, 0);

    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${variable('Color.Grey.300')};
    background-clip: padding-box;
    border-radius: 50px;
    border: solid 4px transparent;
  }
`;

export interface RoomContainerProps {
  rooms: ChatRoomType[];
  selectedRoom?: ChatRoomType;
  onRoomSelect?: (room?: ChatRoomType) => void;
}

const RoomContainer: Component<RoomContainerProps> = (props) => {
  const [selectedRoom, setSelectedRoom] = createSignal<ChatRoomType | undefined>(props.selectedRoom);

  const onClick = (it: ChatRoomType | undefined) => {
    let value = undefined;
    if (it?.id === selectedRoom()?.id) setSelectedRoom(undefined);
    else {
      setSelectedRoom(it);
      value = it;
    }

    props.onRoomSelect?.(it);
  };

  createEffect(() => {
    setSelectedRoom(props.selectedRoom);
  });

  return (
    <div
      className={containerStyle}
      style={{
        '--scrollbar-track-margin-top': '56px',
      }}
    >
      <Header
        className={headerStyle}
        rightIcon={<>
          <IconButton size={16} icon={VscSearch} />
          <IconButton size={16} icon={VscSettingsGear} />
        </>}
      >
        채팅 ({props.rooms.length})
      </Header>
      <VirtualList
        items={props.rooms}
        style={'flex: 1'}
        itemHeight={56}
        topMargin={56}
        className={roomListStyle}
      >
        {(room) => (
          <ChatRoom
            selected={room.id === selectedRoom()?.id}
            room={room}
            lastMessage={Math.random() > 0.5 ? messageList[~~(Math.random() * messageList.length)] : undefined}
            unread={~~(Math.random() * 10)}
            writing={Math.random() > 0.5}
            onClick={onClick}
          />
        )}
      </VirtualList>
    </div>
  );
}

export default RoomContainer;
