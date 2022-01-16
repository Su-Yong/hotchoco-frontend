import ChatType from '@/types/Chat';
import Nullish from '@/types/Nullish';
import User from '@/types/User';
import Media from './types/Media';
import ReplyChat from './types/ReplyChat';

class ChatBuilder {
  private static value: string | Nullish;
  private static sender: User | Nullish;
  private static target: ChatType | Nullish;
  private static medias: Media[] = [];

  static user(sender: User) {
    this.sender = sender;
  }

  static text(text: string) {
    this.value = text;
  }

  static reply(target: ChatType) {
    this.target = target;
  }

  static media<MEDIA extends Media>(...medias: MEDIA[]) {
    this.medias.push(...medias);
  }

  static build() {
    if (!this.sender) throw Error('Sender is undefined');

    if (this.target) {
      return new ReplyChat(this.sender, this.target, this.value ?? '');
    }

    this.reset();
  }

  private static reset() {
    this.sender = null;
    this.value = null;
    this.target = null;
    this.medias.splice(0, this.medias.length);
  }
}

export default ChatBuilder;
