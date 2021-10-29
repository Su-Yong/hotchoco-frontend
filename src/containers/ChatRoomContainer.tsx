import ChatBubble from '@/components/chat/ChatBubble';
import TextContent from '@/components/chat/content/TextContent';
import Profile from '@/components/chat/Profile';
import Typography from '@/components/common/Typography';
import useClientUser from '@/hooks/useClientUser';
import Chat from '@/types/Chat';
import User from '@/types/User';
import data from '@/utils/dummy';
import toBigInt from '@/utils/toBigint';
import { css } from '@linaria/core';
import React, { useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

const containerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
`;

export interface ChatRoomContainerProps {
  users: User[];
  initChats?: Chat[];
  chatRoomId: string;
}

const ChatRoomContainer = ({ users, initChats, chatRoomId }: ChatRoomContainerProps): JSX.Element => {
  const clientUser = useClientUser();

  const [chatList, setChatList] = useState<Chat[]>(initChats ?? []);

  const profiles = useMemo(() => {
    const result = new Map<string, JSX.Element>();

    users.forEach((user) => {
      result.set(user.id, <Profile key={user.id} url={user.profile} />);
    });

    return result;
  }, [users]);

  const senders = useMemo(() => {
    const result = new Map<string, JSX.Element>();

    users.forEach((user) => {
      const rgb = ((toBigInt(user.id) * toBigInt(chatRoomId)) % (0xffffffn + 1n)).toString(16);
      result.set(
        user.id,
        <Typography key={user.id} type={'body3'} style={{ color: `#${rgb}` }}>
          {user.name}
        </Typography>,
      );
    });

    return result;
  }, [users, chatRoomId]);

  return (
    <div className={containerStyle}>
      <Virtuoso
        data={chatList}
        itemContent={(_, chat) => (
          <ChatBubble
            mine={chat.id === clientUser.id}
            profile={profiles.get(chat.sender.id)}
            sender={senders.get(chat.sender.id)}
            readers={chat.readers}
            time={new Date(chat.timestamp)}
          >
            <TextContent>{chat.content}</TextContent>
          </ChatBubble>
        )}
      />
    </div>
  );
};

export default ChatRoomContainer;
