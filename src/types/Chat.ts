import Emotion from './Emotion';
import User from './User';

interface Chat {
  id: string;
  sender: User;
  timestamp: number; // Unix timestamp
  content: string;
  readers: User[];
  emotion: Map<string, Emotion>; // string is User's id
  metadata?: unknown; // JSON
}

export default Chat;
