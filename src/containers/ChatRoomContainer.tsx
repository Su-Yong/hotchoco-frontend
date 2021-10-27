import ChatBubble from '@/components/chat/ChatBubble';
import TextContent from '@/components/chat/content/TextContent';
import Profile from '@/components/chat/Profile';
import Typography from '@/components/common/Typography';
import data from '@/utils/dummy';
import { css } from '@linaria/core';
import React, { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';

const containerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
`;

export interface ChatRoomContainerProps {
  users: string[]; // string[] -> User[]
  chatRoomId: string;
}

const ChatRoomContainer = ({ users, chatRoomId }: ChatRoomContainerProps): JSX.Element => {
  const profiles = useMemo(() => {
    const urls: string[] = users.map(() => {
      const r = '0' + Math.floor(Math.random() * 255).toString(16);
      const g = '0' + Math.floor(Math.random() * 255).toString(16);
      const b = '0' + Math.floor(Math.random() * 255).toString(16);

      return `https://dummyimage.com/120x120/${r.slice(-2)}${g.slice(-2)}${b.slice(-2)}/fff`;
    });

    const map = new Map<string, JSX.Element>();
    let index = 0;
    for (const user of users) {
      map.set(user, <Profile url={urls[index++]} />);
    }

    return map;
  }, [users]);

  return (
    <div className={containerStyle}>
      <Virtuoso
        data={data.data}
        itemContent={(index, content) => (
          <ChatBubble
            mine={data.users[index] === 'Velvet Natera'}
            profile={profiles.get(data.users[index])}
            sender={<Typography type={'body3'}>{data.users[index]}</Typography>}
            readers={['1', '2', '3']}
            time={new Date()}
          >
            <TextContent>{content}</TextContent>
          </ChatBubble>
        )}
      />
    </div>
  );
};

export default ChatRoomContainer;
