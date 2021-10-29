import Room from '@/components/chat/Room';
import { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';

export interface RoomListContainerProps {
  rooms: string[]; // TODO: string[] -> Room[];
}

const RoomListContainer = ({ rooms }: RoomListContainerProps): JSX.Element => {
  const roomImages = useMemo(() => {
    const urls: string[] = rooms.map(() => {
      const r = '0' + Math.floor(Math.random() * 255).toString(16);
      const g = '0' + Math.floor(Math.random() * 255).toString(16);
      const b = '0' + Math.floor(Math.random() * 255).toString(16);

      return `https://dummyimage.com/120x120/${r.slice(-2)}${g.slice(-2)}${b.slice(-2)}/fff`;
    });

    const map = new Map<string, JSX.Element>();
    let index = 0;
    for (const room of rooms) {
      map.set(room, <img src={urls[index++]} />);
    }

    return map;
  }, [rooms]);

  return (
    <Virtuoso
      data={rooms}
      itemContent={(_, room) => <Room name={room} description={'no description'} image={roomImages.get(room)} info={new Date().toLocaleTimeString()} />}
    />
  );
};

export default RoomListContainer;
