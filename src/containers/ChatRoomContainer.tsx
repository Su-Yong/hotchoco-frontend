import { useMemo, useState } from 'react';

import { css } from '@linaria/core';
import { Virtuoso, VirtuosoProps } from 'react-virtuoso';

import ChatBubble from '@/components/chat/ChatBubble';
import TextContent from '@/components/chat/content/TextContent';
import Profile from '@/components/chat/Profile';
import Typography from '@/components/common/Typography';
import useClientUser from '@/hooks/useClientUser';
import Chat from '@/types/Chat';
import User from '@/types/User';
import toBigInt from '@/utils/toBigInt';
import ChatHeader from '@/components/ChatHeader';
import { useTheme } from '@/theme';
import style from '@/utils/style';
import ChatBubblePlaceholder from '@/components/placeholder/ChatBubblePlaceholder';

const VELOCITY_BOUNDARY = 600;

const containerStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  background: var(--background);

  position: relative;
`;

const headerStyle = css`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
`;

const topStyle = css`
  width: 100%;
  height: 56px;
`;

const computeItemKey: VirtuosoProps<Chat>['computeItemKey'] = (_, { id }) => id;

export interface ChatRoomContainerProps {
  users: User[];
  chatList: Chat[];
  chatRoomId: string;

  onBack?: () => void;
}

const ChatRoomContainer = ({ users, chatList, chatRoomId, onBack }: ChatRoomContainerProps): JSX.Element => {
  const theme = useTheme();
  const clientUser = useClientUser();

  const background = useMemo(() => theme.palette.backgroundPrimary.main, [theme]);

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
    <div
      className={containerStyle}
      style={style({
        '--background': background,
      })}
    >
      <div className={headerStyle}>
        <ChatHeader chatRoomId={chatRoomId} onBack={onBack} />
      </div>
      <Virtuoso
        data={chatList}
        components={{
          Header: () => <div className={topStyle} />,
          ScrollSeekPlaceholder: ({ index }) => (
            <ChatBubblePlaceholder
              mine={chatList[index].sender.id === clientUser.id}
              animationType={'wave'}
            />
          ),
        }}
        scrollSeekConfiguration={{
          enter: (velocity) => Math.abs(velocity) > VELOCITY_BOUNDARY,
          exit: (velocity) => Math.abs(velocity) < VELOCITY_BOUNDARY - 50,
        }}
        initialTopMostItemIndex={chatList.length - 1}
        computeItemKey={computeItemKey}
        itemContent={(_, chat) => (
          <ChatBubble
            mine={chat.sender.id === clientUser.id}
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
