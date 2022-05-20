import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import VirtualList from '@/components/virtual/VirtualList';
import { clientUser, messageList } from '@/utils/dummy';
import { css } from '@linaria/core';
import { Component, createSignal, onMount } from 'solid-js';
import { VscArrowLeft } from 'solid-icons/vsc';
import { variable } from '@/theme';
import ChatMessage, { ChatMessageProps } from '@/components/chat/bubble/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';

const containerStyle = css`
  position: relative;

  width: 100%;
  height: 100%;

  overflow: auto;
  background: ${variable('Color.WHITE')};

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const messageListStyle = css`
  padding: 0px 8px;

  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-track {
    margin-top: var(--scrollbar-track-margin-top, 0);
    margin-bottom: var(--scrollbar-track-margin-bottom, 0);

    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${variable('Color.Grey.300')};
    background-clip: padding-box;
    border-radius: 50px;
    border: solid 4px transparent;
  }
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

    opacity: ${variable('Color.Transparency.vague')};
    background: ${variable('Color.Grey.200')};
  }
`;

export interface ChatContainerProps {
  onClose?: () => void;
}

const ChatContainer: Component<ChatContainerProps> = (props) => {
  let inputRef: HTMLInputElement | undefined;

  const [count, setCount] = createSignal(0);
  const [bottomMargin, setBottomMargin] = createSignal(56);

  const addChat = (time = 1000) => {
    setCount((it) => it + 1);

    setTimeout(() => {
      addChat(Math.random() * 3000 + 1000);
    }, time);
  };

  setTimeout(() => {
    addChat();
  }, Math.random() * 3000 + 1000);

  onMount(() => {
    if (!inputRef) return;

    const resizeObserver = new ResizeObserver(() => {
      const { height } = inputRef!.getBoundingClientRect();

      setBottomMargin(height);
    });

    resizeObserver.observe(inputRef);
  });

  return (
    <div
      style={{
        '--scrollbar-track-margin-top': '56px',
        '--scrollbar-track-margin-bottom': `${bottomMargin()}px`,
      }}
      className={containerStyle}
    >
      <Header
        className={headerStyle}
        leftIcon={<IconButton icon={VscArrowLeft} onClick={props.onClose} />}
      >
        챗방
      </Header>
      <VirtualList
        className={messageListStyle}
        items={messageList.slice(0, count())}
        style={'flex: 1'}
        topMargin={56}
        bottomMargin={bottomMargin()}
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
              message={/*@once*/ item}
              mine={/*@once*/ clientUser.id === item.sender.id}
              type={/*@once*/ type}
            />
          );
        }}
      </VirtualList>
      <ChatInput ref={inputRef} />
    </div>
  );
}

export default ChatContainer;
