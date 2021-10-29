import { nanoid } from 'nanoid';
import User from "@/types/User";
import ColorUtil from './Color';
import Chat from '@/types/Chat';
import Room from '@/types/Room';

const users: User[] = Array.from({ length: 10 }).map(() => (
  {
    id: nanoid(),
    name: nanoid(),
    profile: `https://dummyimage.com/120x120/${ColorUtil.random().slice(-6)}/${ColorUtil.random().slice(-6)}`,
    description: 'lorem ipsum',
  }
));

const rooms: Room[] = Array.from({ length: 10 }).map(() => ({
  id: nanoid(),
  name: nanoid(),
  users,
  image: `https://dummyimage.com/120x120/${ColorUtil.random().slice(-6)}/${ColorUtil.random().slice(-6)}`,
  isGroup: true,
  lastChat: undefined,
  unreadChat: 0,
}));

const chats: Chat[] = Array.from({ length: 10000 }).map(() => (
  {
    id: nanoid(),
    sender: users[~~(Math.random() * users.length)],
    room: rooms[0],
    timestamp: new Date().getTime(),
    content: 'lorem ipsum',
    readers: users.slice(0, ~~(Math.random() * users.length)),
    emotion: new Map(),
  }
));

const dummy = {
  users,
  chats,
  rooms,
};

export default dummy;
