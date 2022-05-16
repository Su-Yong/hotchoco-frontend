import { User } from './User';

export type Content = string;
export type MessageType = 'text';
export interface Message {
  id: string;
  content: Content;
  timestamp: number;
  sender: User;
  type: MessageType;
}
