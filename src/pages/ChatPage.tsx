import ChatRoomContainer from "@/containers/ChatRoomContainer";
import data from "@/utils/dummy";

const ChatPage = () => {
  return (
    <ChatRoomContainer
      users={data.users}
      chatRoomId={'test'}
    />
  )
};

export default ChatPage;
