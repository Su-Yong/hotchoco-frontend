import ChatBubble from '@/components/chat/bubble/ChatBubble';
import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import VirtualList from '@/components/virtual/VirtualList';
import { clientUser, messageList } from '@/utils/dummy';
import { css } from '@linaria/core';
import { Component, createSignal } from 'solid-js';
import { VscArrowLeft } from 'solid-icons/vsc';
import { variable } from '@/theme';
import ChatMessage, { ChatMessageProps } from '@/components/chat/bubble/ChatMessage';

const containerStyle = css`
  width: 100%;
  height: 100%;

  overflow: auto;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const messageListStyle = css`
  padding: 0px 8px;
`;

const headerStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;

  z-index: 10000;
  backdrop-filter: blur(16px);
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;

    height: 56px;

    opacity: 0.5;
    background: ${variable('Color.WHITE')};
  }
`

export interface ChatContainerProps {

}

const ChatContainer: Component<ChatContainerProps> = ({
  
}) => {
  

  return (
    <div className={containerStyle}>
      <Header
        className={headerStyle}
        leftIcon={<IconButton icon={VscArrowLeft} />}
      >
        챗방
      </Header>
      <VirtualList
        className={messageListStyle}
        items={messageList}
        style={'flex: 1'}
        topMargin={56}
        overscan={5}
      >
        {(item, index) => {
          let type: ChatMessageProps['type'] = 'first-last';

          let prevId = null;
          const currentId = item.sender.id;
          let nextId = null;
          if (index() > 0) prevId = messageList[index() - 1].sender.id;
          if (index() < messageList.length - 1) nextId = messageList[index() + 1].sender.id;

          if (prevId === currentId && nextId === currentId) type = 'follow';
          else if (prevId !== currentId && nextId === currentId) type = 'first';
          else if (prevId === currentId && nextId !== currentId) type = 'last';
          else if (prevId !== currentId && nextId !== currentId) type = 'first-last';

          return (
            <ChatMessage
              message={item}
              mine={clientUser.id === item.sender.id}
              type={type}
            />
          );
        }}
      </VirtualList>
    </div>
  );
}

export default ChatContainer;
