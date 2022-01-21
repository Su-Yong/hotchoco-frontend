import { useCallback, useMemo, useState } from 'react';

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
import Header from '@/components/Header';
import { useTheme } from '@/theme';
import style from '@/utils/style';
import ChatBubblePlaceholder from '@/components/placeholder/ChatBubblePlaceholder';
import ChatInput, { ChatInputProps } from '@/components/ChatInput';
import { styled } from '@linaria/react';
import useManager from '@/hooks/useManager';
import RequestableChat from '@/types/request/RequestableChat';
import IconButton from '@/components/common/IconButton';

import ArrowLeft from '@iconify/icons-mdi/arrow-left';
import Menu from '@iconify/icons-mdi/menu';

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

const inputStyle = css`
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
`;

const gapElement = styled.div`
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
  const manager = useManager();

  const room = useMemo(() => manager.getRooms().find(({ id }) => id === chatRoomId), [chatRoomId, manager]);

  const onSubmit: NonNullable<ChatInputProps['onSubmit']> = useCallback(
    (chatdata) => {
      if (room) {
        const chat: RequestableChat<unknown> = {
          room,
          sender: clientUser,
          ...chatdata,
        };

        manager.send(chat);

        return true;
      }

      return false;
    },
    [manager],
  );

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
        <Header
          title={room?.name ?? '알 수 없음'}
          left={
            <>
              <IconButton icon={ArrowLeft} onClick={onBack} />
              <Profile url={room?.image} size={36} />
            </>
          }
          right={<IconButton icon={Menu} />}
        />
      </div>
      <Virtuoso
        alignToBottom
        data={chatList}
        components={{
          Header: gapElement,
          Footer: gapElement,
        }}
        atBottomThreshold={120}
        followOutput={'smooth'}
        initialTopMostItemIndex={chatList.length - 1}
        computeItemKey={computeItemKey}
        itemContent={(index, chat) => {
          let isHideProfile = false;
          let isHideSender = false;
          if (index < chatList.length - 1) isHideProfile = chat.sender.id === chatList[index + 1].sender.id;
          if (index > 0) isHideSender = chat.sender.id === chatList[index - 1].sender.id;

          return (
            <ChatBubble
              mine={chat.sender.id === clientUser.id}
              profile={isHideProfile ? undefined : profiles.get(chat.sender.id)}
              sender={isHideSender ? undefined : senders.get(chat.sender.id)}
              readers={chat.readers}
              time={new Date(chat.timestamp)}
            >
              <TextContent>{chat.content}</TextContent>
            </ChatBubble>
          );
        }}
      />
      <div className={inputStyle}>
        <ChatInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ChatRoomContainer;
