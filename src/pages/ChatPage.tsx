import { useCallback, useEffect, useState } from 'react';

import { css } from '@linaria/core';
import { Transition } from 'react-transition-group';

import ChatRoomContainer from '@/containers/ChatRoomContainer';
import RoomListContainer from '@/containers/RoomListContainer';
import dummy from '@/utils/dummy';
import useRoom from '@/hooks/useRoom';
import style from '@/utils/style';
import useManager from '@/hooks/useManager';
import Room from '@/types/Room';

const containerStyle = css`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row;
`;

const roomStyle = css`
  flex: 1;
  overflow: hidden;

  position: relative;

  @media (max-width: 600px) {
    visibility: var(--is-visible);
  }
`;

const emptyStyle = css`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  position: absolute;

  @media (max-width: 600px) {
    visibility: hidden;
    display: none;
  }
`;

const transitionStyle = css`
  width: 100%;
  height: 100%;

  transition: opacity 0.25s, transform 0.25s;

  @media (min-width: 600px) {
    &[data-state='entering'] {
      opacity: 0;
      transform: translateX(25%);
    }
    &[data-state='entered'] {
      opacity: 1;
      transform: translateX(0);
    }
    &[data-state='exiting'] {
      opacity: 0;
      transform: translateX(-25%);
    }
    &[data-state='exited'] {
      display: none;
    }
  }

  @media (max-width: 600px) {
    &[data-state='entering'] {
      transform: translateX(100%);
    }
    &[data-state='entered'] {
      transform: translateX(0);
    }
    &[data-state='exiting'] {
      transform: translateX(100%);
    }
    &[data-state='exited'] {
      display: none;
    }
  }
`;

const roomListStyle = css`
  flex: 1;

  @media (min-width: 600px) {
    max-width: 360px;
  }

  @media (max-width: 600px) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const ChatPage = (): JSX.Element => {
  const manager = useManager();
  const [roomId, setRoom] = useRoom();

  const [transition, setTransition] = useState(false);
  const [rooms, setRooms] = useState(manager.getRooms());

  const onBack = useCallback(() => {
    setTransition(false);

    setTimeout(() => {
      setRoom();
    }, 250);
  }, []);

  useEffect(() => {
    if (roomId) {
      setTransition(true);
    }
  }, [roomId]);

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

    updateRoom();
    manager.on('enter', updateRoom);
    manager.on('exit', updateRoom);

    return () => {
      manager.removeListener('enter', updateRoom);
      manager.removeListener('exit', updateRoom);
    };
  }, [manager, roomId, onBack]);

  return (
    <div className={containerStyle}>
      <div className={roomListStyle}>
        <RoomListContainer rooms={rooms} />
      </div>
      <div
        className={roomStyle}
        style={style({
          '--is-visible': roomId ? 'visible' : 'hidden',
        })}
      >
        <div className={emptyStyle}>채팅방을 선택해주세요.</div>
        <Transition in={transition} timeout={250}>
          {(state: string) => (
            <div className={transitionStyle} data-state={state}>
              {roomId && <ChatRoomContainer users={dummy.users} chatRoomId={roomId} initChats={dummy.chats} onBack={onBack} />}
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default ChatPage;
