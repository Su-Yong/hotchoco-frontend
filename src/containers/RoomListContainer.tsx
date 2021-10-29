import Room from '@/components/chat/Room';
import { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import RoomType from '@/types/Room';

export interface RoomListContainerProps {
  rooms: RoomType[];
}

const RoomListContainer = ({ rooms }: RoomListContainerProps): JSX.Element => {

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
        <Room
          name={room.name}
          description={room.lastChat?.content ?? ''}
          image={images.get(room.id)}
          info={room.lastChat?.timestamp ? new Date(room.lastChat.timestamp).toLocaleString() : ''}
        />
      )}
    />
  );
};

export default RoomListContainer;
