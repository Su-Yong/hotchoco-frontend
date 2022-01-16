import ChatEvent from '@/events/ChatEvent';
import RoomEvent from '@/events/RoomEvent';
import Chat from '@/types/Chat';
import Room from '@/types/Room';
import ColorUtil from '@/utils/Color';
import dummy from '@/utils/dummy';
import EventEmitter from 'eventemitter3';
import { nanoid } from 'nanoid';

type Events = ChatEvent | RoomEvent;

const randomTimeout = (func: () => void, range = 5000, delay = 3000) => {
  func();

  setTimeout(() => randomTimeout(func), Math.random() * range + delay);
};

const isKeyOf = <T extends unknown>(key: unknown, parent: T): key is keyof T => {
  return !!(
    typeof key === 'string'
      && typeof parent === 'object'
      && key && parent
      && key in (parent as object) && (parent as object).hasOwnProperty(key)
    );
}

const dummyMessage = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const createDummyMessage = () => {
  const [first, second] = [Math.random(), Math.random()]
    .map((it) => ~~(it * dummyMessage.length))
    .sort((a, b) => a - b);
  
  return dummyMessage.substring(first, second);
};

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

    const randomUpdateMessage = () => {
      this.rooms.forEach((room) => {
        if (Math.random() < 0.2) return;

        const newChat = {
          id: nanoid(),
          sender: room.users[~~(Math.random() * room.users.length)],
          room,
          timestamp: new Date().getTime(),
          content: createDummyMessage(),
          readers: room.users.slice(0, ~~(Math.random() * room.users.length)),
          emotion: new Map(),
        };

        this.emit('chat', room, newChat);
      });
    }

    randomUpdateRooms();
    // randomTimeout(randomUpdateRooms);
    randomTimeout(randomUpdateMessage, 3000, 1000);
  }

  send<CHAT extends Chat>(chat: CHAT) {
    
  }

  getRooms() { // TODO
    return this.rooms;
  }
}

export default ChatManager;
