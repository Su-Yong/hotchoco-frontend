import React, { useMemo } from 'react';

import { Virtuoso, VirtuosoProps } from 'react-virtuoso';

import Room from '@/components/chat/Room';
import RoomType from '@/types/Room';
import UnreadBadge from '@/components/chat/UnreadBadge';
import useRoom from '@/hooks/useRoom';
import { css } from '@linaria/core';

const containerStyle = css`
  overflow-x: hidden;
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
    <Virtuoso
      className={containerStyle}
      data={rooms}
      computeItemKey={computeItemKey}
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
  );
};

export default RoomListContainer;
