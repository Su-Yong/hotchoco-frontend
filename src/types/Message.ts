import { User } from './User';

export interface MessageBase<Type> {
  id: string;
  type: Type;
  sender: User;
  timestamp: number;
}

export interface TextMessage extends MessageBase<'text'> {
  content: string;
}

export interface ImageMessage extends MessageBase<'image'> {
  content: string[];
}

export type Message = (
  TextMessage
  | ImageMessage
);
