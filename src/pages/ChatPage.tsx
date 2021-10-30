import React from 'react';

import { css } from '@linaria/core';

import ChatRoomContainer from '@/containers/ChatRoomContainer';
import RoomListContainer from '@/containers/RoomListContainer';
import dummy from '@/utils/dummy';
import useRoom from '@/hooks/useRoom';
import { useMediaMatch } from 'rooks';

const containerStyle = css`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row;

  & > * {
    flex: 1;
    overflow: hidden;
  }
`;

const emptyStyle = css`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ChatPage = (): JSX.Element => {
  const [roomId] = useRoom();
  const isMobile = useMediaMatch('(max-width: 600px)');

  return (
    <div className={containerStyle}>
      {isMobile && roomId ? undefined : <RoomListContainer rooms={dummy.rooms} />}
      {roomId ? (
        <ChatRoomContainer users={dummy.users} chatRoomId={roomId} initChats={dummy.chats} />
      ) : (
        <div className={emptyStyle}>채팅방을 선택해주세요.</div>
      )}
    </div>
  );
};

export default ChatPage;
