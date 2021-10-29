import Chat from './Chat';
import User from './User';

interface Room {
  id: string;
  name: string;
  users: User[];
  isGroup?: boolean;
  lastChat?: Chat;
  unreadChat?: number;
}

export default Room;
