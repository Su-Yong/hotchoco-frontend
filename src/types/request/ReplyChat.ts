import Chat from '../Chat';
import TextChat from './TextChat';
import RequestableChat from './RequestableChat';

type InferContentType<Chat extends RequestableChat<unknown>> = Chat extends RequestableChat<infer ContentType> ? ContentType : never;

interface ReplyChat<ParentChat extends RequestableChat<unknown>> extends RequestableChat<InferContentType<ParentChat>> {
  target: Chat;
}

export const isReplyChat = (chat: RequestableChat<unknown>): chat is ReplyChat<RequestableChat<InferContentType<typeof chat>>> =>
  'target' in chat && Object.prototype.hasOwnProperty.call(chat, 'target');

export type ReplyTextChat = ReplyChat<TextChat>;

export default ReplyChat;
