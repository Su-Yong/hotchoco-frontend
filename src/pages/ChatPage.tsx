import { useMemo } from 'react';

import { css } from '@linaria/core';
import { useRoute } from 'wouter';

import ChatRoomContainer from '@/containers/ChatRoomContainer';
import RoomListContainer from '@/containers/RoomListContainer';
import dummy from '@/utils/dummy';
import useRoom from '@/hooks/useRoom';

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

const chatStyle = css`
  flex: 1;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ChatPage = (): JSX.Element => {
  const [roomId] = useRoom();

  return (
    <div className={containerStyle}>
      <RoomListContainer rooms={dummy.rooms} />
      <div className={chatStyle}>
        {
          roomId
            ? (
              <ChatRoomContainer
                users={dummy.users}
                chatRoomId={roomId}
                initChats={dummy.chats}
              />
            ) : (
              <div>
                채팅방을 선택해주세요.
              </div>
            )
        }
      </div>
    </div>
  );
};

export default ChatPage;
