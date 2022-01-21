import { StringLike } from '../common';
import Media from '../Media';
import RequestableChat from './RequestableChat';

export type ImageType = 'image/gif' | 'image/png' | 'image/jpeg' | 'image/bmp' | 'image/webp';
export type ImageMedia = Media<ImageType>;

interface ImageChat extends RequestableChat<ImageMedia[]> {
  subContent?: StringLike;
  isCombined?: boolean;
}

const allowImageType = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'];
export const isImageChat = (chat: RequestableChat<unknown>): chat is ImageChat => {
  if (Array.isArray(chat.content)) {
    return chat.content.every((it) => it instanceof Media && allowImageType.some((type) => type === it.mime));
  }

  return false;
};

export default ImageChat;
