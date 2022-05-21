import { createEffect, createSignal, on, onCleanup, onMount, Show } from 'solid-js';

import type { Component } from 'solid-js';
import { css } from '@linaria/core';
import { JSX } from 'solid-js/jsx-runtime';

import { getTheme, variable } from '@/theme';
import {roomList } from '@/utils/dummy';
import RoomContainer from '@/containers/RoomContainer';
import ChatContainer from '@/containers/ChatContainer';
import { ChatRoom } from '@/types';
import { roomContainerWidth, setRoomContainerWidth } from '@/store/room';
import { Transition } from 'solid-transition-group';
import { useNavigate, useParams, useSearchParams } from 'solid-app-router';
import createMediaSignal from '@/hooks/createMediaSignal';
import { cssTimeToMs } from '@/utils/css';

const GESTURE_OFFSET = 30;

const containerStyle = css`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: stretch;

  @media (max-width: 640px) {
    position: relative;
  }
`;

const roomContainerStyle = css`
  position: relative;
  z-index: 1;

  @media (min-width: 640px) {
    min-width: 320px;
    max-width: 60vw;
    width: var(--room-container-width, 320px);
  }

  @media (max-width: 640px) {
    &[data-active="false"] {
      --page-ratio: 1;
    }
    width: 100%;

    transform: translateX(calc((1 - var(--page-ratio)) * -10%));

    transition-duration: ${variable('Animation.duration.short')};
    transition-timing-function: ${variable('Animation.easing.deceleration')};

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 2;

      pointer-events: none;

      background: ${variable('Color.Grey.500')};
      opacity: calc((1 - var(--page-ratio)) * ${variable('Color.Transparency.translucent')});

      transition-duration: ${variable('Animation.duration.short')};
      transition-timing-function: ${variable('Animation.easing.deceleration')};
    }
  }
`;

const chatContainerStyle = css`
  position: relative;
  z-index: 2;
  flex: 1;

  @media (max-width: 640px) {
    position: absolute;
    inset: 0;

    pointer-events: none;

    & #chat-container {
      transform: translateX(calc(var(--page-ratio) * 100%));
    }

    &[data-animation="true"] #chat-container {
      transition-duration: ${variable('Animation.duration.short')} !important;
      transition-timing-function: ${variable('Animation.easing.deceleration')};
    }

    &[data-active="true"] {
      pointer-events: auto;
    }
  }
`;

const placeholderStyle = css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

const dividerStyle = css`
  @media (max-width: 640px) {
    display: none;
  }

  position: absolute;
  top: 0;
  bottom: 0;
  left: clamp(320px, calc(var(--room-container-width, 320px) - 4px), 60vw);

  z-index: 100;
  user-drag: none;
  user-select: none;
  touch-action: none;

  width: 8px;
  height: 100%;

  cursor: col-resize;
  background: ${variable('Color.WHITE')};
  opacity: 0;

  transition-property: opacity, background;
  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  &:hover {
    opacity: 0.5;
    background: ${variable('Color.Grey.300')};
  }

  &[data-visible="true"] {
    opacity: 1;
    background: ${variable('Color.Grey.300')};
  }
`;

const slideInStart = css`
  opacity: 0;
  transform: translateX(50%);

  @media (max-width: 640px) {
    opacity: 1;
    --page-ratio: 1;
  }
`;

const slideInEnd = css`
  opacity: 1;
  transform: translateX(0);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};

  @media (max-width: 640px) {
    opacity: 1;
    --page-ratio: 0;
  }
`;

const slideOutStart = css`
  opacity: 1;
  transform: translateX(0);

  @media (max-width: 640px) {
    opacity: 1;
  }
`;

const slideOutEnd = css`
  opacity: 0;
  transform: translateX(50%);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};

  @media (max-width: 640px) {
    opacity: 1;

    --page-ratio: 1;
  }
`;

const fadeIn = css`
  opacity: 1;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};
`;
const fadeOut = css`
  opacity: 0;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};
`;

