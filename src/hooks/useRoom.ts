import { useCallback } from 'react';
import { useLocation } from 'wouter';
import useQuery from './useQuery';

const useRoom = (): [string | null, (roomId: string) => void] => {
  const [, setLocation] = useLocation();
  const [, roomId] = useQuery('room');

  const setRoom = useCallback((id: string) => {
    setLocation(`/chat?room=${id}`);
  }, []);

  return [roomId, setRoom];
};

export default useRoom;
