import Emotion from './Emotion';
import User from './User';
import Room from './Room';

interface Chat {
  id: string;
  sender: User;
  room: Room;
  timestamp: number; // Unix timestamp
  content: string;
  readers: User[];
  emotion: Map<string, Emotion>; // string is User's id
  metadata?: Record<string, unknown>; // JSON
}

export default Chat;
