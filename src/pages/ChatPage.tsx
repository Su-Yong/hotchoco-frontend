import { useCallback, useEffect, useState } from 'react';

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
import { chats } from '@/store/chat';
import { Route, Switch, useLocation } from 'wouter';
import { useTheme } from '@/theme';

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
  flex: 1;
  height: 100%;
  background: var(--background);

  transition: transform 0.25s, filter 0.25s;

  @media (max-width: 600px) {
    &[data-in-room='true'] {
      transform: translateX(-5%);
      filter: brightness(50%);
    }
  }

  @media (min-width: 600px) {
    max-width: 360px;
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

  const [rooms, setRooms] = useState(manager.getRooms());

  const [allChats, updateChats] = useAtom(chats);

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
      updateChats((it) => {
        it.set(room.id, [...(it.get(room.id) ?? []), chat]);

        return new Map(it);
      });
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

  return (
    <div
      className={containerStyle}
      style={style({
        '--background': theme.palette.backgroundPrimary.main,
      })}
    >
      <div className={roomListStyle} data-in-room={!!roomId}>
        <RoomListContainer rooms={rooms} />
      </div>
      <TransitionGroup className={roomContainerStyle} data-in-room={!!roomId}>
        <CSSTransition
          in
          unmountOnExit
          key={location}
          classNames={'room'}
          timeout={250}
        >
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
