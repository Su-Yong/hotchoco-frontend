import User from '@/types/User';
import ChatType from '@/types/Chat';
import Chat from './Chat';

class ReplyChat extends Chat {
  text: string;
  target: ChatType;

  constructor(sender: User, target: ChatType, text: string, metadata: unknown = null) {
    super(sender, metadata);

    this.text = text;
    this.target = target;
  }
}

export default ReplyChat;
