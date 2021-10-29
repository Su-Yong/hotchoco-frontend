import { useMemo, useState } from 'react';

import { Virtuoso } from 'react-virtuoso';

import Room from '@/components/chat/Room';
import RoomType from '@/types/Room';
import Nullish from '@/types/Nullish';
import UnreadBadge from '@/components/chat/UnreadBadge';

export interface RoomListContainerProps {
  rooms: RoomType[];
}

const RoomListContainer = ({ rooms }: RoomListContainerProps): JSX.Element => {
  const [selectRoom, setSelectRoom] = useState<RoomType | Nullish>();

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
      data={rooms}
      itemContent={(_, room) => (
        <div 
          onClick={() => setSelectRoom(room)}
        >
        <Room
          name={room.name}
          description={room.lastChat?.content ?? ''}
          image={images.get(room.id)}
          info={room.lastChat?.timestamp ? new Date(room.lastChat.timestamp).toLocaleString() : ''}
          actived={selectRoom?.id === room.id}
          badge={(
            (room.unreadChat ?? 0) > 0
              ? <UnreadBadge count={room.unreadChat ?? 0} />
              : undefined
          )}
        />
        </div>
      )}
    />
  );
};

export default RoomListContainer;
