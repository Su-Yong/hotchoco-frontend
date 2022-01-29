import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { css } from '@linaria/core';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ChatRoomContainer from '@/containers/ChatRoomContainer';
import RoomListContainer from '@/containers/RoomListContainer';
import dummy from '@/utils/dummy';
import useRoom from '@/hooks/useRoom';
import style from '@/utils/style';
import useManager from '@/hooks/useManager';
import Room from '@/types/Room';
import Chat from '@/types/Chat';
import { useAtom } from 'jotai';
import { chats, unreadChats } from '@/store/chat';
import { Route, Switch, useLocation } from 'wouter';
import { useTheme } from '@/theme';
import { Color } from '@/utils/Color';
import roomListWidth from '@/store/settings';

const containerStyle = css`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row;
`;

const roomStyle = css`
  position: absolute;
  height: 100%;
  flex: 1;
  overflow: hidden;

  position: relative;

  @media (max-width: 600px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const emptyStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  flex: 1;

  @media (max-width: 600px) {
    visibility: hidden;
    display: none;
  }
`;

const roomListStyle = css`
  height: 100%;
  background: var(--background);

  position: relative;

  transition: transform 0.25s, filter 0.25s;

  @media (max-width: 600px) {
    flex: 1;

    &[data-in-room='true'] {
      transform: translateX(-5%);
      filter: brightness(50%);
    }
  }

  @media (min-width: 600px) {
    min-width: 320px;
    max-width: 50%;
    width: var(--size);
  }
`;

const dividerStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  right: -4px;
  width: 8px;
  height: 100%;
  z-index: 100;

  cursor: col-resize;
  background: transparent;

  transition: all 0.1s;

  &:hover {
    background: var(--select-background);
  }

  &:active {
    cursor: col-resize;
    background: var(--select-active-background);
  }
`;

const roomContainerStyle = css`
  position: relative;

  @media (min-width: 600px) {
    flex: 1;
  }

  @media (max-width: 600px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &[data-in-room='false'] {
      pointer-events: none;
    }
  }
`;

const ChatPage = (): JSX.Element => {
  const theme = useTheme();
  const manager = useManager();
  const [roomId, setRoom] = useRoom();
  const [location] = useLocation();

  const roomListRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useAtom(roomListWidth);
  const [rooms, setRooms] = useState(manager.getRooms());

  const [allChats, updateChats] = useAtom(chats);
  const [allUnreadChats, updateUnreadChats] = useAtom(unreadChats);

  const selectBackground = useMemo(() => Color(theme.palette.backgroundSecondary.main).darken(0.1).alpha(0.5).get(), [theme]);
  const selectActiveBackground = useMemo(() => Color(selectBackground).alpha(1).get(), [selectBackground]);

  const onResize: React.DragEventHandler<HTMLDivElement> = useCallback(({ clientX }) => {
    if (clientX) {
      setSize(clientX);
    }
  }, [roomListRef]);

  const onBack = useCallback(() => {
    setRoom();
  }, []);

  useEffect(() => {
    // 같은 array로 판단하여 react가 업데이트 하지 않은것으로 추정됨.
    // 무슨이유인지는 모르겠지만, 새 Array로 만들어 주니 제대로 렌더링 되는것을 확인할 수 있음
    // 이전까지는 컴포넌트를 선택해야 리렌더링이 되었음.
    const updateRoom = () => {
      const newRooms: Room[] = [...manager.getRooms()];

      if (roomId && !newRooms.find(({ id }) => id === roomId)) {
        onBack();
      }

      setRooms(newRooms);
    };

    const updateChat = (room: Room, chat: Chat) => {
      const getNewMap = (it: Map<string, Chat[]>) => {
        it.set(room.id, [...(it.get(room.id) ?? []), chat]);

        return new Map(it);
      };

      updateUnreadChats(getNewMap);
      updateChats(getNewMap);
    };

    updateRoom();
    manager.on('enter', updateRoom);
    manager.on('exit', updateRoom);
    manager.on('chat', updateChat);

    return () => {
      manager.removeListener('enter', updateRoom);
      manager.removeListener('exit', updateRoom);
      manager.removeListener('chat', updateChat);
    };
  }, [manager, roomId, onBack]);

  useEffect(() => {
    manager.getRooms().forEach((it) => {
      it.unreadChat = allUnreadChats.get(it.id)?.length;
    });
  }, [allUnreadChats, manager]);

  return (
    <div
      className={containerStyle}
      style={style({
        '--background': theme.palette.backgroundPrimary.main,
        '--size': `${size ?? 360}px`,
        '--select-background': selectBackground,
        '--select-active-background': selectActiveBackground,
      })}
    >
      <div ref={roomListRef} className={roomListStyle} data-in-room={!!roomId}>
        <RoomListContainer rooms={rooms} />
        <div className={dividerStyle} onDrag={onResize} />
      </div>
      <TransitionGroup className={roomContainerStyle} data-in-room={!!roomId}>
        <CSSTransition in unmountOnExit key={location} classNames={'room'} timeout={250}>
          <Switch location={location}>
            <Route path={'/chat'}>
              <div className={emptyStyle}>채팅방을 선택해주세요.</div>
            </Route>
            <Route path={'/chat/:room_id'}>
              {({ room_id: roomId }) => (
                <div className={roomStyle}>
                  <ChatRoomContainer users={dummy.users} chatRoomId={roomId} chatList={allChats.get(roomId) ?? []} onBack={onBack} />
                </div>
              )}
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default ChatPage;
