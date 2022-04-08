import Chat from '@/types/Chat';
import { atom } from 'jotai';

export const CHAT_LIST = atom<Map<string, Chat[]>>(new Map());
export const UNREAD_CHAT_LIST = atom<Map<string, Chat[]>>(new Map());
