import User from '@/types/User';
import dummy from '@/utils/dummy';

// TODO: remove dummy data
const useClientUser = (): User => {
  return dummy.users[(Math.random() * dummy.users.length) | 0];
};

export default useClientUser;
