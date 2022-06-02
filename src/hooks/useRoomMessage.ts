import { ChatRoom, Message } from '@/types';
import { clientUser, messageList, roomList } from '@/utils/dummy';
import { Accessor, createEffect, createSignal, on, Setter } from 'solid-js';

const [dummy, setDummy] = createSignal(new Map<ChatRoom, Message[]>());
const useRoomMessage = (room: Accessor<ChatRoom>): [Accessor<Message[]>, Setter<Message[]>] => {
  const accessor: Accessor<Message[]> = () => dummy().get(room()) ?? [];
  const setter = ((value) => {
    const newMap = new Map(dummy());
    const newValue = (value instanceof Function ? value(accessor()) : value) as Message[];
    newMap.set(room(), newValue);

    setDummy(newMap);
  }) as Setter<Message[]>;

  return [accessor, setter];
};

/* for test */
roomList.forEach((room) => {
  const [message, setMessage] = useRoomMessage(() => room);

  let runner = (time = 3000) => {
    const newMessage = messageList[~~(Math.random() * messageList.length)];
    if (newMessage.sender.id !== clientUser.id) setMessage([...message(), newMessage]);

    setTimeout(() => runner(~~(3000 + Math.random() * 5000)), time);
  };

  runner(~~(3000 + Math.random() * 5000));
});

export default useRoomMessage;
