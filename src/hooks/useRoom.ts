import Nullish from '@/types/Nullish';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'wouter';

const useRoom = (): [string | Nullish, (roomId?: string) => void] => {
  const [location, setLocation] = useLocation();
  const roomId = useMemo(() => location.match(/chat\/([^\/]+)/)?.at(1), [location]);

  const setRoom = useCallback((id?: string) => {
    if (id) {
      setLocation(`/chat/${id}`);
    } else {
      window.history.back();
    }
  }, []);

  return [roomId, setRoom];
};

export default useRoom;
