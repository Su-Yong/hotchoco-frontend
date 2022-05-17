import { ChatRoom, Message, MessageBase, User } from '@/types';
import { randUuid, randImg, randFullName, randSentence, randNumber } from '@ngneat/falso';

export const userList: User[] = Array.from({ length: 3 })
  .map((_, i) => ({
    id: randUuid(),
    name: randFullName(),
    profile: randImg(),
  }));

export const clientUser: User = userList[~~(Math.random() * userList.length)];

export const messageList: Message[] = Array.from({ length: 10000 })
  .map((_, i) => {
    const base: Omit<MessageBase<string>, 'type'> = {
      id: randUuid(),
      sender: userList[~~(Math.random() * userList.length)],
      timestamp: Date.now(),
    }

    const type = ['text', 'image'][~~(Math.random() * 1.5)];
    switch (type) {
      case 'text':
        return {
          ...base,
          type,
          content: `${i + 1}번째 ${randSentence().repeat(randNumber({ min: 1, max: 5 }))}`,
        };
      case 'image':
        return {
          ...base,
          type,
          content: Array.from({ length: randNumber({ min: 1, max: 20 }) }).map(() => randImg()),
        };
    }

    return {
      ...base,
      type: 'text',
      content: 'unknown type',
    };
  });

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
