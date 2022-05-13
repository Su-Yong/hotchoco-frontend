import { User } from './User';

export type Content = string;
export interface Message {
  id: string;
  content: Content;
  timestamp: number;
  sender: User;
}
