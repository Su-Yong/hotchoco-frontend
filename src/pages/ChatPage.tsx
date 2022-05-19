import { createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';
import { css } from '@linaria/core';
import { JSX } from 'solid-js/jsx-runtime';

import { variable } from '@/theme';
import {roomList } from '@/utils/dummy';
import RoomContainer from '@/containers/RoomContainer';
import ChatContainer from '@/containers/ChatContainer';
import { ChatRoom } from '@/types';
import { roomContainerWidth, setRoomContainerWidth } from '@/store/room';
import { Transition } from 'solid-transition-group';

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
`;

const chatContainerStyle = css`
  position: relative;
  z-index: 2;
  flex: 1;

  @media (max-width: 640px) {
    position: absolute;
    inset: 0;

    pointer-events: none;

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
    color: transparent;
    opacity: 0;
    background: ${variable('Color.Grey.300')};
  }
`;

const dividerStyle = css`
  @media (max-width: 640px) {
    display: none;
  }

  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--room-container-width, 320px) - 4px);

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
    transform: translateX(100%);
  }
`;

const slideInEnd = css`
  opacity: 1;
  transform: translateX(0);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.deceleration')};

  @media (max-width: 640px) {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOutStart = css`
  opacity: 1;
  transform: translateX(0);

  @media (max-width: 640px) {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOutEnd = css`
  opacity: 0;
  transform: translateX(50%);

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.acceleration')};

  @media (max-width: 640px) {
    opacity: 1;
    transform: translateX(100%);

    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }
`;

const fadeIn = css`
  opacity: 1;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};

  @media (max-width: 640px) {
    opacity: 0;

    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }
`;
const fadeOut = css`
  opacity: 0;

  transition-duration: ${variable('Animation.duration.short')};
  transition-timing-function: ${variable('Animation.easing.inOut')};

  @media (max-width: 640px) {
    opacity: 0.5;

    transition-timing-function: ${variable('Animation.easing.deceleration')};
  }
`;

const ChatPage: Component = () => {
  const [selectedRoom, setSelectedRoom] = createSignal<ChatRoom | undefined>();

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

    setRoomContainerWidth(Math.max(320, startWidth + diff));
  };
  const onDividerUp: JSX.EventHandlerUnion<HTMLDivElement, PointerEvent> = (event) => {
    setStartX(null);
    startWidth = null;

    event.target.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={containerStyle}
      style={{
        '--room-container-width': `${roomContainerWidth()}px`,
      }}  
    >
      <div className={roomContainerStyle}>
        <RoomContainer
          rooms={roomList}
          selectedRoom={selectedRoom()}
          onRoomSelect={setSelectedRoom}
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

