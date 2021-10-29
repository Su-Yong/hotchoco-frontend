import ChatRoomContainer from '@/containers/ChatRoomContainer';
import RoomListContainer from '@/containers/RoomListContainer';
import data from '@/utils/dummy';
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
    return <ChatRoomContainer users={data.users} chatRoomId={'test'} />;
  }

  return (
    <div className={containerStyle}>
      <RoomListContainer rooms={['그냥 방1', '테스트방 1', '아무거나', '뭐하지']} />
      <ChatRoomContainer users={data.users} chatRoomId={'test'} />
    </div>
  );
};

export default ChatPage;
