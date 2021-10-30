import Chat from '@/types/Chat';
import Room from '@/types/Room';
import User from '@/types/User';

interface ChatEvent {
  chat: (room: Room, chat: Chat) => void;
  read: (room: Room, user: User, chat: Chat) => void;
  delete: (room: Room, user: User, chat: Chat) => void;
}

export default ChatEvent;
