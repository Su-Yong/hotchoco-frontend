import Chat from '@/types/Chat';
import Room from '@/types/Room';
import User from '@/types/User';

interface RoomEvent {
  enter: (room: Room, user: User, chat: Chat) => void;
  exit: (room: Room, user: User, chat: Chat) => void;
  notice: (room: Room, chat: Chat, metadata: unknown) => void;
}

export default RoomEvent;
