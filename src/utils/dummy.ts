import { ChatRoom, Message, User } from '@/types';
import { randUuid, randImg, randText, randFullName, randSentence } from '@ngneat/falso';

export const userList: User[] = Array.from({ length: 3 })
  .map((_, i) => ({
    id: randUuid(),
    name: randFullName(),
    profile: randImg(),
  }));

export const clientUser: User = userList[~~(Math.random() * userList.length)];

export const messageList: Message[] = Array.from({ length: 10000 })
  .map((_, i) => ({
    id: randUuid(),
    sender: userList[~~(Math.random() * userList.length)],
    content: `${i + 1}번째 ${randSentence()}`,
    timestamp: Date.now(),
    type: 'text',
  }));

export const roomList: ChatRoom[] = Array.from({ length: 10000 })
  .map((_, i) => ({
    id: randUuid(),
    title: `${i + 1}번째 방`,
    type: 'group',
    members: userList.slice(
      ...[
        ~~(Math.random() * userList.length),
        ~~(Math.random() * userList.length),
      ].sort((a, b) => a - b)
    ),
    thumbnail: randImg(),
  }));
