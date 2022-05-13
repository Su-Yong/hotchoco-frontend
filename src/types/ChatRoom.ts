import { User } from './User';

export type Metadata = any;
export interface ChatRoom {
  id: string;
  type: 'group' | 'direct' | 'secret' | 'self';
  title: string;
  members: User[];
  
  thumbnail?: string;
  metadata?: Metadata;
}