const ChatPage: Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isScreenNarrow = createMediaSignal('(max-width: 640px)');
  const [pageRatio, setPageRatio] = createSignal(0);
  const [animation, setAnimation] = createSignal(false);

  const selectedRoomId = () => searchParams.id;
  const selectedRoom = () => roomList.find((it) => it.id === selectedRoomId());
  const setSelectedRoom = (room?: ChatRoom) => {
    if (room) setSearchParams({ id: room.id }, { replace: !!selectedRoomId() });
    else history.back();
  };

  let startWidth: number | null = null;
  const [startX, setStartX] = createSignal<number | null>(null);
  const onDividerDown: JSX.EventHandlerUnion<HTMLDivElement, PointerEvent> = (event) => {
    setStartX(event.clientX);
    startWidth = roomContainerWidth();

    event.target.setPointerCapture(event.pointerId);
  };
  const onDividerMove: JSX.EventHandlerUnion<HTMLDivElement, PointerEvent> = (event) => {
    const x = startX();
    if (x === null || startWidth === null) return;

    const { clientX } = event;
    const diff = clientX - x;

    setRoomContainerWidth(~~Math.max(320, startWidth + diff));
  };
  const onDividerUp: JSX.EventHandlerUnion<HTMLDivElement, PointerEvent> = (event) => {
    setStartX(null);
    startWidth = null;

    event.target.releasePointerCapture(event.pointerId);
  };

  let moveX = 0;
  let lastScreenX = 0;
  let startScreenX: number | null = null;
  let isMove = false;
  const onGestureStart = (event: TouchEvent) => {
    const screenX = event.touches.item(0)?.clientX ?? document.body.clientWidth;
    
    if (isScreenNarrow() && screenX < document.body.clientWidth / 2) startScreenX = screenX;
  };
  const onGesture = (event: TouchEvent) => {
    if (typeof startScreenX !== 'number') return;

    const screenX = event.touches.item(0)?.clientX;
    if (!screenX) return;

    if (!isMove && Math.abs(startScreenX - screenX) > GESTURE_OFFSET) isMove = true;

    if (isMove) {
      moveX += screenX - lastScreenX;
      lastScreenX = screenX;
  
      const ratio = Math.min(Math.max((moveX - startScreenX) / document.body.clientWidth, 0), 1);
      setPageRatio(ratio);
    }
  };
  const onGestureEnd = () => {
    if (typeof startScreenX === 'number') {
      if (pageRatio() > 0.5) {
        if (selectedRoom()) setSelectedRoom();
      } else {
        setAnimation(true);
        setPageRatio(0);
      }

      const duration = cssTimeToMs(getTheme().Animation.duration.short);

      if (typeof duration === 'number') {
        setTimeout(() => {
          setAnimation(false);
          setPageRatio(0);
        }, duration);
      }

      isMove = false;
      startScreenX = null;
    }
  };

  const onItemClick = (id: string) => {
    if (id === 'settings') navigate('../preference');
  };

  onMount(() => {
    document.body.addEventListener('touchstart', onGestureStart);
    document.body.addEventListener('touchmove', onGesture);
    document.body.addEventListener('touchend', onGestureEnd);
  });

  onCleanup(() => {
    document.body.removeEventListener('touchstart', onGestureStart);
    document.body.removeEventListener('touchmove', onGesture);
    document.body.removeEventListener('touchend', onGestureEnd);
  });

  return (
    <div
      className={containerStyle}
      style={{
        '--room-container-width': `${roomContainerWidth()}px`,
        '--page-ratio': pageRatio(),
      }}  
    >
      <div
        data-active={selectedRoom() !== undefined}
        className={roomContainerStyle}
      >
        <RoomContainer
          rooms={roomList}
          selectedRoom={selectedRoom()}
          onRoomSelect={setSelectedRoom}
          onItem={onItemClick}
        />
      </div>
      <div
        data-visible={startX() !== null}
        className={dividerStyle}
        onPointerDown={onDividerDown}
        onPointerMove={onDividerMove}
        onPointerUp={onDividerUp}
      />
      <div
        data-active={selectedRoom() !== undefined}
        data-animation={animation()}
        className={chatContainerStyle}
      >
        <Transition
          enterClass={slideInStart}
          enterToClass={slideInEnd}
          exitClass={slideOutStart}
          exitToClass={slideOutEnd}
        >
          <Show when={selectedRoom() !== undefined}>
            <ChatContainer onClose={() => setSelectedRoom()} />
          </Show>
        </Transition>
        <Transition
          enterClass={fadeOut}
          enterToClass={fadeIn}
          exitClass={fadeIn}
          exitToClass={fadeOut}
        >
          <Show when={selectedRoom() === undefined}>
            <div className={placeholderStyle}>
              채팅방을 선택해주세요
            </div>
          </Show>
        </Transition>
      </div>
    </div>
  );
};

export default ChatPage;

