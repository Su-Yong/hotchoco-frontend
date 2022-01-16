import Chat from '@/types/Chat';
import { atom } from 'jotai';

export const chats = atom<Map<string, Chat[]>>(new Map());
