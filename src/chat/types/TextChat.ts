import User from '@/types/User';
import Chat from './Chat';

class TextChat extends Chat {
  text: string;

  constructor(sender: User, text: string, metadata: unknown = null) {
    super(sender, metadata);

    this.text = text;
  }
}

export default TextChat;
