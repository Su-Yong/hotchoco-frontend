import Chat from './Chat';
import User from './User';

interface Room {
  id: string;
  name: string;
  users: User[];
  image?: string;
  isGroup?: boolean;
  lastChat?: Chat;
  unreadChat?: number;
  metadata?: unknown;
}

export default Room;
