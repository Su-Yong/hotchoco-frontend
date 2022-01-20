import Nullish from '@/types/Nullish';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'wouter';

const useRoom = (): [string | Nullish, (roomId?: string) => void] => {
  const [location, setLocation] = useLocation();
  const roomId = useMemo(() => location.match(/chat\/([^\/]+)/)?.at(0), [location]);

  const setRoom = useCallback((id?: string) => {
    if (id) {
      setLocation(`/chat/${id}`);
    } else {
      setLocation('/chat');
    }
  }, []);

  return [roomId, setRoom];
};

export default useRoom;
