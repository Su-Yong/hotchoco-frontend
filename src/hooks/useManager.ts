import ChatManager from '@/ChatManager';
import { useMemo } from 'react';

const dummy = new ChatManager();
const useManager = () => {
  return useMemo(() => dummy, []);
};

export default useManager;
