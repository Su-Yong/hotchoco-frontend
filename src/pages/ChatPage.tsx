import ChatRoomContainer from '@/containers/ChatRoomContainer';
import RoomListContainer from '@/containers/RoomListContainer';
import dummy from '@/utils/dummy';
import { css } from '@linaria/core';
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

const ChatPage = () => {
  const isMobile = useMediaMatch('(max-width: 600px)');

  if (isMobile) {
    return (
      <ChatRoomContainer
        users={dummy.users}
        chatRoomId={dummy.rooms[0].id}
        initChats={dummy.chats}
      />
    );
  }

  return (
    <div className={containerStyle}>
      <RoomListContainer rooms={dummy.rooms} />
      <ChatRoomContainer
        users={dummy.users}
        chatRoomId={dummy.rooms[0].id}
        initChats={dummy.chats}
      />
    </div>
  );
};

export default ChatPage;
