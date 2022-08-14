import { createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';
import { css } from '@linaria/core';

import { variable } from '@/theme';
import {roomList } from '@/utils/dummy';
import RoomContainer from '@/containers/RoomContainer';
import ChatContainer from '@/containers/ChatContainer';
import { ChatRoom } from '@/types';
import { roomContainerWidth, setRoomContainerWidth } from '@/store/room';
import { Transition } from 'solid-transition-group';
import { useNavigate, useSearchParams } from 'solid-app-router';
import createMediaSignal from '@/hooks/createMediaSignal';
import Hammer from 'hammerjs';
import Stackable from '@/components/Stackable';
import PreferencePage from './PreferencePage';

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
    transform-origin: 0% 0%;
    transform: translateX(calc(-10% * (1 - var(--page-ratio)))) scale(calc(95% + 5% * var(--page-ratio)));

    transition-property: transform;
    transition-duration: ${variable('Animation.duration.shortest')};
    transition-timing-function: ${variable('Animation.easing.inOut')};
  }
`;

const chatContainerStyle = css`
  position: relative;
  z-index: 2;
  flex: 1;
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

  z-index: 5;
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

const preferenceWrapperStyle = css`
  z-index: 50;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const preferenceContainerStyle = css`
  width: 100%;
  height: fit-content;
  max-height: 100%;

  @media (min-width: 640px) {
    max-width: 60vw;
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 100%;
  }
`;

const ChatPage: Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isScreenNarrow = createMediaSignal('(max-width: 640px)');
  const [pageRatio, setPageRatio] = createSignal(0);
  const [dividerActive, setDividerActive] = createSignal(false);

  const selectedRoomId = () => searchParams.id;
  const selectedRoom = () => roomList.find((it) => it.id === selectedRoomId());
  const setSelectedRoom = (room?: ChatRoom) => {
    if (room) setSearchParams({ id: room.id }, { replace: !!selectedRoomId() });
    else history.back();
  };

  const isPreference = () => searchParams.mode === 'preference';

  const onItemClick = (id: string) => {
    if (id === 'settings') setSearchParams({ mode: 'preference' });
  };

  const registerDividerGesture = (divider: HTMLDivElement) => {
    const hammer = new Hammer(divider);

    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on('panstart', () => setDividerActive(true));
    hammer.on('pan', (event) => {
      requestAnimationFrame(() => {
        const x = ~~Math.max(event.center.x, 320);
        setRoomContainerWidth(x);
      });
    });
    hammer.on('panend', () => setDividerActive(false));
  };

  const roomContainer = (
    <ChatContainer
      room={selectedRoom()!}
      onClose={() => setSelectedRoom()}
    />
  );

  return (
    <div
      className={containerStyle}
      style={{
        '--room-container-width': `${roomContainerWidth()}px`,
        '--page-ratio': pageRatio(),
      }}  
    >
      <div
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
        data-visible={dividerActive()}
        ref={registerDividerGesture}
        className={dividerStyle}
      />
      <Show
        when={isScreenNarrow()}
        fallback={(
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
              <Show
                when={selectedRoom() !== undefined}
                fallback={(
                  <div className={placeholderStyle}>
                    채팅방을 선택해주세요
                  </div>
                )}
              >
                {roomContainer}
              </Show>
            </Transition>
          </div>
        )}
      >
        <Stackable
          open={selectedRoom() !== undefined}
          direction={'right'}
          onBack={() => setSelectedRoom()}
          onGesture={(offset) => setPageRatio(offset)}
          outerStyle={{ 'z-index': 50 }}
          gestureRatio={0.5}
          positionStrategy={'fixed'}
        >
          {roomContainer}
        </Stackable>
      </Show>

      <Stackable
        open={isPreference()}
        direction={isScreenNarrow() ? 'right' : 'down'}
        outerClass={preferenceWrapperStyle}
        class={preferenceContainerStyle}
        onBack={() => history.back()}
        onGesture={(offset) => setPageRatio(offset)}
        positionStrategy={'fixed'}
      >
        <PreferencePage />
      </Stackable>
    </div>
  );
};

export default ChatPage;

