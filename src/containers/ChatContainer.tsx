import IconButton from '@/components/common/IconButton';
import Header from '@/components/Header';
import VirtualList from '@/components/virtual/VirtualList';
import { clientUser, messageList } from '@/utils/dummy';
import { css } from '@linaria/core';
import { Component, createEffect, createSignal, onMount, Show } from 'solid-js';
import { variable } from '@/theme';
import ChatMessage, { ChatMessageProps } from '@/components/chat/bubble/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { ChatRoom, Message } from '@/types';
import Profile from '@/components/chat/Profile';
import useRoomMessage from '@/hooks/useRoomMessage';
import { nanoid } from 'nanoid';
import Stackable from '@/components/Stackable';
import InfoContainer from './InfoContainer';
import { useSearchParams } from 'solid-app-router';

const containerStyle = css`
  position: relative;
  touch-action: none;

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
  touch-action: pan-y;
  padding: ${variable('Size.space.medium')};

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

const inputWrapperStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const messageAnimationStyle = css`
  animation: message-other-animation ${variable('Animation.duration.short')} ${variable('Animation.easing.deceleration')};  

  &[data-mine="true"] {
    animation: message-mine-animation ${variable('Animation.duration.short')} ${variable('Animation.easing.deceleration')};  
  }

  @keyframes message-other-animation {
    0% {
      opacity: 0;
      transform: translate(-50%, 50%) scale(0);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
  }
  @keyframes message-mine-animation {
    0% {
      opacity: 0;
      transform: translate(50%, 50%) scale(0);
    }
    100% {
      opacity: 1;
      transform: translateX(0, 0) scale(1);
    }
  }
`;

const infoWrapperStyle = css`
  z-index: 1000000000;

  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-items: center;
`;

const infoContainerStyle = css`
  width: 100%;
  height: fit-content;

  @media (min-width: 640px) {
    max-width: 60vw;
  }
`;

export interface ChatContainerProps {
  room: ChatRoom;
  onClose?: () => void;
}

const ChatContainer: Component<ChatContainerProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInfo = () => searchParams.mode === 'info';
  
  let inputRef: HTMLInputElement | undefined;

  const [chatList, setChatList] = useRoomMessage(() => props.room);
  const [bottomMargin, setBottomMargin] = createSignal(56);
  const [readIndex, setReadIndex] = createSignal(0);

  const onSend = (text: string) => {
    setChatList([
      ...chatList(),
      {
        id: nanoid(),
        type: 'text',
        sender: clientUser,
        content: text,
        timestamp: Date.now(),
      }
    ]);
  };

  const onToggleInfo = () => {
    if (isInfo()) {
      history.back();
    } else {
      setSearchParams({
        mode: 'info',
      });
    }
  };

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
      id={'chat-container'}
      style={{
        '--scrollbar-track-margin-top': '56px',
        '--scrollbar-track-margin-bottom': `${bottomMargin()}px`,
      }}
      className={containerStyle}
    >
      <Header
        className={headerStyle}
        leftIcon={<IconButton icon={'arrow_back'} onClick={props.onClose} />}
        rightIcon={<IconButton icon={'menu'} onClick={onToggleInfo} />}
      >
        <Show when={!!props.room?.thumbnail}>
          <Profile
            url={props.room?.thumbnail}
            size={'medium'}
            style={{
              'margin-right': variable('Size.space.medium'),
            }}
          />
        </Show>
        {props.room?.title ?? '채팅방'}
      </Header>
      <VirtualList
        className={messageListStyle}
        items={chatList()}
        style={'flex: 1'}
        topMargin={56}
        bottomMargin={bottomMargin()}
        overscan={5}
      >
        {(item, index) => {
          const [type, setType] = createSignal<ChatMessageProps['type']>('first-last');

          createEffect(() => {
            let prevId = null;
            const currentId = item.sender.id;
            let nextId = null;
            if (index() > 0) prevId = chatList()[index() - 1].sender.id;
            if (index() < chatList().length - 1) nextId = chatList()[index() + 1].sender.id;

            if (prevId === currentId && nextId === currentId) setType('follow');
            else if (prevId !== currentId && nextId === currentId) setType('first');
            else if (prevId === currentId && nextId !== currentId) setType('last');
            else if (prevId !== currentId && nextId !== currentId) setType('first-last');
          });

          setReadIndex((it) => it < index() - 1 ? index() - 1 : it);

          return (
            <ChatMessage
              message={item}
              mine={clientUser.id === item.sender.id}
              type={type()}
              className={readIndex() < index() ? messageAnimationStyle : undefined}
            />
          );
        }}
      </VirtualList>
      <div className={inputWrapperStyle}>
        <ChatInput
          ref={inputRef}
          onSend={onSend}
        />
      </div>
      <Stackable
        open={isInfo()}
        direction={'down'}
        onBack={onToggleInfo}
        class={infoContainerStyle}
        outerClass={infoWrapperStyle}
        gestureRatio={1}
        positionStrategy={'fixed'}
      >
        <InfoContainer
          room={props.room}
        />
      </Stackable>
    </div>
  );
}

export default ChatContainer;
