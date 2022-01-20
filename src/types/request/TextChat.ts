import { StringLike } from '../common';
import RequestableChat from './RequestableChat';

type TextChat = RequestableChat<StringLike>;

const allowTextType = ['string', 'number', 'bigint', 'boolean'];
export const isTextChat = (chat: RequestableChat<unknown>): chat is TextChat => allowTextType.some((type) => typeof chat.content === type);

export default TextChat;
