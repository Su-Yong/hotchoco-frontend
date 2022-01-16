import User from '@/types/User';

class Chat {
  private _sender: User;
  private _metadata: unknown;

  constructor(sender: User, metadata: unknown = null) {
    this._sender = sender;
    this._metadata = metadata;
  }

  get sender() {
    return this._sender;
  }

  get metadata() {
    return this._metadata;
  }
}

export default Chat;
