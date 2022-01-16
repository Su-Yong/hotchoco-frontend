import ChatEvent from '@/events/ChatEvent';
import RoomEvent from '@/events/RoomEvent';
import Chat from '@/types/Chat';
import Room from '@/types/Room';
import ColorUtil from '@/utils/Color';
import dummy from '@/utils/dummy';
import EventEmitter from 'eventemitter3';
import { nanoid } from 'nanoid';

type Events = ChatEvent | RoomEvent;

const randomTimeout = (func: () => void) => {
  func();

  setTimeout(() => randomTimeout(func), Math.random() * 5000 + 3000);
};

const isKeyOf = <T extends unknown>(key: unknown, parent: T): key is keyof T => {
  return !!(
    typeof key === 'string'
      && typeof parent === 'object'
      && key && parent
      && key in (parent as object) && (parent as object).hasOwnProperty(key)
    );
}

class ChatManager extends EventEmitter<Events> {
  private rooms: Room[] = [];

  constructor() { // dummy
    super();

    const randomUpdateRooms = () => {
      if (this.rooms.length <= 1 || Math.random() > 0.5) {
        const newRoom: Room = {
          id: nanoid(),
          name: new Date().toString(),
          users: dummy.users,
          image: `https://dummyimage.com/120x120/${ColorUtil.random().slice(-6)}/${ColorUtil.random().slice(-6)}`,
          isGroup: true,
          lastChat: undefined,
        };
        this.rooms.push(newRoom);
        this.emit('enter', newRoom, dummy.rooms[0], dummy.chats[0]);
      } else {
        const [removal] = this.rooms.splice(Math.floor(Math.random() * this.rooms.length), 1);
        this.emit('exit', removal, dummy.users[0], dummy.chats[0]);
      }
    };

    randomTimeout(randomUpdateRooms);
  }

  send<CHAT extends Chat>(chat: CHAT) {
    
  }

  getRooms() { // TODO
    return this.rooms;
  }
}

export default ChatManager;
