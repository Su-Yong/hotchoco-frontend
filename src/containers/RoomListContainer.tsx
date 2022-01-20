import React, { useMemo } from 'react';

import { Virtuoso, VirtuosoProps } from 'react-virtuoso';

import Room from '@/components/chat/Room';
import RoomType from '@/types/Room';
import UnreadBadge from '@/components/chat/UnreadBadge';
import useRoom from '@/hooks/useRoom';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import ChatHeader from '@/components/ChatHeader';

const containerStyle = css`
  width: 100%;
  height: 100%;
  
  overflow-x: hidden;

  position: relative;
`;

const headerStyle = css`
  position: absolute;
  left: 0;
  right: 0;
`;

const gapElement = styled.div`
  height: 56px;
`;

const computeItemKey: VirtuosoProps<RoomType>['computeItemKey'] = (_, { id }) => id;

export interface RoomListContainerProps {
  rooms: RoomType[];
}

const RoomListContainer = ({ rooms }: RoomListContainerProps): JSX.Element => {
  const [roomId, setRoom] = useRoom();

  const selectRoom = useMemo(() => rooms.find((it) => it.id === roomId), [roomId, rooms]);

  const images = useMemo(() => {
    const result = new Map<string, JSX.Element>();

    rooms.forEach((room) => {
      if (room.image) {
        result.set(room.id, <img src={room.image} alt={room.name} />);
      } else {
        result.set(room.id, <div>WIP</div>);
      }
    });

    return result;
  }, [rooms]);

  return (
    <div
      className={containerStyle}
    >
      <div className={headerStyle}>
        <ChatHeader title={`채팅 (${rooms.length})`} enableBack={false} />
      </div>
      <Virtuoso
        data={rooms}
        computeItemKey={computeItemKey}
        components={{
          Header: gapElement,
          Footer: gapElement,
        }}
        itemContent={(_, room) => (
          <div onClick={() => setRoom(room.id)}>
            <Room
              name={room.name}
              description={room.lastChat?.content ?? ''}
              image={images.get(room.id)}
              info={room.lastChat?.timestamp ? new Date(room.lastChat.timestamp).toLocaleString() : ''}
              actived={selectRoom?.id === room.id}
              badge={(room.unreadChat ?? 0) > 0 ? <UnreadBadge count={room.unreadChat ?? 0} /> : undefined}
            />
          </div>
        )}
      />
    </div>
  );
};

export default RoomListContainer;
