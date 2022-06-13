import ChatRoom from '@/components/chat/ChatRoom';
import Profile from '@/components/chat/Profile';
import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import VirtualList from '@/components/virtual/VirtualList';
import useRoomMessage from '@/hooks/useRoomMessage';
import { roomLayout } from '@/store/room';
import { variable } from '@/theme';
import { ChatRoom as ChatRoomType } from '@/types';
import { messageList } from '@/utils/dummy';
import { css, cx } from '@linaria/core';
import { Component, createEffect, createSignal, For } from 'solid-js';

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
  width: 100%;

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

const listLayoutOuter = css`
  flex-flow: column;
`;

const gridLayoutOuter = css`
  width: 100%;

  display: flex;
  flex-flow: column;
  gap: ${variable('Size.space.small')};
`;

const gridLayout = css`
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  gap: ${variable('Size.space.small')};
`;

const gridItemStyle = css`
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${variable('Size.space.small')};

  background: ${variable('Color.Grey.100')};
  padding: ${variable('Size.space.medium')};

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  & > img {
    flex-shrink: 0;
  }
  & > span {
    font-size: ${variable('Size.text.title')};
    flex-shrink: 1;
  }

  &:hover, &:active {
    background: ${variable('Color.Grey.200')};
  }
`;

export interface RoomContainerProps {
  rooms: ChatRoomType[];
  selectedRoom?: ChatRoomType;
  onRoomSelect?: (room?: ChatRoomType) => void;

  onItem?: (id: string) => void;
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

    props.onRoomSelect?.(value);
  };

  createEffect(() => {
    setSelectedRoom(props.selectedRoom);
  });

  const RoomRenderer = (list: ChatRoomType | ChatRoomType[]) => {
    if (Array.isArray(list)) {
      return (
        <div className={gridLayout}>
          <For each={list}>
            {(room) => {
              const onSelect = () => {
                if (room.id === selectedRoom()?.id) onClick(undefined);
                onClick(room);
              };

              return (
                <div
                  className={gridItemStyle}
                  onClick={onSelect}
                >
                  <Profile
                    url={room.thumbnail}
                    ring={room.id === selectedRoom()?.id ? 'Blue.500' : undefined}
                  />
                  <span>{room.title}</span>
                </div>
              );
            }}
          </For>
        </div>
      );
    }

    const [roomMessage] = useRoomMessage(() => list);

    createEffect(() => {
      // console.log('newMessage ' + roomMessage()?.slice(-1)?.[0]?.content);
    });

    return (
      <ChatRoom
        selected={list.id === selectedRoom()?.id}
        room={list}
        lastMessage={roomMessage()?.slice(-1)?.[0]}
        unread={0}
        writing={false}
        onClick={onClick}
      />
    );
  };

  const targetItems = (): ChatRoomType[][] | ChatRoomType[] => {
    if (roomLayout() === 'grid') {
      const result: ChatRoomType[][] = [];
      props.rooms.forEach((room, index) => {
        if (index % 4 === 0) result.push([room]);
        else result[result.length - 1].push(room);
      });

      return result;
    }

    return props.rooms;
  }

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
          <IconButton size={variable('Size.icon.small')} icon={'search'} onClick={() => props.onItem?.('search')} />
          <IconButton size={variable('Size.icon.small')} icon={'settings'} onClick={() => props.onItem?.('settings')} />
        </>}
      >
        채팅 ({props.rooms.length})
      </Header>
      <VirtualList<ChatRoomType | ChatRoomType[]>
        items={targetItems()}
        style={'flex: 1'}
        innerClassName={cx(
          roomLayout() === 'list' && listLayoutOuter,
          roomLayout() === 'grid' && gridLayoutOuter,
        )}
        itemHeight={56}
        topMargin={56}
        className={roomListStyle}
      >
        {RoomRenderer}
      </VirtualList>
    </div>
  );
}

export default RoomContainer;
